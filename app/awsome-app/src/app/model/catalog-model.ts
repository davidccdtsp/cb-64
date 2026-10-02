export type LicenseFamily = 'Open source' | 'Source-available' | 'Propietaria';

/** Valores de los filtros del catálogo; '' / [] = sin filtro. */
export interface CatalogFilters {
  category: string;
  type: string;
  license: LicenseFamily | '';
  deployment: string[];
}

export interface CatalogProfile {
  id: string;
  name: string;
  filters: CatalogFilters;
}
