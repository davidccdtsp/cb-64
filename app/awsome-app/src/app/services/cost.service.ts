import { Injectable, inject, signal } from '@angular/core';
import { CostParam, ParamRange, ParamValue, Scenario, ScenarioParam } from '../model/candidatos-model';
import { Area, areaOf } from '../model/domain-model';
import { DataService } from './data.service';
import { evaluate } from './expression';

/** Coste mensual en USD. */
export interface CostEstimate {
  min: number;
  max: number;
  /** Punto medio del rango: es el que se usa en la nota de coste. */
  mid: number;
  /** Introducido a mano por el usuario, no sale de la ficha. */
  manual: boolean;
  /** Calculado con el modelo de precios de la ficha (si no, es el total que figura en su tabla). */
  calculated: boolean;
}

export interface CostComponentResult {
  name: string;
  min: number;
  max: number;
}

export interface CostVariantResult {
  name?: string;
  min: number;
  max: number;
  components: CostComponentResult[];
}

/** Resultado del modelo de precios, en la moneda del modelo. */
export interface CostCalculation {
  currency: string;
  min: number;
  max: number;
  variants: CostVariantResult[];
}

export interface ResolvedParam<T> {
  param: T;
  min: number;
  max: number;
  /** El usuario ha cambiado el valor de la ficha. */
  overridden: boolean;
}

const SCENARIOS: Scenario[] = ['S', 'M', 'L'];

@Injectable({ providedIn: 'root' })
export class CostService {
  private readonly data = inject(DataService);

  readonly scenario = signal<Scenario>('M');
  /** Supuesto editable para comparar fichas en EUR y en USD (docs/costes/metodologia.md §7.5). */
  readonly usdPerEur = signal(1.1);
  /** Coste total (USD/mes) fijado a mano, por candidato y escenario. */
  private readonly manual = signal<Record<string, number>>({});
  /** Valores de parámetros cambiados por el usuario: de escenario (`s|área|id|escenario`) o de modelo (`m|candidato|id|escenario`). */
  private readonly overrides = signal<Record<string, number>>({});

  private key(candidateId: string, scenario: Scenario): string {
    return `${candidateId}|${scenario}`;
  }

  /**
   * Coste mensual total del candidato. Por orden: el fijado a mano, el calculado con el modelo de precios
   * de su ficha y, si no hay modelo, el total de la tabla de su ficha de costes.
   */
  monthly(candidateId: string, scenario: Scenario = this.scenario()): CostEstimate | undefined {
    const manual = this.manual()[this.key(candidateId, scenario)];
    if (manual !== undefined) return { min: manual, max: manual, mid: manual, manual: true, calculated: false };
    const calc = this.calculate(candidateId, scenario);
    if (calc) return this.toUsd(calc.min, calc.max, calc.currency, false, true);
    const total = this.data.costs(candidateId)?.totals[scenario];
    return total && this.toUsd(total.min, total.max, total.currency, false, false);
  }

  /** Origen del coste mensual: modelo de precios calculable, total de la ficha, fijado a mano o ninguno. */
  priceModel(candidateId: string): string {
    const e = this.monthly(candidateId);
    return !e ? '—' : e.manual ? 'Manual' : e.calculated ? 'Calculado' : 'Total de la ficha';
  }

  /** Pasa un importe a euros (los USD con el tipo de cambio; los EUR no se tocan). */
  toEur(amount: number, currency: string): number {
    return currency === 'USD' ? amount / this.usdPerEur() : amount;
  }

  private toUsd(min: number, max: number, currency: string, manual: boolean, calculated: boolean): CostEstimate {
    const rate = currency === 'EUR' ? this.usdPerEur() : 1;
    return { min: min * rate, max: max * rate, mid: ((min + max) / 2) * rate, manual, calculated };
  }

  /** Fija el coste mensual total (USD) de un candidato y escenario; `undefined` lo devuelve al de la ficha. */
  setManual(candidateId: string, scenario: Scenario, usd: number | undefined): void {
    this.assertNonNegative(usd);
    this.manual.update((all) => this.with(all, this.key(candidateId, scenario), usd));
  }

  /** Cambia el tipo de cambio (>0). */
  setUsdPerEur(rate: number): void {
    if (!(Number.isFinite(rate) && rate > 0)) throw new RangeError(`tipo de cambio inválido: ${rate}`);
    this.usdPerEur.set(rate);
  }

  // --- Modelo de precios ---

  /** Parámetros de escenario (comunes a todos los candidatos del área) que usan las fórmulas del modelo. */
  scenarioParamsOf(candidateId: string, scenario: Scenario = this.scenario()): ResolvedParam<ScenarioParam>[] {
    const model = this.data.costs(candidateId)?.model;
    const area = this.areaOf(candidateId);
    if (!model || !area) return [];
    const used = new Set(
      model.variants.flatMap((v) => v.components).flatMap((c) => c.formula.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []),
    );
    return this.data
      .scenarioParams(area)
      .filter((p) => used.has(p.id) && p.values[scenario] !== undefined)
      .map((param) => {
        const o = this.overrides()[`s|${area}|${param.id}|${scenario}`];
        const v = o ?? param.values[scenario]!;
        return { param, min: v, max: v, overridden: o !== undefined };
      });
  }

  /** Parámetros del modelo de precios del candidato con su valor en el escenario. */
  modelParamsOf(candidateId: string, scenario: Scenario = this.scenario()): ResolvedParam<CostParam>[] {
    const model = this.data.costs(candidateId)?.model;
    return (model?.params ?? []).map((param) => {
      const o = this.overrides()[`m|${candidateId}|${param.id}|${scenario}`];
      const { min, max } = o !== undefined ? { min: o, max: o } : this.range(param.value, scenario);
      return { param, min, max, overridden: o !== undefined };
    });
  }

  /** Cambia un parámetro de escenario para todos los candidatos del área; `undefined` lo restablece. */
  setScenarioParam(area: Area, id: string, scenario: Scenario, value: number | undefined): void {
    this.assertNonNegative(value);
    this.overrides.update((all) => this.with(all, `s|${area}|${id}|${scenario}`, value));
  }

  /** Cambia un parámetro del modelo de un candidato; `undefined` lo restablece. */
  setModelParam(candidateId: string, id: string, scenario: Scenario, value: number | undefined): void {
    this.assertNonNegative(value);
    this.overrides.update((all) => this.with(all, `m|${candidateId}|${id}|${scenario}`, value));
  }

  /**
   * Coste mensual según el modelo de precios de la ficha, en la moneda del modelo; undefined si el candidato
   * no tiene modelo o una fórmula falla. El rango sale de evaluar con los mínimos y con los máximos de los
   * parámetros (supone que el coste no baja al subir un parámetro) y, con varias variantes, es el que
   * abarcan todas ellas.
   */
  calculate(candidateId: string, scenario: Scenario = this.scenario()): CostCalculation | undefined {
    const model = this.data.costs(candidateId)?.model;
    if (!model) return undefined;
    const low: Record<string, number> = {};
    const high: Record<string, number> = {};
    for (const p of this.scenarioParamsOf(candidateId, scenario)) {
      low[p.param.id] = p.min;
      high[p.param.id] = p.max;
    }
    for (const p of this.modelParamsOf(candidateId, scenario)) {
      low[p.param.id] = p.min;
      high[p.param.id] = p.max;
    }
    try {
      const variants = model.variants.map((v): CostVariantResult => {
        const components = v.components.map((c) => ({
          name: c.name,
          min: this.finite(evaluate(c.formula, low)),
          max: this.finite(evaluate(c.formula, high)),
        }));
        return {
          name: v.name,
          min: components.reduce((sum, c) => sum + c.min, 0),
          max: components.reduce((sum, c) => sum + c.max, 0),
          components,
        };
      });
      return {
        currency: model.currency,
        min: Math.min(...variants.map((v) => v.min)),
        max: Math.max(...variants.map((v) => v.max)),
        variants,
      };
    } catch {
      return undefined;
    }
  }

  private range(value: ParamValue, scenario: Scenario): { min: number; max: number } {
    const r: ParamRange = typeof value === 'object' && SCENARIOS.every((s) => s in value) ? (value as Record<Scenario, ParamRange>)[scenario] : (value as ParamRange);
    return typeof r === 'number' ? { min: r, max: r } : r;
  }

  private areaOf(candidateId: string): Area | undefined {
    const domain = this.data.candidate(candidateId)?.domain;
    return domain === undefined ? undefined : areaOf(domain);
  }

  private finite(n: number): number {
    if (!Number.isFinite(n)) throw new RangeError('resultado no finito');
    return n;
  }

  private assertNonNegative(value: number | undefined): void {
    if (value !== undefined && !(Number.isFinite(value) && value >= 0)) {
      throw new RangeError(`el valor debe ser undefined o un número >= 0: ${value}`);
    }
  }

  private with(all: Record<string, number>, key: string, value: number | undefined): Record<string, number> {
    const { [key]: _, ...rest } = all;
    return value === undefined ? rest : { ...rest, [key]: value };
  }
}
