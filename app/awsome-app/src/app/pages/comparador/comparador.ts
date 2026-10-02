import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Candidate } from '../../model/candidatos-model';
import { AttributeType } from '../../model/rubrica-model';
import { EurPipe } from '../../pipes/eur.pipe';
import { CostService } from '../../services/cost.service';
import { Area, domainOf } from '../../model/domain-model';
import { DataService } from '../../services/data.service';
import { ScoringService } from '../../services/scoring.service';
import { DeploymentSelect } from '../common/deployment-select/deployment-select';
import { ScenarioSelect } from '../common/scenario-select/scenario-select';
import { UrlStateBinder } from '../../services/url-state-binder';
import { ConfigMenu } from '../common/config-menu/config-menu';
import { ComparisonCharts } from '../common/comparison-charts/comparison-charts';
import { CandidateMiniCard } from '../common/candidate-mini-card/candidate-mini-card';
import { WeightsForm } from '../common/weights-form/weights-form';

@Component({
  selector: 'app-comparador',
  imports: [ConfigMenu, MatButtonModule, DecimalPipe, EurPipe, MatExpansionModule, MatFormFieldModule, MatSelectModule, CandidateMiniCard, ComparisonCharts, DeploymentSelect, ScenarioSelect, WeightsForm],
  templateUrl: './comparador.html',
  styleUrl: './comparador.scss',
})
export class ComparadorPage {
  private readonly data = inject(DataService);
  private readonly scoring = inject(ScoringService);
  protected readonly cost = inject(CostService);
  protected readonly max = 4;

  protected readonly area = signal<Area>('datos');
  protected readonly category = signal('');
  private readonly ids = signal<string[]>([]);
  /** Criterio elegido para compararlo candidato a candidato (id de atributo; vacío = ninguno). */
  protected readonly criterion = signal('');

  private readonly domain = computed(() => domainOf(this.area()));
  protected readonly categories = computed(() => this.data.categories(this.area()));
  private readonly ranked = computed(() => this.scoring.ranking({ domain: this.domain() }));
  /** Candidatos que se pueden añadir: del filtro actual y aún no comparados. */
  protected readonly available = computed(() =>
    this.ranked().filter((c) => (!this.category() || c.category === this.category()) && !this.ids().includes(c.id)),
  );
  protected readonly compared = computed(() =>
    this.ids()
      .map((id) => this.ranked().find((c) => c.id === id))
      .filter((c): c is Candidate => !!c),
  );
  protected readonly dimensions = computed(() => this.data.dimensions(this.area()));
  /** Criterios puntuables y booleanos del dominio, por dimensión. */
  protected readonly criteria = computed(() =>
    this.dimensions()
      .map((dimension) => ({
        dimension,
        items: (this.data.attributes().get(dimension.id) ?? []).filter((a) => a.type !== AttributeType.informativo),
      }))
      .filter((g) => g.items.length),
  );
  /** Dimensión del criterio elegido: es el eje que se resalta en el radar. */
  protected readonly highlight = computed(() => this.criteria().find((g) => g.items.some((a) => a.id === this.criterion()))?.dimension.id);
  protected readonly criterionName = computed(() => this.criteria().flatMap((g) => g.items).find((a) => a.id === this.criterion())?.name);
  /** Lo que tiene cada candidato comparado en el criterio elegido. */
  protected readonly criterionRows = computed(() => {
    const id = this.criterion();
    const attribute = this.criteria().flatMap((g) => g.items).find((a) => a.id === id);
    if (!attribute) return [];
    return this.compared().map((candidate) => {
      const s = candidate.scores.find((x) => x.id === id);
      return {
        candidate,
        calculated: !!attribute.calculated,
        score: s && 'score' in s ? s.score : undefined,
        bool: s && 'value' in s ? s.value : undefined,
        text: s && 'text' in s ? s.text : undefined,
        description: s && 'score' in s ? attribute.values?.find((v) => v.value === s.score)?.description : undefined,
        reliability: s?.reliability,
      };
    });
  });
  protected readonly weightsForm = computed(() => this.scoring.weightsForm(this.domain()));

  constructor() {
    inject(UrlStateBinder).bind(inject(ActivatedRoute), {
      read: (get) => {
        const area = (get('area') ?? 'datos') as Area;
        if (area !== 'datos' && area !== 'martech') return false;
        const domain = domainOf(area);
        const category = get('cat') ?? '';
        const ids = get('cand') === null ? [] : get('cand')!.split(',');
        const criterion = get('crit') ?? '';
        const pool = this.data.candidates({ domain });
        const criteriaIds = this.data.dimensions(area).flatMap((d) => (this.data.attributes().get(d.id) ?? []).filter((a) => a.type !== AttributeType.informativo).map((a) => a.id));
        const valid =
          (!category || this.data.categories(area).some((c) => c.id === category)) &&
          ids.length <= this.max &&
          new Set(ids).size === ids.length &&
          ids.every((id) => pool.some((c) => c.id === id && (!category || c.category === category))) &&
          (!criterion || criteriaIds.includes(criterion));
        if (!valid) return false;
        this.area.set(area);
        this.category.set(category);
        this.ids.set(ids);
        this.criterion.set(criterion);
        return true;
      },
      write: () => ({
        ...(this.area() !== 'datos' ? { area: this.area() } : {}),
        ...(this.category() ? { cat: this.category() } : {}),
        ...(this.ids().length ? { cand: this.ids().join(',') } : {}),
        ...(this.criterion() ? { crit: this.criterion() } : {}),
      }),
    });
    // los cambios de peso, obligatoriedad y tratamiento de criterios sin puntuación se aplican al momento: las notas de los candidatos comparados se recalculan
    effect((onCleanup) => {
      const form = this.weightsForm();
      const domain = this.domain();
      const sub = form.valueChanges.subscribe(() => this.scoring.applyForm(domain, form));
      onCleanup(() => sub.unsubscribe());
    });
  }

  protected resetWeights(): void {
    this.scoring.resetWeights(this.domain());
  }

  /** Cambiar de área vacía la comparación: sus candidatos ya no pertenecen al filtro. */
  protected setArea(area: Area): void {
    this.area.set(area);
    this.category.set('');
    this.ids.set([]);
    this.criterion.set('');
  }

  /** Al filtrar por categoría se retiran los candidatos comparados que no la cumplan. */
  protected setCategory(category: string): void {
    this.category.set(category);
    if (category) {
      this.ids.update((ids) => ids.filter((id) => this.ranked().find((c) => c.id === id)?.category === category));
    }
  }

  protected add(id: string): void {
    if (this.ids().length < this.max) this.ids.update((ids) => [...ids, id]);
  }

  protected remove(id: string): void {
    this.ids.update((ids) => ids.filter((i) => i !== id));
  }
}
