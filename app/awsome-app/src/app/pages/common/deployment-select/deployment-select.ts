import { Component, computed, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Area, domainOf } from '../../../model/domain-model';
import { DataService } from '../../../services/data.service';
import { ScoringService } from '../../../services/scoring.service';

/**
 * Requisito eliminatorio de despliegue, compartido por todas las páginas (ScoringService.requiredDeployments). Con `area`
 * solo ofrece los despliegues de los candidatos de esa área.
 */
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
  readonly area = input<Area>();
  protected readonly deployments = computed(() => {
    const area = this.area();
    return [...new Set(this.data.candidates(area ? { domain: domainOf(area) } : {}).flatMap((c) => c.deployment))].sort();
  });
}
