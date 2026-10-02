import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Candidate } from '../../model/candidatos-model';
import { Area, domainOf } from '../../model/domain-model';
import { DataService } from '../../services/data.service';
import { CostService } from '../../services/cost.service';
import { ScoringService } from '../../services/scoring.service';
import { UrlStateBinder } from '../../services/url-state-binder';
import { paginatorEs } from '../common/paginator-es';
import { CandidateTable } from '../common/candidate-table/candidate-table';
import { Breadcrumbs } from '../common/breadcrumbs/breadcrumbs';
import { ConfigMenu } from '../common/config-menu/config-menu';
import { DeploymentSelect } from '../common/deployment-select/deployment-select';
import { ScenarioSelect } from '../common/scenario-select/scenario-select';
import { CandidateCard } from '../common/candidate-card/candidate-card';
import { WeightsActions } from '../common/weights-actions/weights-actions';

@Component({
  selector: 'app-listado',
  imports: [ConfigMenu, WeightsActions, MatExpansionModule, MatFormFieldModule, MatSelectModule, MatPaginatorModule, Breadcrumbs, CandidateCard, CandidateTable, DeploymentSelect, ScenarioSelect],
  templateUrl: './listado.html',
  styleUrl: './listado.scss',
  providers: [{ provide: MatPaginatorIntl, useFactory: paginatorEs }],
})
export class ListadoPage {
  private readonly data = inject(DataService);
  private readonly scoring = inject(ScoringService);
  protected readonly cost = inject(CostService);
  protected readonly area = signal<Area>('datos');
  protected readonly category = signal('');
  protected readonly selected = signal<Candidate | null>(null);
  protected readonly columns = ['name', 'category', 'type', 'license', 'lastRevisionDater', 'priceModel', 'cost', 'totalScore'];
  protected readonly sort = signal<Sort>({ active: '', direction: '' });
  protected readonly categories = computed(() => this.data.categories(this.area()));
  private readonly ranked = computed(() =>
    this.scoring.ranking({
      domain: domainOf(this.area()),
      category: this.category() || undefined,
    }),
  );
  /** Sin ordenación elegida se mantiene el orden del ranking; los vacíos van siempre al final. */
  protected readonly candidates = computed(() => {
    const { active, direction } = this.sort();
    if (!active || !direction) return this.ranked();
    const dir = direction === 'asc' ? 1 : -1;
    const key = (c: Candidate) => {
      if (active === 'cost') return this.cost.monthly(c.id)?.mid;
      const v = c[active as keyof Candidate];
      return v instanceof Date ? v.getTime() : (v as string | number | undefined);
    };
    return [...this.ranked()].sort((a, b) => {
      const x = key(a), y = key(b);
      if (x === undefined || y === undefined) return x === y ? 0 : x === undefined ? 1 : -1;
      return dir * (typeof x === 'string' ? x.localeCompare(y as string) : x - (y as number));
    });
  });
  constructor() {
    inject(UrlStateBinder).bind(inject(ActivatedRoute), {
      read: (get) => {
        const area = (get('area') ?? 'datos') as Area;
        const category = get('cat') ?? '';
        if ((area !== 'datos' && area !== 'martech') || (category && !this.data.categories(area).some((c) => c.id === category))) return false;
        this.area.set(area);
        this.category.set(category);
        return true;
      },
      write: () => ({ ...(this.area() !== 'datos' ? { area: this.area() } : {}), ...(this.category() ? { cat: this.category() } : {}) }),
    });
    effect(() => {
      // al cambiar de área, categoría u ordenación se vuelve a la primera página
      this.area();
      this.category();
      this.sort();
      this.pageIndex.set(0);
    });
  }

  protected readonly pageSizes = [25, 50];
  protected readonly pageSize = signal(25);
  protected readonly pageIndex = signal(0);
  /** Índice de página vigente: si los filtros dejan menos páginas, es la última. */
  protected readonly pageIdx = computed(() => Math.min(this.pageIndex(), Math.max(0, Math.ceil(this.candidates().length / this.pageSize()) - 1)));
  protected readonly page = computed(() => this.candidates().slice(this.pageIdx() * this.pageSize(), (this.pageIdx() + 1) * this.pageSize()));
  protected readonly crumbs = computed(() => ['Listado', ...(this.selected() ? [this.selected()!.name] : [])]);

  protected setPage(e: PageEvent): void {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  protected readonly domain = computed(() => domainOf(this.area()));
}
