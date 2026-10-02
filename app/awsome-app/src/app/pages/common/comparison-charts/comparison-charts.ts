import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { Chart, Filler, Legend, LineElement, LinearScale, PointElement, RadarController, RadialLinearScale, ScatterController, Tooltip } from 'chart.js';
import { Candidate } from '../../../model/candidatos-model';
import { Dimension } from '../../../model/rubrica-model';
import { CostService } from '../../../services/cost.service';

Chart.register(RadarController, ScatterController, RadialLinearScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const COLORS = ['#1565c0', '#c62828', '#2e7d32', '#ef6c00'];

/**
 * Radar de notas por dimensión y coste frente a puntuación de los candidatos comparados, en el escenario de
 * coste activo. Solo entran los candidatos con coste y con puntuación; el resto no se dibuja.
 */
@Component({
  selector: 'app-comparison-charts',
  imports: [DecimalPipe],
  templateUrl: './comparison-charts.html',
  styleUrl: './comparison-charts.scss',
})
export class ComparisonCharts {
  /** Con `totalScore` y `dimensionScores` poblados (ver ScoringService.ranking). */
  readonly candidates = input.required<Candidate[]>();
  readonly dimensions = input.required<Dimension[]>();
  /** Id de la dimensión que se resalta en el radar (la del criterio elegido para comparar). */
  readonly highlight = input<string>();
  private readonly cost = inject(CostService);
  private readonly radarCanvas = viewChild<ElementRef<HTMLCanvasElement>>('radar');
  private readonly scatterCanvas = viewChild<ElementRef<HTMLCanvasElement>>('scatter');

  /** Candidatos con coste (EUR/mes) y puntuación, con su color fijo. */
  protected readonly rows = computed(() =>
    this.candidates().flatMap((c, i) => {
      const monthly = this.cost.monthly(c.id);
      return monthly && c.totalScore !== undefined
        ? [{ candidate: c, eur: this.cost.toEur(monthly.mid, 'USD'), color: COLORS[i % COLORS.length] }]
        : [];
    }),
  );
  protected readonly excluded = computed(() => this.candidates().length - this.rows().length);

  constructor() {
    effect((onCleanup) => this.draw(onCleanup, this.radarCanvas(), () => this.radar()));
    effect((onCleanup) => this.draw(onCleanup, this.scatterCanvas(), () => this.scatter()));
  }

  private draw(onCleanup: (fn: () => void) => void, canvas: ElementRef<HTMLCanvasElement> | undefined, config: () => ConstructorParameters<typeof Chart>[1]): void {
    if (!canvas) return;
    const chart = new Chart(canvas.nativeElement, config());
    onCleanup(() => chart.destroy());
  }

  private radar(): ConstructorParameters<typeof Chart>[1] {
    const dims = this.dimensions();
    const highlight = this.highlight();
    const on = (ctx: { index: number }) => dims[ctx.index]?.id === highlight;
    return {
      type: 'radar',
      data: {
        labels: dims.map((d) => d.id.split('-').pop()!),
        datasets: this.rows().map(({ candidate, color }) => ({
          label: candidate.name,
          data: dims.map((d) => candidate.dimensionScores?.[d.id] ?? null),
          borderColor: color,
          backgroundColor: color + '33',
          pointBackgroundColor: color,
          pointRadius: (ctx: { dataIndex: number }) => (dims[ctx.dataIndex]?.id === highlight ? 7 : 3),
        })),
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0, max: 100, ticks: { stepSize: 25 },
            // el eje del criterio elegido: etiqueta en negrita y su línea resaltada
            pointLabels: { font: (ctx) => ({ weight: on(ctx) ? 'bold' : 'normal', size: on(ctx) ? 15 : 12 }), color: (ctx) => (on(ctx) ? '#000' : '#666') },
            angleLines: { color: (ctx) => (on(ctx) ? '#000' : 'rgba(0,0,0,.1)'), lineWidth: (ctx) => (on(ctx) ? 2 : 1) },
          },
        },
        plugins: { tooltip: { callbacks: { title: (items) => dims[items[0].dataIndex]?.name ?? '' } } },
      },
    };
  }

  private scatter(): ConstructorParameters<typeof Chart>[1] {
    return {
      type: 'scatter',
      data: {
        datasets: this.rows().map(({ candidate, eur, color }) => ({
          label: candidate.name,
          data: [{ x: eur, y: candidate.totalScore! }],
          backgroundColor: color,
          pointRadius: 7,
        })),
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: `Coste mensual, escenario ${this.cost.scenario()} (EUR)` } },
          y: { min: 0, max: 100, title: { display: true, text: 'Puntuación (0-100)' } },
        },
      },
    };
  }
}
