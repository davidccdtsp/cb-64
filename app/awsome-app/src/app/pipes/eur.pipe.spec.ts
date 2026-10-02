import { TestBed } from '@angular/core/testing';
import { CostService } from '../services/cost.service';
import { DataService } from '../services/data.service';
import { EurPipe } from './eur.pipe';

describe('EurPipe', () => {
  function setup() {
    TestBed.configureTestingModule({ providers: [{ provide: DataService, useValue: {} }] });
    return { pipe: TestBed.runInInjectionContext(() => new EurPipe()), cost: TestBed.inject(CostService) };
  }
  // el espacio y los separadores dependen del idioma: se compara por dígitos y símbolo
  const digits = (s: string) => s.replace(/\D/g, '');

  it('convierte USD a EUR con el tipo de cambio y no toca los EUR', () => {
    const { pipe, cost } = setup();
    cost.setUsdPerEur(2);
    expect(digits(pipe.transform(1000))).toBe('500'); // USD por defecto
    expect(digits(pipe.transform(1000, 'USD'))).toBe('500');
    expect(digits(pipe.transform(1000, 'EUR'))).toBe('1000');
    expect(pipe.transform(1000)).toContain('€');
  });

  it('se actualiza al cambiar el tipo de cambio y muestra — si no hay importe', () => {
    const { pipe, cost } = setup();
    expect(digits(pipe.transform(1100))).toBe('1000'); // 1,10 por defecto
    cost.setUsdPerEur(1);
    expect(digits(pipe.transform(1100))).toBe('1100');
    expect(pipe.transform(undefined)).toBe('—');
    expect(pipe.transform(null)).toBe('—');
  });
});
