import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AppConfigService } from '../../services/app-config.service';
import { Candidate } from '../../model/candidatos-model';
import { Area, domainOf } from '../../model/domain-model';
import { DataService } from '../../services/data.service';
import { CostService } from '../../services/cost.service';
import { ScoringService } from '../../services/scoring.service';
import { CatalogProfilesService } from '../../services/catalog-profiles.service';
import { BANDS, HeatmapService, costLabel, matrixColor, scoreLabel } from '../../services/heatmap.service';
import { WeightsActions } from '../common/weights-actions/weights-actions';
import { UrlStateBinder } from '../../services/url-state-binder';
import { ConfigMenu } from '../common/config-menu/config-menu';
import { CostDialog } from '../common/cost-dialog/cost-dialog';
import { ProfileNameDialog } from './profile-name-dialog/profile-name-dialog';
import { CandidateTable, RowHeat } from '../common/candidate-table/candidate-table';
import { Breadcrumbs } from '../common/breadcrumbs/breadcrumbs';
import { CandidateCard } from '../common/candidate-card/candidate-card';
import { DeploymentSelect } from '../common/deployment-select/deployment-select';
import { ScenarioSelect } from '../common/scenario-select/scenario-select';
import { CatalogFilters, LicenseFamily } from '../../model/catalog-model';

/** Ranking 0-100 con desglose por dimensión: candidatos con puntuación, siempre en orden de ranking, hasta `catalogMaxRows` (config.json). Pinchar una fila abre su ficha. */
@Component({
  selector: 'app-catalogo',
  imports: [MatExpansionModule, MatButtonModule, MatIconModule, MatSlideToggleModule, ConfigMenu, WeightsActions, MatFormFieldModule, MatSelectModule, Breadcrumbs, CandidateCard, CandidateTable, DeploymentSelect, ScenarioSelect],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class CatalogoPage {
  private readonly data = inject(DataService);
  private readonly scoring = inject(ScoringService);
  private readonly max = inject(AppConfigService).catalogMaxRows;
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly profileService = inject(CatalogProfilesService);
  private readonly heatmap = inject(HeatmapService);
  protected readonly cost = inject(CostService);
  protected readonly area = signal<Area>('datos');
  protected readonly category = signal('');
  protected readonly profile = signal('');
  protected readonly profiles = computed(() => this.profileService.profiles(this.area()));
  protected readonly selected = signal<Candidate | null>(null);
  protected readonly crumbs = computed(() => ['Catálogo', ...(this.selected() ? [this.selected()!.name] : [])]);
  protected readonly categories = computed(() => this.data.categories(this.area()));
  protected readonly type = signal('');
  protected readonly deployment = signal<string[]>([]);
  protected readonly license = signal<LicenseFamily | ''>('');
  protected readonly domain = computed(() => domainOf(this.area()));
  protected readonly options = computed(() => this.scoring.catalogOptions(this.domain()));
  protected readonly dimensions = computed(() => this.data.dimensions(this.area()));
  /** Las columnas de dimensión ocupan mucho: ocultas por defecto. */
  protected readonly showDimensions = signal(false);
  /** Oculta el mapa de calor (color de las filas por nota y coste, y su leyenda); por defecto se ve. */
  protected readonly hideHeatmap = signal(false);
  protected readonly columns = computed(() => [
    'name', 'category', 'type', 'license', 'lastRevisionDater', 'priceModel', 'cost', 'totalScore',
    ...(this.showDimensions() ? this.dimensions().map((d) => d.id) : []),
  ]);
  protected readonly candidates = computed(() =>
    this.scoring.catalog({
      domain: this.domain(),
      category: this.category() || undefined,
      type: this.type() || undefined,
      deployment: this.deployment(),
      license: this.license() || undefined,
      limit: this.max(),
    }),
  );

  /** Franjas del mapa de calor: absolutas, calculadas con todos los candidatos del dominio, no con las filas filtradas. */
  private readonly heat = computed(() => this.heatmap.forDomain(this.domain()));
  private readonly bands = Array.from({ length: BANDS }, (_, i) => i);
  /** Leyenda: matriz de nota (columnas, de menor a mayor) por coste (filas, de más barato a más caro). */
  protected readonly legendScores = this.bands.map((b) => scoreLabel(b));
  protected readonly legend = [...this.bands].reverse().map((costBand) => ({
    label: costLabel(costBand),
    cells: this.bands.map((scoreBand) => matrixColor(scoreBand, costBand)),
  }));

  /** Color de fondo de la fila (coordenada nota × coste) y texto de ayuda; sin color si falta la nota o el coste. */
  protected readonly rowHeat = (c: Candidate): RowHeat => {
    const cell = this.heat().cell(c.totalScore, this.cost.monthly(c.id)?.mid);
    return cell
      ? { color: matrixColor(cell.scoreBand, cell.costBand), title: `Nota ${scoreLabel(cell.scoreBand)} · coste ${costLabel(cell.costBand)}` }
      : { color: null, title: 'Sin coste: la fila no tiene color' };
  };

  constructor() {
    inject(UrlStateBinder).bind(inject(ActivatedRoute), {
      read: (get) => {
        const area = (get('area') ?? 'datos') as Area;
        if (area !== 'datos' && area !== 'martech') return false;
        const domain = domainOf(area);
        const options = this.scoring.catalogOptions(domain);
        const category = get('cat') ?? '';
        const type = get('tipo') ?? '';
        const license = get('lic') ?? '';
        const deployment = get('desp') === null ? [] : get('desp')!.split(',');
        const profile = get('perfil') ?? '';
        const flag = (v: string | null) => v === null || v === '1';
        const valid =
          (!category || this.data.categories(area).some((c) => c.id === category)) &&
          (!type || options.types.includes(type)) &&
          (!license || options.licenses.includes(license as LicenseFamily)) &&
          deployment.every((d) => options.deployments.includes(d)) &&
          (!profile || this.profileService.profiles(area).some((p) => p.id === profile)) &&
          flag(get('dim')) && flag(get('oh'));
        if (!valid) return false;
        this.area.set(area);
        this.category.set(category);
        this.type.set(type);
        this.license.set(license as LicenseFamily | '');
        this.deployment.set(deployment);
        this.profile.set(profile);
        this.showDimensions.set(get('dim') === '1');
        this.hideHeatmap.set(get('oh') === '1');
        return true;
      },
      write: () => ({
        ...(this.area() !== 'datos' ? { area: this.area() } : {}),
        ...(this.category() ? { cat: this.category() } : {}),
        ...(this.type() ? { tipo: this.type() } : {}),
        ...(this.license() ? { lic: this.license() } : {}),
        ...(this.deployment().length ? { desp: this.deployment().join(',') } : {}),
        ...(this.profile() ? { perfil: this.profile() } : {}),
        ...(this.showDimensions() ? { dim: '1' } : {}),
        ...(this.hideHeatmap() ? { oh: '1' } : {}),
      }),
    });
  }

  protected editCost(candidateId: string): void {
    this.dialog.open(CostDialog, { width: '56rem', maxWidth: '95vw', data: candidateId });
  }

  protected setArea(area: Area): void {
    this.area.set(area);
    this.clearFilters();
  }

  /** Aplica los filtros de un perfil ('' = ninguno, deja los filtros como están). */
  protected applyProfile(id: string): void {
    this.profile.set(id);
    const f = this.profiles().find((p) => p.id === id)?.filters;
    if (!f) return;
    this.category.set(f.category);
    this.type.set(f.type);
    this.license.set(f.license);
    this.deployment.set([...f.deployment]);
  }

  private currentFilters(): CatalogFilters {
    return { category: this.category(), type: this.type(), license: this.license(), deployment: this.deployment() };
  }

  /** Edita el perfil elegido: sus filtros pasan a ser los actuales. */
  protected saveProfile(): void {
    this.profileService.save(this.area(), this.profile(), this.currentFilters());
  }

  /** Pide un nombre y crea un perfil nuevo con los filtros actuales; queda elegido. */
  protected newProfile(): void {
    this.dialog
      .open(ProfileNameDialog, { width: '28rem', maxWidth: '95vw' })
      .afterClosed()
      .subscribe((name?: string) => {
        if (!name) return;
        try {
          this.profile.set(this.profileService.add(this.area(), name, this.currentFilters()).id);
        } catch (e) {
          this.snackBar.open(e instanceof Error ? e.message : 'No se ha podido crear el perfil.', 'Cerrar', { duration: 6000 });
        }
      });
  }

  protected isPredefined(): boolean {
    return this.profileService.isPredefined(this.area(), this.profile());
  }

  protected restoreProfile(): void {
    this.profileService.restore(this.area(), this.profile());
    this.applyProfile(this.profile());
  }

  /** Botón «Restablecer filtros»: quita los filtros de la página y el despliegue obligatorio; el área y el escenario se mantienen. */
  protected reset(): void {
    this.clearFilters();
    this.scoring.setRequiredDeployments([]);
  }

  /** Quita los filtros propios del catálogo (perfil, categoría, tipo, licencia y despliegue). */
  private clearFilters(): void {
    this.profile.set('');
    this.category.set('');
    this.type.set('');
    this.deployment.set([]);
    this.license.set('');
  }
}
