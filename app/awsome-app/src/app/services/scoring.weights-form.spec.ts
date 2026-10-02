import { computed, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Domain } from '../model/domain-model';
import { Attribute, AttributeType } from '../model/rubrica-model';
import { CostService } from './cost.service';
import { DataService } from './data.service';
import { ScoringService } from './scoring.service';

/** El formulario de pesos que usa el comparador no debe recrearse mientras el usuario lo edita (M9). */
describe('ScoringService.weightsForm', () => {
  const attrs = signal<Attribute[]>([{ id: 'a1', name: 'A1', question: '', type: AttributeType.puntuable, weight: 1, mandatory: false }]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useValue: {
            // lecturas reactivas, como las del DataService real
            dimensions: () => [{ id: 'd1', name: 'D1', numOfCriteria: 1, weight: 1 }],
            attributes: () => new Map([['d1', attrs()]]),
            defaultAttribute: (id: string) => (id === 'a1' ? { weight: 1, mandatory: false } : undefined),
            defaultDimensionWeight: (id: string) => (id === 'd1' ? 1 : undefined),
            updateAttributes: (u: Attribute[]) => attrs.update((list) => list.map((a) => u.find((x) => x.id === a.id) ?? a)),
          },
        },
        { provide: CostService, useValue: {} },
      ],
    });
  });

  it('cambiar un peso o el tratamiento de criterios sin puntuación no recrea el formulario; una importación sí', () => {
    const scoring = TestBed.inject(ScoringService);
    const form = computed(() => scoring.weightsForm(Domain.data));
    const first = form();

    first.controls.weights.controls['a1'].controls.weight.setValue(3);
    scoring.applyForm(Domain.data, first); // cambia los atributos (reactivos)
    first.controls.missing.setValue('mean');
    first.controls.missing.markAsDirty();
    scoring.applyForm(Domain.data, first); // cambia missingScore
    expect(attrs()[0].weight).toBe(3);
    expect(scoring.missingScore()).toBe('mean');
    expect(form()).toBe(first);

    scoring.formsEpoch.update((n) => n + 1);
    expect(form()).not.toBe(first);
    expect(form().controls.weights.controls['a1'].controls.weight.value).toBe(3); // con los valores actuales
  });

  it('«Restablecer» lleva los formularios a los valores de la rúbrica, no a los ya guardados', () => {
    const scoring = TestBed.inject(ScoringService);
    // el usuario guarda otros valores: el formulario que se abre después parte de ellos
    const saved = scoring.weightsForm(Domain.data);
    saved.controls.weights.controls['a1'].patchValue({ weight: 3, mandatory: true });
    saved.controls.missing.setValue('mean');
    saved.controls.missing.markAsDirty();
    scoring.applyForm(Domain.data, saved);
    expect(attrs()[0]).toMatchObject({ weight: 3, mandatory: true });

    const form = scoring.weightsForm(Domain.data);
    expect(form.controls.weights.controls['a1'].controls.weight.value).toBe(3);
    scoring.setWeightsFormDefaults(form);
    expect(form.getRawValue().weights['a1']).toEqual({ id: 'a1', weight: 1, mandatory: false });
    expect(form.controls.missing.value).toBe('exclude');
    scoring.applyForm(Domain.data, form); // al guardar se aplican
    expect(attrs()[0]).toMatchObject({ weight: 1, mandatory: false });
    expect(scoring.missingScore()).toBeUndefined();

    const dims = scoring.dimensionWeightsForm(Domain.data);
    dims.controls['d1'].setValue(2);
    scoring.setDimensionWeightsFormDefaults(dims);
    expect(dims.controls['d1'].value).toBe(1);
  });
});
