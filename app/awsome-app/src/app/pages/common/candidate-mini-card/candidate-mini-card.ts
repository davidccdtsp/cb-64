import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Candidate } from '../../../model/candidatos-model';
import { EurPipe } from '../../../pipes/eur.pipe';
import { CostService } from '../../../services/cost.service';

@Component({
  selector: 'app-candidate-mini-card',
  imports: [MatButtonModule, MatCardModule, MatIconModule, DatePipe, DecimalPipe, EurPipe],
  templateUrl: './candidate-mini-card.html',
  styleUrl: './candidate-mini-card.scss',
})
export class CandidateMiniCard {
  /** Con `totalScore` poblado (ver ScoringService.ranking). */
  readonly candidate = input.required<Candidate>();
  readonly removed = output<void>();
  private readonly costService = inject(CostService);
  protected readonly cost = computed(() => this.costService.monthly(this.candidate().id));
}
