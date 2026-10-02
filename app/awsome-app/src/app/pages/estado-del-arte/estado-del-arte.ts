import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { marked } from 'marked';
import { UrlStateBinder } from '../../services/url-state-binder';
import { Area } from '../../model/domain-model';

/**
 * Muestra directamente los .md de docs/estado-del-arte (angular.json los copia a /docs/estado-del-arte).
 * El HTML que sale de marked pasa por el sanitizador de Angular al enlazarlo con [innerHTML].
 */
@Component({
  selector: 'app-estado-del-arte',
  imports: [MatProgressSpinnerModule, MatTabsModule],
  templateUrl: './estado-del-arte.html',
  styleUrl: './estado-del-arte.scss',
})
export class EstadoDelArtePage {
  protected readonly tabs: { area: Area; label: string }[] = [
    { area: 'datos', label: 'Plataformas de datos' },
    { area: 'martech', label: 'MarTech' },
  ];
  protected readonly area = signal<Area>('datos');
  private readonly http = inject(HttpClient);
  private readonly doc = rxResource({
    params: () => this.area(),
    stream: ({ params }) => this.http.get(`docs/estado-del-arte/${params}/estado-del-arte.md`, { responseType: 'text' }),
  });
  constructor() {
    inject(UrlStateBinder).bind(inject(ActivatedRoute));
  }

  protected readonly loading = this.doc.isLoading;
  protected readonly error = this.doc.error;
  protected readonly html = computed(() => (this.doc.hasValue() ? (marked.parse(this.doc.value(), { async: false }) as string) : ''));

  protected select(index: number): void {
    this.area.set(this.tabs[index].area);
  }
}
