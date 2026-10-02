import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalogo' },
  { path: 'listado', loadComponent: () => import('./pages/listado/listado').then((m) => m.ListadoPage) },
  { path: 'comparador', loadComponent: () => import('./pages/comparador/comparador').then((m) => m.ComparadorPage) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then((m) => m.CatalogoPage) },
  { path: 'resumen', loadComponent: () => import('./pages/resumen/resumen').then((m) => m.ResumenPage) },
  { path: 'estado-del-arte', loadComponent: () => import('./pages/estado-del-arte/estado-del-arte').then((m) => m.EstadoDelArtePage) },
];
