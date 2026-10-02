import { Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
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
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class Layout {
  protected readonly title = inject(AppConfigService).title;
  protected readonly loaded = inject(DataService).loaded;
  /** Parámetros de configuración modificados: los enlaces del menú los conservan al cambiar de página. */
  protected readonly params = inject(UrlStateService).global;
  /** Menú lateral desplegable: se abre con el icono de tres líneas y se cierra al elegir una página, con Escape o pulsando fuera. */
  protected readonly menuOpen = signal(false);
  protected readonly year = new Date().getFullYear();
  private readonly injector = inject(Injector);
  private readonly menuButton = viewChild.required<ElementRef<HTMLElement>>('menuButton');
  private readonly menuPanel = viewChild.required<ElementRef<HTMLElement>>('panel');
  protected readonly menu = [
    { path: 'catalogo', label: 'Catálogo' },
    { path: 'comparador', label: 'Comparador' },
    { path: 'resumen', label: 'Resumen ejecutivo' },
    { path: 'estado-del-arte', label: 'Estado del arte' },
    { path: 'listado', label: 'Listado' },
  ];

  /** Al abrir el menú el foco pasa a su primer enlace (el resto de la página queda `inert`). */
  protected openMenu(): void {
    this.menuOpen.set(true);
    afterNextRender(() => this.menuPanel().nativeElement.querySelector('a')?.focus(), { injector: this.injector });
  }

  /** Al cerrarlo sin elegir página, el foco vuelve al botón que lo abrió. */
  protected closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.menuButton().nativeElement.focus();
  }
}
