import { FormControl, FormGroup } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { Candidate } from '../../model/candidatos-model';
import { Domain } from '../../model/domain-model';
import { ActivatedRoute } from '@angular/router';
import { UrlStateBinder } from '../../services/url-state-binder';
import { DataService } from '../../services/data.service';
import { ScoringService } from '../../services/scoring.service';
import { ComparadorPage } from './comparador';

const cand = (id: string, category: string): Candidate => ({
  id, name: id, domain: Domain.data, category, type: '', license: '', deployment: [],
  lastRevisionDate: new Date(), scores: [],
});

describe('ComparadorPage', () => {
  const applyForm = vi.fn();
  const weight = new FormControl(1);
  const form = new FormGroup({
    missing: new FormControl('exclude'),
    weights: new FormGroup({ x: new FormGroup({ id: new FormControl('x'), weight, mandatory: new FormControl(false) }) }),
  });
  const all = ['a1', 'a2', 'b1', 'b2', 'b3'].map((id) => cand(id, id[0]));

  it('limita a 4, filtra por categoría y vacía al cambiar de dominio', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UrlStateBinder, useValue: { bind: () => undefined } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: new Map() } } },
        { provide: DataService, useValue: { categories: () => [], attribute: () => undefined, candidates: () => [], dimensions: () => [], attributes: () => new Map() } },
        { provide: ScoringService, useValue: { ranking: () => all, weightsForm: () => form, applyForm, requiredDeployments: () => [] } },
      ],
    });
    const page = TestBed.createComponent(ComparadorPage).componentInstance as any;
    ['a1', 'a2', 'b1', 'b2', 'b3'].forEach((id) => page.add(id));
    expect(page.compared().length).toBe(4); // el 5.º se ignora

    page.setCategory('b');
    expect(page.compared().map((c: Candidate) => c.id)).toEqual(['b1', 'b2']);

    page.setArea('martech');
    expect(page.compared()).toEqual([]);
  });

  it('aplica al momento los cambios del formulario de pesos', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UrlStateBinder, useValue: { bind: () => undefined } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: new Map() } } },
        { provide: DataService, useValue: { categories: () => [], attribute: () => undefined, candidates: () => [], dimensions: () => [], attributes: () => new Map() } },
        { provide: ScoringService, useValue: { ranking: () => all, weightsForm: () => form, applyForm, requiredDeployments: () => [] } },
      ],
    });
    TestBed.createComponent(ComparadorPage).detectChanges();
    weight.setValue(3);
    expect(applyForm).toHaveBeenCalledWith(Domain.data, form);
  });

  it('criterio de comparación: valor de cada candidato y dimensión a resaltar', () => {
    const withScore = { ...cand('x', 'a'), scores: [{ id: 'c1', score: 4, reliability: 'alta', urls: [] }] };
    TestBed.configureTestingModule({
      providers: [
        { provide: UrlStateBinder, useValue: { bind: () => undefined } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: new Map() } } },
        {
          provide: DataService,
          useValue: {
            categories: () => [], attribute: () => undefined, candidates: () => [],
            dimensions: () => [{ id: 'd1', name: 'Dim', numOfCriteria: 1, weight: 1 }],
            attributes: () => new Map([['d1', [{ id: 'c1', name: 'Crit', question: '', type: 'puntuable', mandatory: false, values: [{ value: 4, description: 'Bien' }] }]]]),
          },
        },
        { provide: ScoringService, useValue: { ranking: () => [withScore], weightsForm: () => form, applyForm } },
      ],
    });
    const page = TestBed.createComponent(ComparadorPage).componentInstance as any;
    page.add('x');
    expect(page.criterionRows()).toEqual([]); // sin criterio elegido
    page.criterion.set('c1');
    expect(page.highlight()).toBe('d1');
    expect(page.criterionRows()[0]).toMatchObject({ score: 4, description: 'Bien', reliability: 'alta' });
    page.setArea('martech');
    expect(page.criterion()).toBe('');
  });
});
