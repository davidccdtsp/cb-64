import { BANDS, band, costLabel, matrixColor, scoreLabel } from './heatmap.service';

describe('mapa de calor', () => {
  const xs = Array.from({ length: 100 }, (_, i) => i + 1); // 1..100

  it('la franja es el quintil del percentil y no depende de los valores filtrados', () => {
    expect(band(xs, 1)).toBe(0);
    expect(band(xs, 50)).toBe(2);
    expect(band(xs, 100)).toBe(BANDS - 1);
    expect(band([], 5)).toBeUndefined();
  });

  it('el coste invierte el sentido: lo más barato cae en la mejor franja', () => {
    expect(band(xs, 1, true)).toBe(BANDS - 1);
    expect(band(xs, 100, true)).toBe(0);
  });

  it('los empates cuentan por la mitad', () => {
    expect(band([5, 5, 5, 5], 5)).toBe(2);
  });

  it('un color por coordenada, del verde (peor) al rojo (mejor); la diagonal comparte color', () => {
    expect(matrixColor(0, 0)).toContain('hsl(120');
    expect(matrixColor(BANDS - 1, BANDS - 1)).toContain('hsl(0');
    expect(matrixColor(0, BANDS - 1)).toBe(matrixColor(BANDS - 1, 0)); // nota baja y barato = nota alta y caro
  });

  it('etiquetas de percentil: la nota sube con la franja y el coste P0-20 es la franja mejor', () => {
    expect(scoreLabel(0)).toBe('P0–20');
    expect(scoreLabel(4)).toBe('P80–100');
    expect(costLabel(4)).toBe('P0–20');
    expect(costLabel(0)).toBe('P80–100');
  });
});
