import { Component, computed, inject, input } from '@angular/core';
import { CostInput } from '../cost-input/cost-input';
import { EurPipe } from '../../../pipes/eur.pipe';
import { DataService } from '../../../services/data.service';
import { CostService } from '../../../services/cost.service';
import { areaOf } from '../../../model/domain-model';

/** Calculadora de un candidato con modelo de precios: supuestos editables y desglose del coste. */
@Component({
  selector: 'app-cost-calculator',
  imports: [EurPipe, CostInput],
  templateUrl: './cost-calculator.html',
  styleUrl: './cost-calculator.scss',
})
export class CostCalculator {
  protected readonly cost = inject(CostService);
  private readonly data = inject(DataService);
  readonly candidateId = input.required<string>();

  protected readonly calculation = computed(() => this.cost.calculate(this.candidateId()));
  protected readonly scenarioParams = computed(() => this.cost.scenarioParamsOf(this.candidateId()));
  protected readonly modelParams = computed(() => this.cost.modelParamsOf(this.candidateId()));

  /** `undefined` restablece el valor de la ficha. */
  protected setScenarioParam(id: string, value: number | undefined): void {
    const domain = this.data.candidate(this.candidateId())?.domain;
    if (domain !== undefined) {
      this.cost.setScenarioParam(areaOf(domain), id, this.cost.scenario(), value);
    }
  }

  protected setModelParam(id: string, value: number | undefined): void {
    this.cost.setModelParam(this.candidateId(), id, this.cost.scenario(), value);
  }
}
