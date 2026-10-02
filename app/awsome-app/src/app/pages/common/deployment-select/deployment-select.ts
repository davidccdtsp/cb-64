import { Component, computed, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import { ScoringService } from '../../../services/scoring.service';

/** Requisito eliminatorio de despliegue, compartido por todas las páginas (ScoringService.requiredDeployments). */
@Component({
  selector: 'app-deployment-select',
  imports: [MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>Despliegue obligatorio</mat-label>
      <mat-select multiple [value]="scoring.requiredDeployments()" (selectionChange)="scoring.setRequiredDeployments($event.value)">
        @for (d of deployments(); track d) {
          <mat-option [value]="d">{{ d }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class DeploymentSelect {
  protected readonly scoring = inject(ScoringService);
  private readonly data = inject(DataService);
  protected readonly deployments = computed(() => [...new Set(this.data.candidates().flatMap((c) => c.deployment))].sort());
}
