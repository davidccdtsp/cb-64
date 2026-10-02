import { Injectable, inject } from '@angular/core';
import { Domain } from '../model/domain-model';
import { CostService } from './cost.service';
import { ScoringService } from './scoring.service';

/** Franjas de percentil por eje: 5 quintiles, de la 0 (la peor) a la 4 (la mejor). */
export const BANDS = 5;

/** Valores ordenados de menor a mayor de una métrica, para todos los candidatos de un dominio. */
export type Distribution = number[];

/**
 * Franja (0-4) de un valor dentro de una distribución: el percentil que ocupa (los empates cuentan por la mitad)
 * partido en quintiles. `lowerIsBetter` invierte el sentido (el coste: cuanto más bajo, mejor franja). `undefined`
 * si la distribución está vacía.
 */
export function band(sorted: Distribution, value: number, lowerIsBetter = false): number | undefined {
  if (!sorted.length) return undefined;
  const below = sorted.filter((x) => x < value).length;
  const equal = sorted.filter((x) => x === value).length;
  const percentile = (below + equal / 2) / sorted.length;
  const index = Math.min(BANDS - 1, Math.floor(percentile * BANDS));
  return lowerIsBetter ? BANDS - 1 - index : index;
}

/**
 * Color de una coordenada de la matriz (franja de nota, franja de coste), del verde (peor) al rojo (mejor):
 * el tono sale de la media de las dos franjas, así que la diagonal tiene el mismo color. Luminosidad alta para
 * que el texto siga leyéndose. Para invertir el sentido (rojo = peor) basta con cambiar este método.
 */
export function matrixColor(scoreBand: number, costBand: number): string {
  const good = (scoreBand + costBand) / (2 * (BANDS - 1));
  return `hsl(${Math.round(120 * (1 - good))} 65% 80%)`;
}

const pct = (from: number, to: number) => `P${(from * 100) / BANDS}–${(to * 100) / BANDS}`;
/** Percentil de nota de una franja: la 0 es el 20 % de notas más bajas. */
export const scoreLabel = (b: number): string => pct(b, b + 1);
/** Percentil de coste de una franja de «mejor»: la 4 es el 20 % más barato (P0–20 de coste). */
export const costLabel = (b: number): string => pct(BANDS - 1 - b, BANDS - b);

export interface Heat {
  /** Franjas de una nota total y un coste mensual (USD) respecto a todo el dominio; undefined si falta alguno de los dos. */
  cell(score: number | undefined, cost: number | undefined): { scoreBand: number; costBand: number } | undefined;
}

/**
 * Mapa de calor del catálogo: una matriz de nota × coste con un color por coordenada. Las franjas son absolutas: se
 * calculan con todos los candidatos del dominio (sin filtros de categoría, tipo, despliegue ni licencia), no con las
 * filas que se ven. Solo cambian con lo que cambia las notas o los costes (pesos, escenario, requisitos eliminatorios).
 */
@Injectable({ providedIn: 'root' })
export class HeatmapService {
  private readonly scoring = inject(ScoringService);
  private readonly cost = inject(CostService);

  /** Lee señales: llamarlo dentro de un `computed`. */
  forDomain(domain: Domain): Heat {
    const ranked = this.scoring.ranking({ domain });
    const sorted = (xs: (number | undefined)[]): Distribution => xs.filter((x): x is number => x !== undefined).sort((a, b) => a - b);
    const scores = sorted(ranked.map((c) => c.totalScore));
    const costs = sorted(ranked.map((c) => this.cost.monthly(c.id)?.mid));
    return {
      cell: (score, cost) => {
        if (score === undefined || cost === undefined) return undefined;
        const scoreBand = band(scores, score);
        const costBand = band(costs, cost, true);
        return scoreBand === undefined || costBand === undefined ? undefined : { scoreBand, costBand };
      },
    };
  }
}
