import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, firstValueFrom, of } from 'rxjs';

const DEFAULT_TITLE = 'Awsome App';
const DEFAULT_CATALOG_MAX_ROWS = 100;
/** Dólares por euro: supuesto del consultor para comparar fichas en EUR y en USD (docs/costes/metodologia.md §8.1). */
const DEFAULT_USD_PER_EUR = 1.1;

/** Configuración que se lee al arrancar de `config.json` (junto a `index.html`). Si falta o no es válido, se usan los valores por defecto. */
@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private readonly pageTitle = inject(Title);

  /** Título de la aplicación: cabecera, menú, pie y título de la pestaña. */
  readonly title = signal(DEFAULT_TITLE);
  /** Máximo de candidatos que muestra la página Catálogo. */
  readonly catalogMaxRows = signal(DEFAULT_CATALOG_MAX_ROWS);
  /** Tipo de cambio (USD por 1 EUR) con el que se convierten los importes a euros. */
  readonly usdPerEur = signal(DEFAULT_USD_PER_EUR);

  load(): Promise<void> {
    return firstValueFrom(this.http.get<{ title?: unknown; catalogMaxRows?: unknown; usdPerEur?: unknown }>('config.json').pipe(catchError(() => of(null)))).then((config) => {
      const title = typeof config?.title === 'string' ? config.title.trim() : '';
      if (title) this.title.set(title);
      const rows = config?.catalogMaxRows;
      if (typeof rows === 'number' && Number.isInteger(rows) && rows > 0) this.catalogMaxRows.set(rows);
      const rate = config?.usdPerEur;
      if (typeof rate === 'number' && Number.isFinite(rate) && rate > 0) this.usdPerEur.set(rate);
      this.pageTitle.setTitle(this.title());
    });
  }
}
