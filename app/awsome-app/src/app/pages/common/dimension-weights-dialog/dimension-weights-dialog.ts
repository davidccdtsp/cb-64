import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Domain } from '../../../model/domain-model';
import { ScoringService } from '../../../services/scoring.service';
import { DimensionWeightsForm } from '../dimension-weights-form/dimension-weights-form';

@Component({
  selector: 'app-dimension-weights-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, DimensionWeightsForm],
  templateUrl: './dimension-weights-dialog.html',
  styleUrl: './dimension-weights-dialog.scss',
})
export class DimensionWeightsDialog {
  private readonly scoring = inject(ScoringService);
  private readonly dialogRef = inject(MatDialogRef<DimensionWeightsDialog>);
  private readonly domain = inject<Domain>(MAT_DIALOG_DATA);
  protected readonly form = this.scoring.dimensionWeightsForm(this.domain);

  /** Vuelve a los valores de la rúbrica (JSON); hay que guardar para aplicarlos. */
  protected restoreDefaults(): void {
    this.scoring.setDimensionWeightsFormDefaults(this.form);
  }

  protected save(): void {
    this.scoring.applyDimensionWeights(this.domain, this.form);
    this.dialogRef.close();
  }
}
