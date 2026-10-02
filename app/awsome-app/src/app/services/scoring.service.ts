import { Injectable, inject, signal, untracked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AnyScore, Candidate, Scenario } from '../model/candidatos-model';
import { LicenseFamily } from '../model/catalog-model';
import { areaOf, Domain } from '../model/domain-model';
import { Attribute, AttributeType, Dimension } from '../model/rubrica-model';
import { DimensionWeightsForm, MissingChoice, WeightControls, WeightsForm } from '../model/weights-model';
import { CostService } from './cost.service';
import { DataService } from './data.service';





/** Nota (0-5) fija, la media del criterio entre los candidatos comparados, o `undefined` para excluirlo. */
export type MissingScore = number | 'mean' | undefined;


/** Valores del formulario de pesos para un criterio. */
export type WeightValues = { id: string; weight: number; mandatory: boolean };


export interface CatalogFilter {
  domain?: Domain;
  category?: string;
  type?: string;
  deployment?: string[];
  license?: LicenseFamily;
  limit?: number;
}

/** Familia de una licencia a partir de su texto libre: source-available (Elastic, SLULA…), open source (Apache, MIT, GPL…) o propietaria. */
export function licenseFamily(license: string): LicenseFamily {
  if (/elastic|slula|bsl|sspl|source-available/i.test(license)) return 'Source-available';
  if (/apache|mit\b|gpl|bsd|postgresql|mpl/i.test(license)) return 'Open source';
  return 'Propietaria';
}

/**
 * Valores que sustituyen, solo para un cálculo, a los de la configuración actual (sin tocarla): permiten puntuar con
 * otro escenario de coste, otros pesos de dimensión (por id; las que no se indican conservan el suyo) o otros
 * despliegues obligatorios. Sirve para el resumen, que calcula varios perfiles a la vez.
 */
export interface RankingOptions {
  scenario?: Scenario;
  dimensionWeights?: Record<string, number>;
  requiredDeployments?: string[];
}

/** Datos del grupo comparado que necesita el cálculo de cada candidato. */
interface ScoringContext {
  options: RankingOptions;
  /** Coste mensual mínimo del grupo (EUR/USD según CostService). */
  minCost: number | undefined;
  /** Media de las notas conocidas por criterio; solo con `missingScore = 'mean'`. */
  means?: Map<string, number>;
}

/**
 * Cálculo de la puntuación de un candidato (0-100), en dos niveles (docs/01-metodologia.md §9):
 *
 * 1. Nota de cada dimensión d: la fórmula de referencia restringida a sus criterios aplicables c,
 *
 *      nota_d = 100 × Σ(peso_c × nota_c) / (5 × Σ peso_c)
 *
 * 2. Puntuación final: las notas de dimensión ponderadas por el peso W_d de cada dimensión,
 *
 *      puntuación = Σ(W_d × nota_d) / Σ W_d
 *
 * Una dimensión sin ningún criterio aplicable (no tiene nota) o con peso 0 queda fuera de numerador y
 * denominador. Dentro de una dimensión, los pesos de los criterios solo importan en relación con los de
 * sus hermanos: lo que aporta la dimensión al total lo fija W_d, no la suma de sus criterios.
 *
 * Criterios aplicables: los puntuables y booleanos con peso (Sí = 5, No = 0) que tienen nota, más los que
 * faltan si `missingScore` les asigna una. Los informativos, los textos (N/D, N/A) y los criterios sin peso
 * quedan fuera. Antes de todo esto, un criterio obligatorio que no se cumple anula la puntuación.
 *
 * Criterio calculado (coste): su nota no sale de la ficha sino del coste mensual del escenario activo
 * (CostService.monthly, punto medio del rango), relativo al candidato más barato del grupo comparado:
 *
 *      nota_coste = min(5, 5 × coste_mínimo_del_grupo / coste_candidato)
 *
 * El más barato saca 5; uno que cueste el doble, 2,5. Coste 0 = 5. Sin coste (ni manual, ni modelo, ni total
 * de la ficha) el criterio queda sin nota y se trata como cualquier otro faltante. Ver docs/costes/metodologia.md §5.
 */
@Injectable({ providedIn: 'root' })
export class ScoringService {
  private readonly data = inject(DataService);
  private readonly cost = inject(CostService);

  /**
   * Qué se asigna en el cálculo a los criterios numéricos o booleanos con peso que no tienen valor
   * (ausentes o "N/D"): una nota fija de 0 a 5, la media de las notas conocidas de ese criterio entre los
   * candidatos del grupo (si ninguno tiene nota, el criterio se excluye) o `undefined` para excluirlos.
   * Los "N/A" no aplican y siguen fuera.
   */
  /** Despliegues exigidos (requisito eliminatorio): el candidato debe ofrecer al menos uno; vacío = sin requisito. */
  private readonly _requiredDeployments = signal<string[]>([]);
  readonly requiredDeployments = this._requiredDeployments.asReadonly();

  setRequiredDeployments(values: string[]): void {
    this._requiredDeployments.set([...values]);
  }

  /** Sube cuando cambia la configuración desde fuera de los formularios (importación): los formularios deben recrearse. */
  readonly formsEpoch = signal(0);

  private readonly _missingScore = signal<MissingScore>(undefined);
  readonly missingScore = this._missingScore.asReadonly();

  /** @throws RangeError si no es `undefined`, `'mean'` ni un número entre 0 y 5. */
  setMissingScore(value: MissingScore): void {
    if (value !== undefined && value !== 'mean' && !(Number.isFinite(value) && value >= 0 && value <= 5)) {
      throw new RangeError(`missingScore debe ser undefined, 'mean' o un número entre 0 y 5: ${value}`);
    }
    this._missingScore.set(value);
  }

  /**
   * Puntuación 0-100 de un candidato, o undefined si no tiene ninguna dimensión con criterios aplicables
   * o incumple un requisito eliminatorio. Ver el cálculo en la documentación de la clase.
   */
  score(candidateId: string): number | undefined {
    const candidate = this.data.candidates().find((c) => c.id === candidateId);
    return candidate && this.compute(candidate, this.context(this.data.candidates({ domain: candidate.domain }), {})).total;
  }

  /** Candidatos del dominio/categoría con `totalScore` poblado, de mayor a menor puntuación. */
  ranking(filter: { domain?: Domain; category?: string } = {}, options: RankingOptions = {}): Candidate[] {
    const group = this.data.candidates(filter);
    const context = this.context(group, options); // la nota de coste y la media de un criterio son relativas al grupo
    return group
      .map((c) => {
        const { total, dimensions, excludedBy } = this.compute(c, context);
        return { ...c, totalScore: total, dimensionScores: dimensions, excludedBy };
      })
      .sort((a, b) => (b.totalScore ?? -1) - (a.totalScore ?? -1));
  }

  /**
   * Candidatos con puntuación para el catálogo, en orden de ranking. La nota se calcula contra todo el grupo
   * de dominio y categoría; tipo, despliegue y licencia solo ocultan filas (no cambian la nota). `deployment`
   * deja pasar al candidato que tenga alguno de los valores; vacío o ausente = sin filtro.
   */
  catalog(filter: CatalogFilter): Candidate[] {
    const rows = this.ranking(filter).filter(
      (c) =>
        c.totalScore !== undefined &&
        (!filter.type || c.type === filter.type) &&
        (!filter.license || licenseFamily(c.license) === filter.license) &&
        (!filter.deployment?.length || c.deployment.some((d) => filter.deployment!.includes(d))),
    );
    return filter.limit === undefined ? rows : rows.slice(0, filter.limit);
  }

  /** Valores que ofrecen los filtros del catálogo para un dominio. */
  catalogOptions(domain: Domain): { types: string[]; deployments: string[]; licenses: LicenseFamily[] } {
    const group = this.data.candidates({ domain });
    const uniq = (xs: string[]) => [...new Set(xs)].sort();
    return {
      types: uniq(group.map((c) => c.type)),
      deployments: uniq(group.flatMap((c) => c.deployment)),
      licenses: uniq(group.map((c) => licenseFamily(c.license))) as LicenseFamily[],
    };
  }

  /** Coste mensual mínimo del grupo en el escenario activo (undefined si ninguno tiene coste). */
  private minCost(group: Candidate[], scenario?: Scenario): number | undefined {
    const costs = group.map((c) => this.cost.monthly(c.id, scenario)?.mid).filter((c): c is number => c !== undefined);
    return costs.length ? Math.min(...costs) : undefined;
  }

  /** Nota (0-5) de coste: min(5, 5 × coste_mínimo_del_grupo / coste_candidato). Ver docs/costes/metodologia.md §5. */
  private costNote(candidateId: string, minCost: number | undefined, scenario?: Scenario): number | undefined {
    const cost = this.cost.monthly(candidateId, scenario)?.mid;
    if (cost === undefined || minCost === undefined) return undefined;
    return cost === 0 ? 5 : Math.min(5, (5 * minCost) / cost);
  }

  /** Lo que depende del grupo comparado: el coste mínimo y, si procede, la media de cada criterio. */
  private context(group: Candidate[], options: RankingOptions): ScoringContext {
    const minCost = this.minCost(group, options.scenario);
    if (this._missingScore() !== 'mean') return { options, minCost };
    const sums = new Map<string, { sum: number; n: number }>();
    for (const c of group) {
      const byId = new Map(c.scores.map((s) => [s.id, s]));
      for (const a of this.attributesOf(c.domain)) {
        const nota = this.knownNota(a, byId.get(a.id), c.id, minCost, options.scenario);
        if (nota === undefined || a.type === AttributeType.informativo || !a.weight) continue;
        const acc = sums.get(a.id) ?? { sum: 0, n: 0 };
        sums.set(a.id, { sum: acc.sum + nota, n: acc.n + 1 });
      }
    }
    return { options, minCost, means: new Map([...sums].map(([id, { sum, n }]) => [id, sum / n])) };
  }

  /** Nota (0-5) que ya tiene el candidato en un criterio, sin rellenar los que faltan. */
  private knownNota(a: Attribute, s: AnyScore | undefined, candidateId: string, minCost: number | undefined, scenario?: Scenario): number | undefined {
    if (a.calculated) return this.costNote(candidateId, minCost, scenario);
    return !s ? undefined : 'score' in s ? s.score : 'value' in s ? (s.value ? 5 : 0) : undefined;
  }

  private compute(candidate: Candidate, context: ScoringContext): { total?: number; dimensions: Record<string, number>; excludedBy?: string[] } {
    const byId = new Map(candidate.scores.map((s) => [s.id, s]));
    // requisitos eliminatorios: un criterio obligatorio que no se cumple (sin nota ni valor —ausente o N/D—,
    // con nota 0 o con valor No) o un despliegue obligatorio que el candidato no ofrece excluyen al candidato
    const excludedBy = this.attributesOf(candidate.domain)
      .filter((a) => {
        const s = byId.get(a.id);
        const met = a.calculated
          ? this.cost.monthly(candidate.id, context.options.scenario) !== undefined
          : s && (('score' in s && s.score > 0) || ('value' in s && s.value));
        return a.mandatory && a.type !== AttributeType.informativo && !met;
      })
      .map((a) => a.name);
    const required = context.options.requiredDeployments ?? this._requiredDeployments();
    if (required.length && !candidate.deployment.some((d) => required.includes(d))) {
      excludedBy.push(`Despliegue (${required.join(' / ')})`);
    }
    const dimensions: Record<string, number> = {};
    if (excludedBy.length) return { dimensions, excludedBy };
    const attributes = this.data.attributes();
    let weighted = 0; // Σ(W_d × nota_d)
    let weights = 0; // Σ W_d
    for (const dimension of this.data.dimensions(areaOf(candidate.domain))) {
      const nota = this.dimensionScore(attributes.get(dimension.id) ?? [], byId, candidate.id, context);
      if (nota === undefined) continue;
      dimensions[dimension.id] = nota;
      const weight = context.options.dimensionWeights?.[dimension.id] ?? dimension.weight;
      if (!weight) continue;
      weighted += weight * nota;
      weights += weight;
    }
    return { total: weights ? weighted / weights : undefined, dimensions };
  }

  /** Nota 0-100 de una dimensión (100 × Σ(peso_c × nota_c) / (5 × Σ peso_c)); undefined si no tiene criterios aplicables. */
  private dimensionScore(
    attributes: Attribute[],
    byId: Map<string, AnyScore>,
    candidateId: string,
    context: ScoringContext,
  ): number | undefined {
    const missingScore = this._missingScore();
    let weighted = 0; // Σ(peso_c × nota_c)
    let weights = 0; // Σ peso_c
    for (const attribute of attributes) {
      const weight = attribute.weight;
      if (attribute.type === AttributeType.informativo || !weight) continue;
      const s = byId.get(attribute.id);
      let nota = this.knownNota(attribute, s, candidateId, context.minCost, context.options.scenario);
      if (nota === undefined && missingScore !== undefined && !(s && 'text' in s && s.text.startsWith('N/A'))) {
        nota = missingScore === 'mean' ? context.means?.get(attribute.id) : missingScore;
      }
      if (nota === undefined) continue;
      weighted += weight * nota;
      weights += weight;
    }
    return weights ? (100 * weighted) / (5 * weights) : undefined;
  }

  private attributesOf(domain: Domain): Attribute[] {
    const attributes = this.data.attributes();
    return this.data.dimensions(areaOf(domain)).flatMap((d) => attributes.get(d.id) ?? []);
  }

  /**
   * Formulario con un grupo `{ id, weight (0-3), mandatory }` por criterio no informativo del dominio,
   * indexado por id de atributo. Los controles son non-nullable: `form.reset()` los devuelve al valor actual.
   */
  weightsForm(domain: Domain): WeightsForm {
    this.formsEpoch(); // una importación de configuración recrea los formularios abiertos
    // Solo `formsEpoch` y el dominio invalidan un `computed` que use esto: leer los pesos o el tratamiento de criterios sin
    // puntuación aquí lo haría recrear el formulario con cada cambio del propio usuario, mientras lo está editando.
    return untracked(() => this.buildWeightsForm(domain));
  }

  private buildWeightsForm(domain: Domain): WeightsForm {
    const groups: Record<string, FormGroup<WeightControls>> = {};
    for (const a of this.attributesOf(domain)) {
      if (a.type !== AttributeType.informativo) {
        groups[a.id] = new FormGroup({
          id: new FormControl(a.id, { nonNullable: true }),
          weight: new FormControl(a.weight ?? 0, { nonNullable: true }),
          mandatory: new FormControl(a.mandatory, { nonNullable: true }),
        });
      }
    }
    const missing = this._missingScore();
    return new FormGroup({
      // un número fijo que no sea 0 no tiene opción en la interfaz: se muestra como «excluir» y no se toca si no se cambia
      missing: new FormControl<MissingChoice>(missing === 'mean' ? 'mean' : missing === 0 ? 'zero' : 'exclude', { nonNullable: true }),
      weights: new FormGroup(groups),
    });
  }

  /** Aplica el formulario completo: pesos y obligatoriedad de los criterios y tratamiento de los criterios sin puntuación. */
  applyForm(domain: Domain, form: WeightsForm): void {
    const { missing, weights } = form.getRawValue();
    this.updateAttributeWeight(domain, Object.values(weights));
    if (form.controls.missing.dirty) {
      this.setMissingScore(missing === 'mean' ? 'mean' : missing === 'zero' ? 0 : undefined);
    }
  }

  /** Criterios marcados como obligatorios (requisito eliminatorio) del dominio; se recalcula al cambiar los atributos. */
  mandatoryAttributes(domain: Domain): Attribute[] {
    return this.attributesOf(domain).filter((a) => a.mandatory && a.type !== AttributeType.informativo);
  }

  /** Criterio calculado de coste del dominio (DP-COS-01 / MK-COS-01), si lo hay. */
  costAttribute(domain: Domain): Attribute | undefined {
    return this.attributesOf(domain).find((a) => a.calculated);
  }

  /** Restablece los pesos y la obligatoriedad de los criterios del dominio y el tratamiento de los criterios sin puntuación. */
  resetWeights(domain: Domain): void {
    this.data.resetAttributes(areaOf(domain));
    this._missingScore.set(undefined);
    this.formsEpoch.update((n) => n + 1); // los formularios abiertos se recrean con los valores restablecidos
  }

  /** Marca o desmarca un criterio como obligatorio sin tocar su peso. */
  setMandatory(domain: Domain, id: string, mandatory: boolean): void {
    const a = this.attributesOf(domain).find((x) => x.id === id);
    if (a) this.data.updateAttributes([{ ...a, mandatory }]);
  }

  /** Aplica los valores del formulario de pesos a los atributos del dominio y los guarda en DataService. */
  updateAttributeWeight(domain: Domain, values: WeightValues[]): void {
    const byId = new Map(values.map((v) => [v.id, v]));
    const updated = this.attributesOf(domain)
      .filter((a) => byId.has(a.id))
      .map((a) => ({ ...a, weight: byId.get(a.id)!.weight, mandatory: byId.get(a.id)!.mandatory }));
    this.data.updateAttributes(updated);
  }

  /** Formulario con un control (peso de la dimensión) por dimensión del dominio, indexado por id de dimensión. */
  dimensionWeightsForm(domain: Domain): DimensionWeightsForm {
    const controls: Record<string, FormControl<number>> = {};
    for (const d of this.data.dimensions(areaOf(domain))) {
      controls[d.id] = new FormControl(d.weight, { nonNullable: true });
    }
    return new FormGroup(controls);
  }

  /** Aplica el formulario de pesos de dimensión y los guarda en DataService (la puntuación se recalcula sola). */
  applyDimensionWeights(domain: Domain, form: DimensionWeightsForm): void {
    const weights = form.getRawValue();
    const updated: Dimension[] = this.data
      .dimensions(areaOf(domain))
      .filter((d) => d.id in weights)
      .map((d) => ({ ...d, weight: weights[d.id] }));
    this.data.updateDimensions(areaOf(domain), updated);
  }
}
