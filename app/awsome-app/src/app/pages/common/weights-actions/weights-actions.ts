import { booleanAttribute, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Domain } from '../../../model/domain-model';
import { ScoringService } from '../../../services/scoring.service';
import { DimensionWeightsDialog } from '../dimension-weights-dialog/dimension-weights-dialog';
import { WeightsDialog } from '../weights-dialog/weights-dialog';

/**
 * Sección de pesos de Listado y Catálogo: botones que abren la edición de los pesos de dimensiones y criterios, chips
 * con los criterios obligatorios (quitar uno lo deja de marcar como obligatorio) y, si se pide con `costNotice`, un aviso cuando el coste no es obligatorio.
 */
@Component({
  selector: 'app-weights-actions',
  imports: [MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './weights-actions.html',
  styleUrl: './weights-actions.scss',
})
export class WeightsActions {
  private readonly dialog = inject(MatDialog);
  private readonly scoring = inject(ScoringService);
  readonly domain = input.required<Domain>();
  /** Muestra el aviso de que el coste no es obligatorio (solo el Catálogo lo necesita). */
  readonly costNotice = input(false, { transform: booleanAttribute });

  protected readonly mandatory = computed(() => this.scoring.mandatoryAttributes(this.domain()));
  protected readonly cost = computed(() => this.scoring.costAttribute(this.domain()));
  /** El coste no es obligatorio: se muestran también los candidatos sin precio (no tienen nota de coste). */
  protected readonly costOptional = computed(() => !!this.cost() && !this.cost()!.mandatory);

  protected editWeights(): void {
    this.dialog.open(WeightsDialog, { width: '48rem', maxWidth: '95vw', data: this.domain() });
  }

  protected editDimensionWeights(): void {
    this.dialog.open(DimensionWeightsDialog, { width: '40rem', maxWidth: '95vw', data: this.domain() });
  }

  protected remove(id: string): void {
    this.scoring.setMandatory(this.domain(), id, false);
  }
}
