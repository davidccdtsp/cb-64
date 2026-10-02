import { Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import { Chart, Filler, LineElement, PointElement, RadarController, RadialLinearScale, Tooltip } from 'chart.js';
import { Dimension } from '../../../model/rubrica-model';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

/** Radar de las notas (0-100) de un candidato por dimensión. Chart.js se carga con este componente, que se difiere. */
@Component({
  selector: 'app-candidate-radar',
  template: `<div class="canvas"><canvas #radar role="img" [attr.aria-label]="label()"></canvas></div>`,
  styles: '.canvas { position: relative; height: 100%; min-height: 0; }',
})
export class CandidateRadar {
  readonly dimensions = input.required<Dimension[]>();
  /** Nota 0-100 por id de dimensión; solo las dimensiones con criterios aplicables. */
  readonly scores = input.required<Record<string, number>>();
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('radar');

  protected readonly label = computed(
    () => 'Nota por dimensión: ' + this.dimensions().map((d) => `${d.name} ${Math.round(this.scores()[d.id] ?? 0)}`).join(', '),
  );

  constructor() {
    effect((onCleanup) => {
      const canvas = this.canvas();
      if (!canvas) return;
      const dims = this.dimensions();
      const scores = this.scores();
      const chart = new Chart(canvas.nativeElement, {
        type: 'radar',
        data: {
          labels: dims.map((d) => d.id.split('-').pop()!),
          datasets: [{ data: dims.map((d) => scores[d.id] ?? 0), borderColor: '#1565c0', backgroundColor: '#1565c033', pointBackgroundColor: '#1565c0' }],
        },
        options: {
          maintainAspectRatio: false,
          scales: { r: { min: 0, max: 100, ticks: { stepSize: 50, display: false } } },
          plugins: { legend: { display: false }, tooltip: { callbacks: { title: (items) => dims[items[0].dataIndex]?.name ?? '' } } },
        },
      });
      onCleanup(() => chart.destroy());
    });
  }
}
