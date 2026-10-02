import { Scenario } from './candidatos-model';
import { CatalogProfile } from './catalog-model';
import { Area } from './domain-model';
import { SummaryConfig } from './summary-model';
import { MissingChoice } from './weights-model';

/**
 * Valores que el usuario puede cambiar y que valen en más de una página: pesos y obligatoriedad de los
 * criterios, pesos de las dimensiones, tratamiento de los criterios sin puntuación, despliegue obligatorio,
 * escenario de coste y, además, los perfiles del catálogo y (solo JSON) los del Resumen ejecutivo.
 */
export interface ConfigSnapshot {
  version: 1;
  settings: { missing: MissingChoice; requiredDeployments: string[]; scenario: Scenario };
  attributes: Record<string, { weight: number; mandatory: boolean }>;
  dimensions: Record<string, number>;
  profiles: Record<Area, CatalogProfile[]>;
  /** Perfiles y parámetros del Resumen ejecutivo. Solo en JSON; si falta (JSON antiguo, CSV, URL) al importar no se tocan. */
  summary?: SummaryConfig;
}
