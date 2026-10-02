import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AnyScore, Candidate } from '../../../model/candidatos-model';
import { areaOf } from '../../../model/domain-model';
import { CostCalculator } from '../cost-calculator/cost-calculator';
import { CostTotalEditor } from '../cost-total-editor/cost-total-editor';
import { DataService } from '../../../services/data.service';
import { ScoringService } from '../../../services/scoring.service';
import { CandidateRadar } from '../candidate-radar/candidate-radar';

@Component({
  selector: 'app-candidate-card',
  imports: [CandidateRadar, CostCalculator, CostTotalEditor, MatCardModule, MatExpansionModule, MatIconModule, MatTableModule, DatePipe, DecimalPipe],
  templateUrl: './candidate-card.html',
  styleUrl: './candidate-card.scss',
})
export class CandidateCard {
  private readonly data = inject(DataService);
  private readonly scoring = inject(ScoringService);
  readonly candidate = input.required<Candidate>();
  protected readonly columns = ['name', 'score', 'description', 'reliability', 'urls'];

  /** El candidato con su puntuación vigente (pesos, escenario y requisitos actuales), no la de cuando se abrió la ficha. */
  protected readonly scored = computed(() => this.scoring.ranking({ domain: this.candidate().domain }).find((c) => c.id === this.candidate().id));
  protected readonly dimensions = computed(() => this.data.dimensions(areaOf(this.candidate().domain)));
  protected readonly hasDimensionScores = computed(() => Object.keys(this.scored()?.dimensionScores ?? {}).length > 0);

  protected readonly hasModel = computed(() => !!this.data.costs(this.candidate().id)?.model);

  protected readonly costs = computed(() => {
    const cost = this.data.costs(this.candidate().id);
    // las columnas varían por tabla: son las claves de sus filas
    return cost && { ...cost, tables: cost.tables.map((t) => ({ ...t, columns: Object.keys(t.rows[0] ?? {}) })) };
  });

  /**
   * Lista plana para una única tabla: cada dimensión aporta una fila de grupo
   * (`{ group }`) seguida de sus puntuaciones. `score`/`description` solo existen en las numéricas y `value` en las booleanas y `text` en las informativas con texto (se muestra en «Significado»).
   */
  protected readonly rows = computed(() => {
    const row = (s: AnyScore) => {
      const attribute = this.data.attribute(s.id);
      const score = 'score' in s ? s.score : undefined;
      return {
        id: s.id,
        reliability: s.reliability,
        urls: s.urls,
        name: attribute?.name ?? s.id,
        question: attribute?.question,
        score,
        value: 'value' in s ? s.value : undefined,
        text: 'text' in s ? s.text : undefined,
        description: attribute?.values?.find((v) => v.value === score)?.description,
      };
    };
    const { scores, domain } = this.candidate();
    const attributes = this.data.attributes();
    const assigned = new Set<string>();
    const rows: object[] = [];
    for (const d of this.data.dimensions(areaOf(domain))) {
      const ids = new Set(attributes.get(d.id)?.map((a) => a.id));
      const own = scores.filter((s) => ids.has(s.id));
      own.forEach((s) => assigned.add(s.id));
      if (own.length) rows.push({ group: d.name }, ...own.map(row));
    }
    const rest = scores.filter((s) => !assigned.has(s.id));
    if (rest.length) rows.push({ group: 'Otros' }, ...rest.map(row));
    return rows;
  });

  protected readonly isGroup = (_: number, r: object) => 'group' in r;
}
