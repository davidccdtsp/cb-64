import { Domain } from "./domain-model";

export interface Candidate {
  id: string;
  name: string;
  domain: Domain;
  category: string;
  type: string;
  license: string;
  deployment: string[];
  lastRevisionDate: Date;
  scores: AnyScore[];
  /** 0-100; lo rellena ScoringService. Undefined si no hay criterios aplicables. */
  totalScore?: number;
  /** Nota 0-100 por id de dimensión; solo las que tienen criterios aplicables. Vacío si no cumple un obligatorio. Lo rellena ScoringService.ranking. */
  dimensionScores?: Record<string, number>;
  /** Requisitos eliminatorios que incumple (nombres de criterios obligatorios y/o despliegue); si hay alguno no tiene puntuación. Lo rellena ScoringService.ranking. */
  excludedBy?: string[];
}

export type AnyScore = NumericScore | BooleanScore | TextScore;

export interface Score {
  id: string;
  reliability: string;
  urls: string[];
}

export interface NumericScore extends Score{
  score: number;
}

export interface BooleanScore extends Score {
  value: boolean;
}

export interface TextScore extends Score {
  text: string;
}



export interface CostLink {
  id: string;
  title: string;
  url: string;
  /** Fecha de consulta (AAAA-MM-DD); vacía si la nota no la indica. */
  consulted: string;
}

export interface CandidateCost {
  candidateId: string;
  reviewDate: Date;
  referenceRegion: string;
  currency: string;
  tables: CostTable[];
  /** Fuentes de la ficha de costes (notas al pie del .md). */
  links: CostLink[];
  /** Coste mensual total por escenario, solo donde el .md da una cifra. */
  totals: Partial<Record<Scenario, CostTotal>>;
  /** Modelo de precios calculable; solo lo tienen unos pocos candidatos (ver docs/costes/metodologia.md §8). */
  model?: CostModel;
}

/** Valor de un parámetro de precio: fijo, un rango o un valor distinto por escenario. */
export type ParamRange = number | { min: number; max: number };
export type ParamValue = ParamRange | Record<Scenario, ParamRange>;

export interface CostParam {
  id: string;
  name: string;
  unit?: string;
  value: ParamValue;
  /** Id de la fuente en docs/fuentes.md; sin fuente es un supuesto del consultor. */
  source?: string;
}

export interface CostFormula {
  name: string;
  /** Coste mensual del componente: variables = parámetros del escenario y del modelo; max, min, ceil. */
  formula: string;
}

/** Plan o modalidad de precios; con varias variantes el coste es el rango entre ellas. */
export interface CostVariant {
  name?: string;
  components: CostFormula[];
}

export interface CostModel {
  currency: string;
  params: CostParam[];
  variants: CostVariant[];
}

/** Parámetro de un escenario (docs/costes/escenarios*.md): un valor numérico por escenario. */
export interface ScenarioParam {
  id: string;
  name: string;
  unit: string;
  values: Partial<Record<Scenario, number>>;
}

export type Scenario = 'S' | 'M' | 'L';

/** Rango de coste mensual en la moneda original de la ficha. */
export interface CostTotal {
  min: number;
  max: number;
  currency: string;
  /** Tabla de la ficha de la que sale (vacío si solo hay una). */
  source: string;
}

/** Las columnas varían según el candidato: son las claves de `rows`. */
export interface CostTable {
  title: string;
  rows: Record<string, string>[];
}
