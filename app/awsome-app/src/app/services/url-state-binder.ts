import { DestroyRef, Injectable, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigTransferService } from './config-transfer.service';
import { DataService } from './data.service';
import { UrlStateService } from './url-state.service';
import { decodeGlobal, encodeGlobal, GLOBAL_KEYS, Params } from './url-state';

/** Lo que una página aporta al estado de la URL: validar y aplicar sus parámetros, y devolver los modificados. */
export interface PageUrlState {
  /** Valida y aplica los parámetros de la página; `false` si alguno no aplica (y entonces no aplica nada a medias). */
  read(get: (key: string) => string | null): boolean;
  /** Parámetros actuales, solo los que difieren de los de partida. Lee señales. */
  write(): Params;
}

/**
 * Lo que cada página hace con la URL (ver `UrlStateService`): al abrirla aplica la configuración y los filtros de la página;
 * si algún valor no aplica, no se aplica nada y la página se carga sin filtros ni cambios, con la URL limpia. Después,
 * publica en el servicio los parámetros modificados. Se separa del servicio ligero para que el layout no cargue los
 * servicios de puntuación (y con ellos los formularios) en el bundle inicial.
 */
@Injectable({ providedIn: 'root' })
export class UrlStateBinder {
  private readonly url = inject(UrlStateService);
  private readonly data = inject(DataService);
  private readonly transfer = inject(ConfigTransferService);
  private initial = true;

  constructor() {
    effect(() => {
      this.url.global.set(
        encodeGlobal(this.transfer.snapshot(), {
          attribute: (id) => this.data.defaultAttribute(id),
          dimension: (id) => this.data.defaultDimensionWeight(id),
        }),
      );
    });
  }

  /** Lo llama cada página en su constructor. La primera vez aplica la URL; siempre mantiene al día los parámetros de la página. */
  bind(route: ActivatedRoute, page?: PageUrlState): void {
    const map = route.snapshot.queryParamMap;
    if (this.initial) {
      this.initial = false;
      let ok = this.applyGlobal((k) => map.get(k));
      if (ok && page) ok = page.read((k) => map.get(k));
      if (!ok) this.url.pageParams.set({});
    }
    if (page) {
      this.url.pageParams.set(page.write()); // el estado ya aplicado, antes de que el servicio empiece a escribir la URL
      effect(() => this.url.pageParams.set(page.write()));
      inject(DestroyRef).onDestroy(() => this.url.pageParams.set({}));
    }
    this.url.started.set(true);
  }

  private applyGlobal(get: (key: string) => string | null): boolean {
    if (!GLOBAL_KEYS.some((k) => get(k) !== null)) return true;
    const deployments = [...new Set(this.data.candidates().flatMap((c) => c.deployment))];
    const snapshot = decodeGlobal(get, this.transfer.snapshot(), deployments);
    if (!snapshot) return false;
    try {
      this.transfer.apply(snapshot);
      return true;
    } catch {
      return false;
    }
  }
}
