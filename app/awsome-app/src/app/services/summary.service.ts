import { Injectable, inject, signal } from '@angular/core';
import { Candidate } from '../model/candidatos-model';
import { Area, domainOf } from '../model/domain-model';
import { SummaryConfig, SummaryProfile } from '../model/summary-model';
import { CostService } from './cost.service';
import { DataService } from './data.service';
import { ScoringService } from './scoring.service';



export interface RankedName {
  name: string;
  score: number;
}

export interface SummaryProfileResult {
  name: string;
  description: string;
  top: RankedName[];
}

export interface SummaryCategoryResult {
  category: string;
  count: number;
  top: RankedName[];
}

export interface SummaryAreaResult {
  label: string;
  candidates: number;
  notes: number;
  noData: number;
  withoutCost: number;
  profiles: SummaryProfileResult[];
  categories: SummaryCategoryResult[];
}

export interface SummaryDocument {
  date: string;
  scenario: string;
  missing: string;
  topN: number;
  includeCategories: boolean;
  areas: SummaryAreaResult[];
}

const AREA_LABEL: Record<Area, string> = { datos: 'Datos (plataformas analíticas)', martech: 'MarTech' };

const SCORE = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const cell = (text: string) => text.replace(/\|/g, '\\|');
const names = (top: RankedName[]) => top.map((r) => `${r.name} ${SCORE.format(r.score)}`).join('; ');

/** Documento Markdown del resumen (puro: sin Angular, para poder probarlo). */
export function buildSummaryMarkdown(doc: SummaryDocument): string {
  const out: string[] = [
    '# Resumen de resultados',
    '',
    `Generado el ${doc.date} desde la aplicación. Escenario de coste **${doc.scenario}**; criterios sin puntuación: ${doc.missing}. ` +
      'Se usan los pesos y la obligatoriedad de los criterios que tenía la aplicación al exportar; cada perfil sustituye los pesos de las dimensiones que indica ' +
      `y se muestran los ${doc.topN} mejores candidatos. **Diferencias de pocos puntos no son concluyentes.**`,
    '',
    '## Datos de partida',
    '',
    '| Área | Candidatos | Notas `N/D` | Candidatos sin cifra de coste |',
    '|---|---|---|---|',
    ...doc.areas.map((a) => `| ${a.label} | ${a.candidates} | ${a.noData} de ${a.notes} | ${a.withoutCost} |`),
  ];
  for (const a of doc.areas) {
    out.push('', `## ${a.label}`, '', '### Perfiles de necesidad', '', '| Perfil | Qué prioriza | Mejores candidatos (puntuación) |', '|---|---|---|');
    for (const p of a.profiles) out.push(`| **${cell(p.name)}** | ${cell(p.description)} | ${p.top.length ? cell(names(p.top)) : '—'} |`);
    if (!doc.includeCategories) continue;
    out.push('', '### Líder por categoría', '', 'Puntuación comparando solo dentro de la categoría. Entre paréntesis, número de candidatos de la categoría. Con un solo candidato no hay comparación.', '', '| Categoría | Primeros candidatos |', '|---|---|');
    const multi = a.categories.filter((c) => c.top.length && c.count > 1);
    const single = a.categories.filter((c) => c.top.length && c.count === 1);
    for (const c of multi) out.push(`| \`${c.category}\` (${c.count}) | ${cell(names(c.top))} |`);
    if (single.length) out.push(`| Categorías con un candidato | ${single.map((c) => `${cell(c.top[0].name)} (\`${c.category}\`) ${SCORE.format(c.top[0].score)}`).join('; ')} |`);
  }
  return out.join('\n') + '\n';
}

/**
 * Resumen de resultados: perfiles de necesidad que crea el usuario (no hay predefinidos) y generación de un documento Markdown con los
 * mejores candidatos de cada perfil y de cada categoría. Los perfiles viven en memoria (como el resto de cambios).
 */
@Injectable({ providedIn: 'root' })
export class SummaryService {
  private readonly data = inject(DataService);
  private readonly scoring = inject(ScoringService);
  private readonly cost = inject(CostService);

  readonly profiles = signal<Record<Area, SummaryProfile[]>>({ datos: [], martech: [] });
  /** Cuántos candidatos se muestran por perfil y por categoría. */
  readonly topN = signal(4);
  readonly includeCategories = signal(true);

  private next = 1;

  snapshot(): SummaryConfig {
    return { topN: this.topN(), includeCategories: this.includeCategories(), profiles: this.profiles() };
  }

  /**
   * Sustituye los perfiles y parámetros. Los pesos de dimensiones que ya no existen en las rúbricas se descartan.
   * @returns cuántos pesos se han descartado.
   */
  load(config: SummaryConfig): number {
    let discarded = 0;
    const profiles = {} as Record<Area, SummaryProfile[]>;
    for (const area of ['datos', 'martech'] as const) {
      const known = new Set(this.data.dimensions(area).map((d) => d.id));
      profiles[area] = config.profiles[area].map((p) => {
        const entries = Object.entries(p.dimensionWeights);
        const kept = entries.filter(([id]) => known.has(id));
        discarded += entries.length - kept.length;
        return { ...p, dimensionWeights: Object.fromEntries(kept) };
      });
    }
    this.profiles.set(profiles);
    this.topN.set(config.topN);
    this.includeCategories.set(config.includeCategories);
    return discarded;
  }

  add(area: Area): void {
    const profile: SummaryProfile = { id: `perfil-${Date.now()}-${this.next++}`, name: 'Perfil nuevo', description: '', dimensionWeights: {}, requiredDeployments: [] };
    this.profiles.update((all) => ({ ...all, [area]: [...all[area], profile] }));
  }

  update(area: Area, id: string, patch: Partial<Omit<SummaryProfile, 'id'>>): void {
    this.profiles.update((all) => ({ ...all, [area]: all[area].map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  }

  /** Fija el peso de una dimensión en un perfil; `undefined` la devuelve al peso por defecto. */
  setDimensionWeight(area: Area, id: string, dimension: string, weight: number | undefined): void {
    const profile = this.profiles()[area].find((p) => p.id === id);
    if (!profile) return;
    const { [dimension]: _, ...rest } = profile.dimensionWeights;
    this.update(area, id, { dimensionWeights: weight === undefined ? rest : { ...rest, [dimension]: weight } });
  }

  remove(area: Area, id: string): void {
    this.profiles.update((all) => ({ ...all, [area]: all[area].filter((p) => p.id !== id) }));
  }

  /** Texto de «qué prioriza»: el escrito por el usuario o, si falta, el que sale de los pesos y los despliegues. */
  describe(area: Area, profile: SummaryProfile): string {
    if (profile.description.trim()) return profile.description.trim();
    const dims = new Map(this.data.dimensions(area).map((d) => [d.id, d.name]));
    const byWeight = new Map<number, string[]>();
    for (const [id, w] of Object.entries(profile.dimensionWeights)) byWeight.set(w, [...(byWeight.get(w) ?? []), `${dims.get(id) ?? id} (\`${id}\`)`]);
    const parts = [
      ...(profile.requiredDeployments.length ? [`Despliegue obligatorio ${profile.requiredDeployments.map((d) => `\`${d}\``).join(', ')}`] : []),
      ...[...byWeight].map(([w, list]) => `${list.join(', ')} con peso ${w}`),
    ];
    return parts.length ? parts.join('; ') + '.' : 'Pesos por defecto.';
  }

  /** Calcula el documento con las puntuaciones actuales de la aplicación. Lee señales: llamarlo dentro de un `computed`. */
  document(): SummaryDocument {
    const topN = Math.max(1, Math.floor(this.topN()));
    const top = (list: Candidate[]): RankedName[] =>
      list.filter((c) => c.totalScore !== undefined).slice(0, topN).map((c) => ({ name: c.name, score: c.totalScore! }));
    const missing = this.scoring.missingScore();
    return {
      date: new Date().toISOString().slice(0, 10),
      scenario: this.cost.scenario(),
      missing: missing === 'mean' ? 'se usa la media de los demás' : missing === undefined ? 'se excluyen' : `cuentan como ${missing}`,
      topN,
      includeCategories: this.includeCategories(),
      areas: (['datos', 'martech'] as const).map((area): SummaryAreaResult => {
        const domain = domainOf(area);
        const all = this.data.candidates({ domain });
        const scores = all.flatMap((c) => c.scores);
        const profiles = this.profiles()[area].map((p) => ({
          name: p.name,
          description: this.describe(area, p),
          top: top(this.scoring.ranking({ domain }, { dimensionWeights: p.dimensionWeights, requiredDeployments: p.requiredDeployments })),
        }));
        const categories = this.data.categories(area).flatMap((c) => {
          const ranked = this.scoring.ranking({ domain, category: c.id }, { requiredDeployments: [] });
          const best = top(ranked); // sin ninguna puntuación (todos excluidos o sin datos) la categoría no tiene líder
          return best.length ? [{ category: c.id, count: ranked.length, top: best }] : [];
        });
        return {
          label: AREA_LABEL[area],
          candidates: all.length,
          notes: scores.length,
          noData: scores.filter((s) => 'text' in s && s.text.startsWith('N/D')).length,
          withoutCost: all.filter((c) => !this.cost.monthly(c.id)).length,
          profiles,
          categories,
        };
      }),
    };
  }

  markdown(): string {
    return buildSummaryMarkdown(this.document());
  }
}
