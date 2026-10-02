import { Area } from './domain-model';

/**
 * Perfil de necesidad del resumen: los pesos de dimensión que sustituyen a los de la configuración (las que no se
 * indican conservan el suyo) y los despliegues de los que el candidato debe ofrecer al menos uno (vacío = ninguno).
 */
export interface SummaryProfile {
  id: string;
  name: string;
  /** Qué prioriza, en texto; si está vacío se genera a partir de los pesos y los despliegues. */
  description: string;
  dimensionWeights: Record<string, number>;
  requiredDeployments: string[];
}

/** Perfiles y parámetros del resumen tal y como se exportan en la configuración (solo JSON). */
export interface SummaryConfig {
  topN: number;
  includeCategories: boolean;
  profiles: Record<Area, SummaryProfile[]>;
}
