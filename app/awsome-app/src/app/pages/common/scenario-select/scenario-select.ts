import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Scenario } from '../../../model/candidatos-model';
import { CostService } from '../../../services/cost.service';

/** Escenario S/M/L de coste, compartido por todas las páginas (CostService.scenario). */
@Component({
  selector: 'app-scenario-select',
  imports: [MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>Escenario de coste</mat-label>
      <mat-select [value]="cost.scenario()" (selectionChange)="cost.scenario.set($event.value)">
        @for (s of scenarios; track s) {
          <mat-option [value]="s">{{ s }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class ScenarioSelect {
  protected readonly cost = inject(CostService);
  protected readonly scenarios: Scenario[] = ['S', 'M', 'L'];
}
