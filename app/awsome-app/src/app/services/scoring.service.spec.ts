import { TestBed } from '@angular/core/testing';
import { Candidate, TextScore } from '../model/candidatos-model';
import { Domain } from '../model/domain-model';
import { AttributeType } from '../model/rubrica-model';
import { DataService } from './data.service';
import { licenseFamily, ScoringService } from './scoring.service';

describe('licenseFamily', () => {
  it('clasifica el texto libre', () => {
    expect(licenseFamily('Apache-2.0')).toBe('Open source');
    expect(licenseFamily('PostgreSQL License (núcleo)')).toBe('Open source');
    expect(licenseFamily('Elastic-2.0 (source-available); enterprise propietario')).toBe('Source-available');
    expect(licenseFamily('propietaria')).toBe('Propietaria');
    expect(licenseFamily('LGPL-2.1')).toBe('Open source');
    expect(licenseFamily('BSL-1.1')).toBe('Source-available');
    expect(licenseFamily('Propietaria (no se permite admitir copias)')).toBe('Propietaria'); // «mit» dentro de otra palabra no cuenta
  });
});

const base = { reliability: 'alta', urls: [] };
const candidate = (id: string, scores: Candidate['scores']): Candidate => ({
  id, name: id, domain: Domain.data, category: 'x', type: '', license: '', deployment: [],
  lastRevisionDate: new Date(), scores,
});

/** Nota de un candidato dentro de su dominio (el ranking que ve la aplicación). */
const scoreOf = (svc: ScoringService, id: string) => svc.ranking({ domain: Domain.data }).find((c) => c.id === id)?.totalScore;

describe('ScoringService', () => {
  const updateAttributes = vi.fn();
  const resetAttributes = vi.fn();
  const updateDimensions = vi.fn();
  const costTable: Record<string, unknown> = {};
  const usd = (n: number) => ({ totals: { M: { min: n, max: n, currency: 'USD', source: '' } } });
  const candidates = [
    // (2×4 + 1×5 [booleano Sí]) / (5 × 3) × 100 = 86,67; el texto N/D y el informativo no cuentan
    candidate('a', [
      { id: 'p', score: 4, ...base },
      { id: 'b', value: true, ...base },
      { id: 'n', text: 'N/D', ...base },
      { id: 'i', score: 5, ...base },
    ]),
    // falta el criterio obligatorio 'b' (solo hay texto en 'p'): anula la nota
    candidate('falta', [{ id: 'p', text: 'N/D', ...base }]),
    // criterio obligatorio con valor No: tampoco se cumple
    candidate('no', [{ id: 'p', score: 4, ...base }, { id: 'b', value: false, ...base }]),
    candidate('vacio', [{ id: 'n', text: 'N/D', ...base }]),
    candidate('c2', [{ id: 'p', score: 4, ...base }, { id: 'b', value: true, ...base }]),
    // con nota en 'n': aportan a la media de ese criterio (3 y 5 → 4)
    candidate('m1', [{ id: 'p', score: 4, ...base }, { id: 'b', value: true, ...base }, { id: 'n', score: 3, ...base }]),
    candidate('m2', [{ id: 'p', score: 1, ...base }, { id: 'b', value: true, ...base }, { id: 'n', score: 5, ...base }]),
  ];
  // dimensiones del mock: por defecto una sola con todos los criterios y peso 1 (equivale a la fórmula plana)
  let dims = [{ id: 'd', weight: 1 }];
  let layout: Record<string, string[]> = { d: ['p', 'b', 'n', 'i', 'c'] };
  const attrs: Record<string, [AttributeType, number, boolean]> = {
    p: [AttributeType.puntuable, 2, false],
    b: [AttributeType.booleano, 1, true], // obligatorio; con peso cuenta como 0/5
    n: [AttributeType.puntuable, 2, false],
    i: [AttributeType.informativo, 3, true], // informativo: nunca bloquea
    c: [AttributeType.puntuable, 3, false], // calculado: nota de coste
  };

  afterEach(() => {
    dims = [{ id: 'd', weight: 1 }];
    layout = { d: ['p', 'b', 'n', 'i', 'c'] };
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useValue: {
            candidates: () => candidates,
            attribute: (id: string) =>
              attrs[id] && { id, type: attrs[id][0], weight: attrs[id][1], mandatory: attrs[id][2], calculated: id === 'c' },
            attributes: () =>
              new Map(
                Object.entries(layout).map(([dim, ids]) => [
                  dim,
                  ids.map((id) => ({ id, type: attrs[id][0], weight: attrs[id][1], mandatory: attrs[id][2], calculated: id === 'c' })),
                ]),
              ),
            dimensions: () => dims,
            updateDimensions,
            costs: (id: string) => costTable[id],
            updateAttributes: updateAttributes,
            resetAttributes,
          },
        },
      ],
    }),
  );

  it('aplica la fórmula y trata como nula la puntuación sin criterios', () => {
    const svc = TestBed.inject(ScoringService);
    expect(scoreOf(svc, 'a')).toBeCloseTo(86.67, 1);
    expect(scoreOf(svc, 'vacio')).toBeUndefined();
    expect(scoreOf(svc, 'falta')).toBeUndefined();
    expect(scoreOf(svc, 'no')).toBeUndefined();
    expect(svc.ranking()[0].id).toBe('a');
  });

  it('actualiza pesos y obligatoriedad de los atributos del dominio vía DataService', () => {
    TestBed.inject(ScoringService).updateAttributeWeight(Domain.data, [{ id: 'p', weight: 3, mandatory: true }]);
    expect(updateAttributes).toHaveBeenCalledWith([
      expect.objectContaining({ id: 'p', weight: 3, mandatory: true }),
    ]);
  });

  it('lista los criterios obligatorios (sin los informativos), el de coste y desmarca uno sin tocar su peso', () => {
    const svc = TestBed.inject(ScoringService);
    expect(svc.mandatoryAttributes(Domain.data).map((x) => x.id)).toEqual(['b']);
    expect(svc.costAttribute(Domain.data)?.id).toBe('c');
    updateAttributes.mockClear();
    svc.setMandatory(Domain.data, 'b', false);
    expect(updateAttributes).toHaveBeenCalledWith([expect.objectContaining({ id: 'b', weight: 1, mandatory: false })]);
  });

  it('restablecer pesos devuelve los criterios y el tratamiento de los sin puntuación a los valores de partida', () => {
    const svc = TestBed.inject(ScoringService);
    svc.setMissingScore(2);
    const epoch = svc.formsEpoch();
    svc.resetWeights(Domain.data);
    expect(resetAttributes).toHaveBeenCalledWith('datos');
    expect(svc.missingScore()).toBeUndefined();
    expect(svc.formsEpoch()).toBe(epoch + 1);
  });

  it('asigna missingScore a los criterios con peso sin valor, salvo N/A', () => {
    const svc = TestBed.inject(ScoringService);
    // 'a' tiene p=4 (peso 2) y b=Sí (peso 1); 'n' (peso 2, N/D) y el coste 'c' (peso 3, sin cifra) valen 2
    svc.setMissingScore(2);
    expect(scoreOf(svc, 'a')).toBeCloseTo((100 * (2 * 4 + 1 * 5 + 2 * 2 + 3 * 2)) / (5 * 8), 1);
    // un N/A no aplica y se queda fuera
    const n = candidates[0].scores.find((s) => s.id === 'n') as TextScore;
    n.text = 'N/A';
    try {
      expect(scoreOf(svc, 'a')).toBeCloseTo((100 * (2 * 4 + 1 * 5 + 3 * 2)) / (5 * 6), 1);
    } finally {
      n.text = 'N/D'; // los candidatos se comparten entre pruebas
    }
  });

  it("con 'mean' el criterio sin nota recibe la media de los demás; sin ninguna nota se excluye", () => {
    const svc = TestBed.inject(ScoringService);
    svc.setMissingScore('mean');
    // 'a': p=4 (2), b=Sí (1), n sin nota → media 4 (2); el coste 'c' no tiene media (nadie tiene coste) y se excluye
    expect(scoreOf(svc, 'a')).toBeCloseTo((100 * (2 * 4 + 1 * 5 + 2 * 4)) / (5 * 5), 1);
    // quienes ya tienen nota no cambian: m1 = (8 + 5 + 6) / 25
    expect(scoreOf(svc, 'm1')).toBeCloseTo((100 * (2 * 4 + 1 * 5 + 2 * 3)) / (5 * 5), 1);
  });

  it('applyForm aplica el tratamiento solo si el usuario lo ha tocado', () => {
    const svc = TestBed.inject(ScoringService);
    const form = svc.weightsForm(Domain.data);
    expect(form.controls.missing.value).toBe('exclude');
    svc.applyForm(Domain.data, form);
    expect(svc.missingScore()).toBeUndefined();

    form.controls.missing.setValue('mean');
    form.controls.missing.markAsDirty();
    svc.applyForm(Domain.data, form);
    expect(svc.missingScore()).toBe('mean');
    expect(svc.weightsForm(Domain.data).controls.missing.value).toBe('mean'); // el formulario nuevo parte del valor actual

    form.controls.missing.setValue('zero');
    svc.applyForm(Domain.data, form);
    expect(svc.missingScore()).toBe(0);
    form.controls.missing.setValue('exclude');
    svc.applyForm(Domain.data, form);
    expect(svc.missingScore()).toBeUndefined();
    expect(updateAttributes).toHaveBeenCalled(); // y los pesos siguen aplicándose
  });

  it('pondera las dimensiones por su peso y deja fuera las que no tienen criterios aplicables', () => {
    const svc = TestBed.inject(ScoringService);
    // d1 = {p, b} con peso 3; d2 = {n} con peso 1
    layout = { d1: ['p', 'b'], d2: ['n'] };
    dims = [{ id: 'd1', weight: 3 }, { id: 'd2', weight: 1 }];
    // m1: nota_d1 = 100 × (2×4 + 1×5) / 15 = 86,67; nota_d2 = 100 × (2×3) / 10 = 60 → (3 × 86,67 + 1 × 60) / 4 = 80
    // (la fórmula plana daría 76: aquí manda el peso de dimensión, no la suma de los pesos de sus criterios)
    expect(scoreOf(svc, 'm1')).toBeCloseTo(80, 1);
    // a: n es N/D, d2 no tiene criterios aplicables y no entra en el denominador → solo cuenta d1
    expect(scoreOf(svc, 'a')).toBeCloseTo(86.67, 1);
    // con peso 0, d2 tampoco cuenta
    dims = [{ id: 'd1', weight: 3 }, { id: 'd2', weight: 0 }];
    expect(scoreOf(svc, 'm1')).toBeCloseTo(86.67, 1);
    // si el peso de dimensión sube, la dimensión pesa más aunque tenga los mismos criterios
    dims = [{ id: 'd1', weight: 1 }, { id: 'd2', weight: 3 }];
    expect(scoreOf(svc, 'm1')).toBeCloseTo((86.67 + 3 * 60) / 4, 1);
  });

  it('el formulario de pesos de dimensión parte de los pesos actuales y los guarda vía DataService', () => {
    const svc = TestBed.inject(ScoringService);
    layout = { d1: ['p'], d2: ['n'] };
    dims = [{ id: 'd1', weight: 3 }, { id: 'd2', weight: 1 }];
    const form = svc.dimensionWeightsForm(Domain.data);
    expect(form.getRawValue()).toEqual({ d1: 3, d2: 1 });
    form.controls['d2'].setValue(5);
    svc.applyDimensionWeights(Domain.data, form);
    expect(updateDimensions).toHaveBeenCalledWith('datos', [
      { id: 'd1', weight: 3 },
      { id: 'd2', weight: 5 },
    ]);
    form.reset();
    expect(form.getRawValue()).toEqual({ d1: 3, d2: 1 });
  });

  it('valida el rango de missingScore', () => {
    const svc = TestBed.inject(ScoringService);
    svc.setMissingScore(0);
    svc.setMissingScore(5);
    svc.setMissingScore('mean');
    svc.setMissingScore(undefined);
    expect(svc.missingScore()).toBeUndefined();
    for (const bad of [-1, 5.1, NaN, Infinity, 'x' as unknown as number]) expect(() => svc.setMissingScore(bad)).toThrow(RangeError);
  });

  it('la nota de coste es relativa al coste mínimo del grupo (escenario M por defecto)', () => {
    costTable['a'] = usd(100);
    costTable['c2'] = usd(200);
    try {
      const svc = TestBed.inject(ScoringService);
      // a: coste mínimo → nota 5. (2×4 + 1×5 + 3×5) / (5 × 6) = 93,33
      expect(scoreOf(svc, 'a')).toBeCloseTo(93.33, 1);
      // c2: 5 × 100/200 = 2,5. (2×4 + 1×5 + 3×2,5) / 30 = 68,33
      expect(scoreOf(svc, 'c2')).toBeCloseTo(68.33, 1);
      // sin coste, el criterio de coste se excluye y el resto puntúa como siempre
      expect(scoreOf(svc, 'no')).toBeUndefined();
    } finally {
      delete costTable['a'];
      delete costTable['c2'];
    }
  });

  it('catalog: solo con nota, filtra por tipo/despliegue/licencia y recorta', () => {
    const svc = TestBed.inject(ScoringService);
    const all = svc.catalog({ domain: Domain.data }).map((c) => c.id);
    expect(all).not.toContain('falta'); // sin nota
    expect(svc.catalog({ domain: Domain.data, limit: 2 })).toHaveLength(2);
    expect(svc.catalog({ domain: Domain.data, type: 'cloud' })).toHaveLength(0); // los candidatos del mock tienen tipo ''
    expect(svc.catalog({ domain: Domain.data, deployment: ['saas'] })).toHaveLength(0);
    expect(svc.catalog({ domain: Domain.data, license: 'Propietaria' }).map((c) => c.id)).toEqual(all); // '' → propietaria
    expect(svc.catalog({ domain: Domain.data }).find((c) => c.id === 'a')?.dimensionScores).toEqual({ d: expect.closeTo(86.67, 1) });
    expect(svc.catalogOptions(Domain.data).licenses).toEqual(['Propietaria']);
  });

  it('ranking con opciones: pesos de dimensión y despliegues propios, sin tocar la configuración', () => {
    const svc = TestBed.inject(ScoringService);
    layout = { d1: ['p', 'b'], d2: ['n'] };
    dims = [{ id: 'd1', weight: 3 }, { id: 'd2', weight: 1 }];
    const by = (list: { id: string; totalScore?: number }[], id: string) => list.find((c) => c.id === id)!;
    // m1: nota_d1 = 86,67 y nota_d2 = 60; con d2 pesando 3 → (86,67 + 3 × 60) / 4
    expect(by(svc.ranking({}, { dimensionWeights: { d2: 3, d1: 1 } }), 'm1').totalScore).toBeCloseTo((86.67 + 3 * 60) / 4, 1);
    expect(scoreOf(svc, 'm1')).toBeCloseTo(80, 1); // la configuración no cambia
    // un despliegue obligatorio solo para este cálculo
    expect(by(svc.ranking({}, { requiredDeployments: ['self-hosted'] }), 'a').totalScore).toBeUndefined();
    expect(svc.requiredDeployments()).toEqual([]);
    expect(by(svc.ranking(), 'a').totalScore).toBeDefined();
  });

  it('requisitos eliminatorios: criterio obligatorio y despliegue, con el motivo', () => {
    const svc = TestBed.inject(ScoringService);
    const by = (id: string) => svc.ranking().find((c) => c.id === id)!;
    expect(by('falta').excludedBy).toHaveLength(1); // criterio obligatorio sin cumplir
    expect(by('falta').totalScore).toBeUndefined();
    expect(by('a').excludedBy).toBeUndefined();

    svc.setRequiredDeployments(['self-hosted']); // ningún candidato del mock lo ofrece
    expect(by('a').totalScore).toBeUndefined();
    expect(by('a').excludedBy).toEqual(['Despliegue (self-hosted)']);

    svc.setRequiredDeployments([]);
    expect(by('a').totalScore).toBeDefined();
  });
});
