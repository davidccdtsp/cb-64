import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Domain } from '../../../model/domain-model';
import { ScoringService } from '../../../services/scoring.service';
import { WeightsForm } from '../weights-form/weights-form';

@Component({
  selector: 'app-weights-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, WeightsForm],
  templateUrl: './weights-dialog.html',
  styleUrl: './weights-dialog.scss',
})
export class WeightsDialog {
  private readonly scoring = inject(ScoringService);
  private readonly dialogRef = inject(MatDialogRef<WeightsDialog>);
  private readonly domain = inject<Domain>(MAT_DIALOG_DATA);
  protected readonly form = this.scoring.weightsForm(this.domain);

  protected save(): void {
    this.scoring.applyForm(this.domain, this.form);
    this.dialogRef.close();
  }
}
