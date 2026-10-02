import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CostService } from '../../../services/cost.service';
import { DataService } from '../../../services/data.service';
import { CostCalculator } from '../cost-calculator/cost-calculator';
import { CostTotalEditor } from '../cost-total-editor/cost-total-editor';
import { ScenarioSelect } from '../scenario-select/scenario-select';

/** Edita el coste de un candidato: la calculadora si su ficha tiene modelo de precios y, si no, el total manual. Los cambios se aplican al momento. */
@Component({
  selector: 'app-cost-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CostCalculator, CostTotalEditor, ScenarioSelect],
  templateUrl: './cost-dialog.html',
  styleUrl: './cost-dialog.scss',
})
export class CostDialog {
  private readonly data = inject(DataService);
  protected readonly cost = inject(CostService);
  protected readonly candidateId = inject<string>(MAT_DIALOG_DATA);
  protected readonly name = computed(() => this.data.candidate(this.candidateId)?.name ?? this.candidateId);
  protected readonly hasModel = computed(() => !!this.data.costs(this.candidateId)?.model);
}
