import { buildSummaryMarkdown, SummaryDocument } from './summary.service';

describe('buildSummaryMarkdown', () => {
  const doc: SummaryDocument = {
    date: '2026-10-02',
    scenario: 'M',
    missing: 'se excluyen',
    topN: 2,
    includeCategories: true,
    areas: [
      {
        label: 'Datos',
        candidates: 3, notes: 30, noData: 4, withoutCost: 1,
        profiles: [
          { name: 'Generalista', description: 'Pesos por defecto.', top: [{ name: 'A', score: 74.14 }, { name: 'B | C', score: 70 }] },
          { name: 'Vacío', description: 'Exige algo imposible.', top: [] },
        ],
        categories: [
          { category: 'cloud-dwh', count: 2, top: [{ name: 'A', score: 70.1 }, { name: 'B', score: 67.5 }] },
          { category: 'motor', count: 1, top: [{ name: 'C', score: 51.9 }] },
        ],
      },
    ],
  };

  it('genera las tablas con puntuaciones en formato español, escapa las barras y agrupa las categorías de un candidato', () => {
    const md = buildSummaryMarkdown(doc);
    expect(md).toContain('| Datos | 3 | 4 de 30 | 1 |');
    expect(md).toContain('| **Generalista** | Pesos por defecto. | A 74,1; B \\| C 70,0 |');
    expect(md).toContain('| **Vacío** | Exige algo imposible. | — |');
    expect(md).toContain('| `cloud-dwh` (2) | A 70,1; B 67,5 |');
    expect(md).toContain('| Categorías con un candidato | C (`motor`) 51,9 |');
  });

  it('sin categorías no incluye esa tabla', () => {
    expect(buildSummaryMarkdown({ ...doc, includeCategories: false })).not.toContain('Líder por categoría');
  });

  it('una categoría sin ninguna puntuación no rompe el documento', () => {
    const empty = { ...doc, areas: doc.areas.map((a) => ({ ...a, categories: [...a.categories, { category: 'vacia', count: 1, top: [] }] })) };
    expect(buildSummaryMarkdown(empty)).not.toContain('vacia');
  });
});
