import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EurPipe } from '../../../pipes/eur.pipe';
import { DataService } from '../../../services/data.service';
import { CostService } from '../../../services/cost.service';
import { areaOf } from '../../../model/domain-model';

/** Calculadora de un candidato con modelo de precios: supuestos editables y desglose del coste. */
@Component({
  selector: 'app-cost-calculator',
  imports: [EurPipe, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
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

  /** Vacío restablece el valor de la ficha; un valor no numérico o negativo se ignora. */
  private parse(raw: string): number | undefined | null {
    if (raw.trim() === '') return undefined;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  protected setScenarioParam(id: string, raw: string): void {
    const value = this.parse(raw);
    const domain = this.data.candidate(this.candidateId())?.domain;
    if (value !== null && domain !== undefined) {
      this.cost.setScenarioParam(areaOf(domain), id, this.cost.scenario(), value);
    }
  }

  protected setModelParam(id: string, raw: string): void {
    const value = this.parse(raw);
    if (value !== null) this.cost.setModelParam(this.candidateId(), id, this.cost.scenario(), value);
  }
}
