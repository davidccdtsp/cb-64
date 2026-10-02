import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Params } from './url-state';

/**
 * Parte ligera del estado en la URL (query params), la única que carga el layout: los parámetros de configuración que
 * llevan los enlaces del menú y la escritura de la URL. Solo se escribe lo que el usuario ha modificado. Quien calcula
 * esos parámetros y aplica los de la URL al abrirla es `UrlStateBinder`, que cargan las páginas. Las modificaciones
 * sustituyen la URL (no llenan el historial).
 */
@Injectable({ providedIn: 'root' })
export class UrlStateService {
  private readonly router = inject(Router);

  /** Parámetros de configuración modificados; los enlaces del menú los conservan al cambiar de página. */
  readonly global = signal<Params>({});
  /** Parámetros de la página actual. */
  readonly pageParams = signal<Params>({});
  /** Hasta que la primera página aplica la URL, no se escribe nada (se perderían los parámetros de entrada). */
  readonly started = signal(false);

  constructor() {
    effect(() => {
      if (!this.started()) return;
      this.write({ ...this.global(), ...this.pageParams() });
    });
  }

  /** Últimos parámetros escritos: evita repetir navegaciones y no depende de `router.url`, que se actualiza al terminar la navegación. */
  private last: string | null = null;

  private write(params: Params): void {
    const key = JSON.stringify(Object.entries(params).sort(([a], [b]) => a.localeCompare(b)));
    if (key === this.last) return;
    this.last = key;
    const tree = this.router.parseUrl(this.router.url);
    tree.queryParams = params;
    void this.router.navigateByUrl(tree, { replaceUrl: true });
  }
}
