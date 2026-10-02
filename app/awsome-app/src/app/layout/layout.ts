import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppConfigService } from '../services/app-config.service';
import { DataService } from '../services/data.service';
import { UrlStateService } from '../services/url-state.service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatProgressSpinnerModule],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
})
export class Layout {
  protected readonly title = inject(AppConfigService).title;
  protected readonly loaded = inject(DataService).loaded;
  /** Parámetros de configuración modificados: los enlaces del menú los conservan al cambiar de página. */
  protected readonly params = inject(UrlStateService).global;
  /** Menú lateral desplegable: se abre con el icono de tres líneas y se cierra al elegir una página, con Escape o pulsando fuera. */
  protected readonly menuOpen = signal(false);
  protected readonly menu = [
    { path: 'catalogo', label: 'Catálogo' },
    { path: 'comparador', label: 'Comparador' },
    { path: 'resumen', label: 'Resumen ejecutivo' },
    { path: 'estado-del-arte', label: 'Estado del arte' },
    { path: 'listado', label: 'Listado' },
  ];
}
