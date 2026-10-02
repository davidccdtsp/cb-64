import { TestBed } from '@angular/core/testing';
import { CostService } from './cost.service';
import { DataService } from './data.service';

describe('CostService', () => {
  const costs: Record<string, unknown> = {
    eur: { totals: { M: { min: 100, max: 200, currency: 'EUR', source: '' } } },
    usd: { totals: { M: { min: 50, max: 50, currency: 'USD', source: '' } } },
  };

  function setup() {
    TestBed.configureTestingModule({ providers: [{ provide: DataService, useValue: { costs: (id: string) => costs[id] } }] });
    return TestBed.inject(CostService);
  }

  it('convierte EUR a USD con el tipo de cambio y usa el punto medio', () => {
    const svc = setup();
    svc.setUsdPerEur(2);
    expect(svc.monthly('eur', 'M')).toEqual({ min: 200, max: 400, mid: 300, manual: false, calculated: false });
    expect(svc.monthly('usd', 'M')?.mid).toBe(50);
    expect(svc.monthly('usd', 'S')).toBeUndefined(); // sin cifra para ese escenario
  });

  it('el coste manual manda sobre la ficha y se puede quitar', () => {
    const svc = setup();
    svc.setManual('usd', 'M', 10);
    expect(svc.monthly('usd', 'M')).toEqual({ min: 10, max: 10, mid: 10, manual: true, calculated: false });
    svc.setManual('nuevo', 'S', 5); // también sirve para candidatos sin ficha
    expect(svc.monthly('nuevo', 'S')?.mid).toBe(5);
    svc.setManual('usd', 'M', undefined);
    expect(svc.monthly('usd', 'M')?.mid).toBe(50);
  });

  it('valida los valores', () => {
    const svc = setup();
    for (const bad of [-1, NaN, Infinity]) expect(() => svc.setManual('usd', 'M', bad)).toThrow(RangeError);
    for (const bad of [0, -1, NaN]) expect(() => svc.setUsdPerEur(bad)).toThrow(RangeError);
  });
});
