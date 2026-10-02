import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Scenario } from '../../../model/candidatos-model';
import { EurPipe } from '../../../pipes/eur.pipe';
import { CostService } from '../../../services/cost.service';

/** Permite fijar a mano el coste total mensual (EUR) de un candidato por escenario. */
@Component({
  selector: 'app-cost-total-editor',
  imports: [EurPipe, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
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

  /** El usuario escribe en euros; el servicio guarda USD. Vacío devuelve el coste de la ficha; un valor no numérico o negativo se ignora. */
  protected set(scenario: Scenario, raw: string): void {
    if (raw.trim() === '') return this.cost.setManual(this.candidateId(), scenario, undefined);
    const eur = Number(raw);
    if (Number.isFinite(eur) && eur >= 0) this.cost.setManual(this.candidateId(), scenario, eur * this.cost.usdPerEur());
  }
}
