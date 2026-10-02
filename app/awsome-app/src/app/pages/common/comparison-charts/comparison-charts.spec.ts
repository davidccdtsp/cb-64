import { TestBed } from '@angular/core/testing';
import { Candidate } from '../../../model/candidatos-model';
import { Domain } from '../../../model/domain-model';
import { CostService } from '../../../services/cost.service';
import { ComparisonCharts } from './comparison-charts';

const cand = (id: string, totalScore?: number): Candidate => ({
  id, name: id, domain: Domain.data, category: 'x', type: '', license: '', deployment: [],
  lastRevisionDate: new Date(), scores: [], totalScore,
});

describe('ComparisonCharts', () => {
  it('solo dibuja candidatos con coste y puntuación, y pasa el coste a EUR', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CostService,
          useValue: { monthly: (id: string) => (id === 'sin-coste' ? undefined : { mid: 110 }), toEur: (n: number) => n / 1.1 },
        },
      ],
    });
    const fixture = TestBed.createComponent(ComparisonCharts);
    fixture.componentRef.setInput('candidates', [cand('a', 80), cand('sin-coste', 70), cand('sin-nota')]);
    fixture.componentRef.setInput('dimensions', []);
    const page = fixture.componentInstance as any;
    expect(page.rows().map((r: any) => [r.candidate.id, r.eur])).toEqual([['a', expect.closeTo(100, 5)]]);
    expect(page.excluded()).toBe(2);
  });
});
