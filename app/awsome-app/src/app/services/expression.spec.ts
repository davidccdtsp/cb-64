import { evaluate } from './expression';

describe('evaluate', () => {
  it('respeta la precedencia, los paréntesis y el signo', () => {
    expect(evaluate('1 + 2 * 3', {})).toBe(7);
    expect(evaluate('(1 + 2) * 3', {})).toBe(9);
    expect(evaluate('-2 * -(1 + 1)', {})).toBe(4);
    expect(evaluate('10 / 4', {})).toBe(2.5);
  });

  it('usa variables y funciones', () => {
    const v = { a: 5, b: 2 };
    expect(evaluate('max(0, a - 10) + min(a, b, 9) + ceil(0.2)', v)).toBe(3);
    expect(evaluate('tb_almacenados * 1000 * precio', { tb_almacenados: 2, precio: 0.02 })).toBeCloseTo(40);
  });

  it('rechaza lo que no es una fórmula válida', () => {
    for (const f of ['x + 1', 'foo(1)', '1 +', '(1', '1 2', '1 $ 2', 'eval(1)']) {
      expect(() => evaluate(f, {})).toThrow();
    }
  });
});
