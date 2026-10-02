import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { UrlStateBinder } from '../../services/url-state-binder';
import { SummaryService } from '../../services/summary.service';
import { ConfigMenu } from '../common/config-menu/config-menu';
import { ScenarioSelect } from '../common/scenario-select/scenario-select';
import { Area } from '../../model/domain-model';
import { SummaryProfile } from '../../model/summary-model';

/**
 * Resumen: el usuario define los perfiles de necesidad (pesos de dimensión y despliegues obligatorios) y los parámetros del
 * documento y lo exporta en Markdown (descarga o portapapeles).
 */
@Component({
  selector: 'app-resumen',
  imports: [ConfigMenu, ScenarioSelect, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule],
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
})
export class ResumenPage {
  protected readonly summary = inject(SummaryService);
  private readonly data = inject(DataService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly area = signal<Area>('datos');

  constructor() {
    inject(UrlStateBinder).bind(inject(ActivatedRoute));
  }

  protected readonly profiles = computed(() => this.summary.profiles()[this.area()]);
  protected readonly dimensions = computed(() => this.data.dimensions(this.area()));
  protected readonly deployments = computed(() => [...new Set(this.data.candidates().flatMap((c) => c.deployment))].sort());
  private readonly markdown = computed(() => this.summary.markdown());

  protected describe(profile: SummaryProfile): string {
    return this.summary.describe(this.area(), profile).replace(/`/g, ''); // en pantalla sin el formato de código del Markdown
  }

  /** Peso de una dimensión: vacío = el de la configuración; un valor no numérico o negativo se ignora. */
  protected setWeight(profile: SummaryProfile, dimension: string, raw: string): void {
    if (raw.trim() === '') return this.summary.setDimensionWeight(this.area(), profile.id, dimension, undefined);
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 0) this.summary.setDimensionWeight(this.area(), profile.id, dimension, n);
  }

  protected setTopN(raw: string): void {
    const n = Math.floor(Number(raw));
    if (Number.isFinite(n) && n >= 1 && n <= 20) this.summary.topN.set(n);
  }

  protected download(): void {
    try {
      const url = URL.createObjectURL(new Blob([this.markdown()], { type: 'text/markdown' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resumen.md';
      document.body.appendChild(a); // Firefox y Safari antiguos solo descargan si el enlace está en el documento
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error('Resumen: no se ha podido generar el Markdown', e);
      this.snackBar.open(`No se ha podido generar el documento: ${e instanceof Error ? e.message : e}`, 'Cerrar', { duration: 8000 });
    }
  }

  protected async copy(): Promise<void> {
    try {
      const text = this.markdown();
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else this.copyLegacy(text); // sin HTTPS (p. ej. por IP en red local) no existe navigator.clipboard
      this.snackBar.open('Markdown copiado.', 'Cerrar', { duration: 3000 });
    } catch (e) {
      console.error('Resumen: no se ha podido copiar', e);
      this.snackBar.open(`No se ha podido copiar (${e instanceof Error ? e.message : e}); usa «Exportar Markdown».`, 'Cerrar', { duration: 8000 });
    }
  }

  private copyLegacy(text: string): void {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    if (!ok) throw new Error('el navegador lo ha bloqueado');
  }
}
