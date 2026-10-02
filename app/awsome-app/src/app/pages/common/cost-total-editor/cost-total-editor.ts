import { Component, inject, input } from '@angular/core';
import { Scenario } from '../../../model/candidatos-model';
import { CostInput } from '../cost-input/cost-input';
import { EurPipe } from '../../../pipes/eur.pipe';
import { CostService } from '../../../services/cost.service';

/** Permite fijar a mano el coste total mensual (EUR) de un candidato por escenario. */
@Component({
  selector: 'app-cost-total-editor',
  imports: [EurPipe, CostInput],
  templateUrl: './cost-total-editor.html',
  styleUrl: './cost-total-editor.scss',
})
export class CostTotalEditor {
  protected readonly cost = inject(CostService);
  readonly candidateId = input.required<string>();
  protected readonly scenarios: Scenario[] = ['S', 'M', 'L'];

  /** Importe en euros, redondeado a céntimos, para mostrarlo en el campo. */
  protected eur(usd: number): number {
    return Math.round(this.cost.toEur(usd, 'USD') * 100) / 100;
  }

  /** El usuario escribe en euros; el servicio guarda USD. `undefined` devuelve el coste de la ficha. */
  protected set(scenario: Scenario, eur: number | undefined): void {
    this.cost.setManual(this.candidateId(), scenario, eur === undefined ? undefined : eur * this.cost.usdPerEur());
  }
}
