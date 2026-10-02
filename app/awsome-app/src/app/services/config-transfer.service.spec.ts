import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Attribute, AttributeType, Dimension } from '../model/rubrica-model';
import { CatalogProfilesService } from './catalog-profiles.service';
import { ConfigTransferService } from './config-transfer.service';
import { CostService } from './cost.service';
import { DataService } from './data.service';
import { ScoringService } from './scoring.service';
import { SummaryService } from './summary.service';

describe('ConfigTransferService', () => {
  let attrs: Attribute[];
  let dims: Dimension[];
  const setMissingScore = vi.fn();
  const setRequiredDeployments = vi.fn();
  const scenario = signal<'S' | 'M' | 'L'>('M');
  const formsEpoch = signal(0);

  beforeEach(() => {
    attrs = [{ id: 'a1', name: 'A1', question: '', type: AttributeType.puntuable, weight: 2, mandatory: false }];
    dims = [{ id: 'd1', name: 'D1', numOfCriteria: 1, weight: 5 }];
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useValue: {
            dimensions: (area: string) => (area === 'datos' ? dims : []),
            attributes: () => new Map([['d1', attrs]]),
            attribute: (id: string) => attrs.find((a) => a.id === id),
            dimension: (id: string) => dims.find((d) => d.id === id),
            updateAttributes: (u: Attribute[]) => (attrs = attrs.map((a) => u.find((x) => x.id === a.id) ?? a)),
            updateDimensions: (_: string, u: Dimension[]) => (dims = dims.map((d) => u.find((x) => x.id === d.id) ?? d)),
          },
        },
        { provide: ScoringService, useValue: { missingScore: () => undefined, requiredDeployments: () => ['saas'], setMissingScore, setRequiredDeployments, formsEpoch } },
        { provide: CostService, useValue: { scenario } },
      ],
    });
  });

  it('ida y vuelta en JSON y en CSV', () => {
    const svc = TestBed.inject(ConfigTransferService);
    const snap = svc.snapshot();
    expect(snap.attributes['a1']).toEqual({ weight: 2, mandatory: false });
    expect(snap.settings.requiredDeployments).toEqual(['saas']);
    expect(svc.parse(svc.toJson(snap), 'json')).toEqual(snap);
    expect(svc.parse(svc.toCsv(snap), 'csv')).toEqual({ ...snap, summary: undefined }); // el CSV no lleva el resumen
  });

  it('el resumen viaja en el JSON, descarta pesos de dimensiones desconocidas y no se toca sin él', () => {
    const svc = TestBed.inject(ConfigTransferService);
    const summary = TestBed.inject(SummaryService);
    summary.add('datos');
    const id = summary.profiles().datos[0].id;
    summary.update('datos', id, { name: 'Mío', dimensionWeights: { d1: 10, viejo: 3 }, requiredDeployments: ['docker'] });
    summary.topN.set(7);
    const json = svc.toJson();
    summary.remove('datos', id);
    summary.topN.set(4);

    expect(svc.apply(svc.parse(json, 'json'))).toBe(1); // «viejo» descartado
    expect(summary.profiles().datos).toMatchObject([{ name: 'Mío', dimensionWeights: { d1: 10 }, requiredDeployments: ['docker'] }]);
    expect(summary.topN()).toBe(7);

    svc.apply(svc.parse(svc.toCsv(), 'csv')); // sin resumen: queda como estaba
    expect(summary.profiles().datos.length).toBe(1);
    expect(summary.topN()).toBe(7);
  });

  it('aplica los valores importados', () => {
    const svc = TestBed.inject(ConfigTransferService);
    const snap = svc.snapshot();
    snap.attributes['a1'] = { weight: 3, mandatory: true };
    snap.dimensions['d1'] = 9;
    snap.settings = { missing: 'mean', requiredDeployments: ['docker'], scenario: 'L' };
    svc.apply(svc.parse(svc.toCsv(snap), 'csv'));
    expect(attrs[0]).toMatchObject({ weight: 3, mandatory: true });
    expect(dims[0].weight).toBe(9);
    expect(setMissingScore).toHaveBeenCalledWith('mean');
    expect(setRequiredDeployments).toHaveBeenCalledWith(['docker']);
    expect(scenario()).toBe('L');
    expect(TestBed.inject(CatalogProfilesService).profiles('datos').length).toBeGreaterThan(0);
  });

  it('rechaza ids que no existen sin aplicar nada', () => {
    const svc = TestBed.inject(ConfigTransferService);
    const snap = svc.snapshot();
    snap.attributes['a1'] = { weight: 3, mandatory: false };
    snap.attributes['viejo'] = { weight: 1, mandatory: false };
    expect(() => svc.apply(snap)).toThrow(/viejo/);
    expect(attrs[0].weight).toBe(2); // nada aplicado
    expect(() => svc.parse('no es json', 'json')).toThrow(/JSON/);
    expect(() => svc.parse('a,b\n1,2', 'csv')).toThrow(/cabecera/);
  });

  it('un CSV con __proto__ no contamina Object.prototype y se rechaza como id desconocido', () => {
    const svc = TestBed.inject(ConfigTransferService);
    const csv = 'tipo,id,campo,valor\nattribute,__proto__,weight,7\nattribute,constructor,mandatory,true\ndimension,__proto__,weight,3\n';
    try {
      expect(() => svc.apply(svc.parse(csv, 'csv'))).toThrow(/__proto__/);
      expect(({} as any).weight).toBeUndefined();
      expect(({} as any).mandatory).toBeUndefined();
    } finally {
      delete (Object.prototype as any).weight; // no dejar la contaminación si el test falla
      delete (Object.prototype as any).mandatory;
    }
  });
});
