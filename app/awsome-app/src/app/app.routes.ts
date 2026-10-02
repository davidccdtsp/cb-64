import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalogo' },
  { title: 'Listado', path: 'listado', loadComponent: () => import('./pages/listado/listado').then((m) => m.ListadoPage) },
  { title: 'Comparador', path: 'comparador', loadComponent: () => import('./pages/comparador/comparador').then((m) => m.ComparadorPage) },
  { title: 'Catálogo', path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then((m) => m.CatalogoPage) },
  { title: 'Resumen ejecutivo', path: 'resumen', loadComponent: () => import('./pages/resumen/resumen').then((m) => m.ResumenPage) },
  { title: 'Estado del arte', path: 'estado-del-arte', loadComponent: () => import('./pages/estado-del-arte/estado-del-arte').then((m) => m.EstadoDelArtePage) },
];
