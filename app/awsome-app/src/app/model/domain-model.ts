export enum Domain {
  data,
  martech
}

/** Área de la aplicación: el mismo dominio con el nombre que usan los datos, las rutas y la URL. */
export type Area = 'datos' | 'martech';

export const areaOf = (domain: Domain): Area => (domain === Domain.data ? 'datos' : 'martech');
export const domainOf = (area: Area): Domain => (area === 'datos' ? Domain.data : Domain.martech);
