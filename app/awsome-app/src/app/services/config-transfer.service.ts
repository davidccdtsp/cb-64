import { Injectable, inject } from '@angular/core';
import { Scenario } from '../model/candidatos-model';
import { CatalogProfilesService } from './catalog-profiles.service';
import { CostService } from './cost.service';
import { DataService } from './data.service';
import { ScoringService } from './scoring.service';
import { SummaryService } from './summary.service';
import { CatalogProfile, LicenseFamily } from '../model/catalog-model';
import { ConfigSnapshot } from '../model/config-model';
import { Area } from '../model/domain-model';
import { MissingChoice } from '../model/weights-model';
import { SummaryConfig, SummaryProfile } from '../model/summary-model';


const AREAS: Area[] = ['datos', 'martech'];
const SCENARIOS: Scenario[] = ['S', 'M', 'L'];
const MISSING: MissingChoice[] = ['exclude', 'zero', 'mean'];
const CSV_HEADER = 'tipo,id,campo,valor';

/** Exporta e importa la configuración en JSON o CSV. Importar valida todo antes de aplicar nada. */
@Injectable({ providedIn: 'root' })
export class ConfigTransferService {
  private readonly data = inject(DataService);
  private readonly scoring = inject(ScoringService);
  private readonly cost = inject(CostService);
  private readonly profiles = inject(CatalogProfilesService);
  private readonly summary = inject(SummaryService);

  snapshot(): ConfigSnapshot {
    const attributes: ConfigSnapshot['attributes'] = {};
    const dimensions: ConfigSnapshot['dimensions'] = {};
    for (const area of AREAS) {
      for (const d of this.data.dimensions(area)) {
        dimensions[d.id] = d.weight;
        for (const a of this.data.attributes().get(d.id) ?? []) attributes[a.id] = { weight: a.weight ?? 0, mandatory: a.mandatory };
      }
    }
    const missing = this.scoring.missingScore();
    return {
      version: 1,
      settings: {
        missing: missing === 'mean' ? 'mean' : missing === 0 ? 'zero' : 'exclude',
        requiredDeployments: [...this.scoring.requiredDeployments()],
        scenario: this.cost.scenario(),
      },
      attributes,
      dimensions,
      profiles: this.profiles.snapshot(),
      summary: this.summary.snapshot(),
    };
  }

  toJson(s: ConfigSnapshot = this.snapshot()): string {
    return JSON.stringify(s, null, 2);
  }

  toCsv(s: ConfigSnapshot = this.snapshot()): string {
    const rows: string[][] = [
      ['setting', 'missing', '', s.settings.missing],
      ['setting', 'requiredDeployments', '', s.settings.requiredDeployments.join('|')],
      ['setting', 'scenario', '', s.settings.scenario],
    ];
    for (const [id, a] of Object.entries(s.attributes)) {
      rows.push(['attribute', id, 'weight', String(a.weight)], ['attribute', id, 'mandatory', String(a.mandatory)]);
    }
    for (const [id, w] of Object.entries(s.dimensions)) rows.push(['dimension', id, 'weight', String(w)]);
    for (const area of AREAS) {
      for (const p of s.profiles[area]) {
        const f = p.filters;
        const id = `${area}/${p.id}`;
        rows.push(
          ['profile', id, 'name', p.name], ['profile', id, 'category', f.category], ['profile', id, 'type', f.type],
          ['profile', id, 'license', f.license], ['profile', id, 'deployment', f.deployment.join('|')],
        );
      }
    }
    return [CSV_HEADER, ...rows.map((r) => r.map(csvCell).join(','))].join('\n') + '\n';
  }

  /** @throws Error con un mensaje para el usuario si el texto no es una configuración válida. */
  parse(text: string, format: 'json' | 'csv'): ConfigSnapshot {
    return format === 'json' ? this.parseJson(text) : this.parseCsv(text);
  }

  /**
   * Valida la configuración contra los datos actuales y la aplica.
   * @returns cuántos pesos de perfiles del resumen se han descartado por referirse a dimensiones que ya no existen.
   * @throws Error, sin aplicar nada, si algún id no existe (configuración de otra versión de la rúbrica) o un valor no es válido.
   */
  apply(s: ConfigSnapshot): number {
    this.validate(s);
    const attributes = Object.entries(s.attributes).map(([id, v]) => ({ ...this.data.attribute(id)!, weight: v.weight, mandatory: v.mandatory }));
    this.data.updateAttributes(attributes);
    for (const area of AREAS) {
      const current = this.data.dimensions(area).filter((d) => d.id in s.dimensions);
      this.data.updateDimensions(area, current.map((d) => ({ ...d, weight: s.dimensions[d.id] })));
      this.profiles.load(area, s.profiles[area]);
    }
    this.scoring.setMissingScore(s.settings.missing === 'mean' ? 'mean' : s.settings.missing === 'zero' ? 0 : undefined);
    this.scoring.setRequiredDeployments(s.settings.requiredDeployments);
    this.cost.scenario.set(s.settings.scenario);
    this.scoring.formsEpoch.update((n) => n + 1);
    return s.summary ? this.summary.load(s.summary) : 0;
  }

  private validate(s: ConfigSnapshot): void {
    const unknown = [
      ...Object.keys(s.attributes).filter((id) => !this.data.attribute(id)),
      ...Object.keys(s.dimensions).filter((id) => !this.data.dimension(id)),
    ];
    if (unknown.length) {
      const shown = unknown.slice(0, 5).join(', ') + (unknown.length > 5 ? `… (${unknown.length} en total)` : '');
      throw new Error(`La configuración no coincide con los datos actuales; identificadores desconocidos: ${shown}. Parece de otra versión de la rúbrica.`);
    }
    for (const a of Object.values(s.attributes)) {
      if (!(Number.isFinite(a.weight) && a.weight >= 0) || typeof a.mandatory !== 'boolean') throw new Error('Peso u obligatoriedad de un criterio no válidos.');
    }
    for (const w of Object.values(s.dimensions)) if (!(Number.isFinite(w) && w >= 0)) throw new Error('Peso de una dimensión no válido.');
    if (!MISSING.includes(s.settings.missing)) throw new Error(`Tratamiento de criterios sin puntuación no válido: ${s.settings.missing}`);
    if (!SCENARIOS.includes(s.settings.scenario)) throw new Error(`Escenario de coste no válido: ${s.settings.scenario}`);
  }

  private parseJson(text: string): ConfigSnapshot {
    let o: unknown;
    try {
      o = JSON.parse(text);
    } catch {
      throw new Error('El fichero no es un JSON válido.');
    }
    const j = obj(o);
    if (j['version'] !== 1 || !j['settings'] || !j['attributes'] || !j['dimensions'] || !j['profiles']) {
      throw new Error('El JSON no es una configuración exportada por esta aplicación.');
    }
    return this.normalize(j);
  }

  private normalizeSummary(v: unknown): SummaryConfig | undefined {
    if (!v || typeof v !== 'object') return undefined;
    const o = obj(v);
    const profiles = (area: Area): SummaryProfile[] =>
      list(obj(o['profiles'])[area]).map((raw) => {
        const p = obj(raw);
        const weights = Object.entries(obj(p['dimensionWeights'])).filter(([, w]) => Number.isFinite(Number(w)) && Number(w) >= 0);
        return {
          id: String(p['id']), name: String(p['name'] ?? p['id']), description: String(p['description'] ?? ''),
          dimensionWeights: Object.fromEntries(weights.map(([id, w]) => [id, Number(w)])),
          requiredDeployments: list(p['requiredDeployments']).map(String),
        };
      });
    const topN = Math.floor(Number(o['topN']));
    return { topN: topN >= 1 && topN <= 20 ? topN : 4, includeCategories: o['includeCategories'] !== false, profiles: { datos: profiles('datos'), martech: profiles('martech') } };
  }

  private parseCsv(text: string): ConfigSnapshot {
    const rows = parseCsv(text);
    if (rows[0]?.join(',') !== CSV_HEADER) throw new Error(`El CSV debe empezar por la cabecera «${CSV_HEADER}».`);
    const s: ConfigSnapshot = {
      version: 1,
      settings: { missing: 'exclude', requiredDeployments: [], scenario: 'M' },
      // sin prototipo: un id como «__proto__» o «constructor» es una clave más y `validate` lo rechaza como desconocido
      attributes: Object.create(null),
      dimensions: Object.create(null),
      profiles: { datos: [], martech: [] },
    };
    for (const [kind, id, field, value] of rows.slice(1)) {
      if (kind === 'setting') {
        if (id === 'missing') s.settings.missing = value as MissingChoice;
        else if (id === 'scenario') s.settings.scenario = value as Scenario;
        else if (id === 'requiredDeployments') s.settings.requiredDeployments = split(value);
      } else if (kind === 'attribute') {
        const a = (s.attributes[id] ??= { weight: 0, mandatory: false });
        if (field === 'weight') a.weight = Number(value);
        else if (field === 'mandatory') a.mandatory = value === 'true';
      } else if (kind === 'dimension') {
        s.dimensions[id] = Number(value);
      } else if (kind === 'profile') {
        const [area, pid] = id.split('/') as [Area, string];
        if (!AREAS.includes(area)) throw new Error(`Área desconocida en el perfil «${id}».`);
        let p = s.profiles[area].find((x) => x.id === pid);
        if (!p) s.profiles[area].push((p = { id: pid, name: pid, filters: { category: '', type: '', license: '', deployment: [] } }));
        if (field === 'name') p.name = value;
        else if (field === 'deployment') p.filters.deployment = split(value);
        else if (field === 'category') p.filters.category = value;
        else if (field === 'type') p.filters.type = value;
        else if (field === 'license') p.filters.license = value as LicenseFamily | '';
      } else if (kind) {
        throw new Error(`Tipo de fila desconocido en el CSV: ${kind}`);
      }
    }
    return s;
  }

  /** Deja solo los campos esperados de un JSON importado. Los valores se validan después, en `validate`. */
  private normalize(o: Json): ConfigSnapshot {
    const settings = obj(o['settings']);
    const profiles = (area: Area): CatalogProfile[] =>
      list(obj(o['profiles'])[area]).map((raw) => {
        const p = obj(raw);
        const f = obj(p['filters']);
        return {
          id: String(p['id']), name: String(p['name'] ?? p['id']),
          filters: {
            category: String(f['category'] ?? ''), type: String(f['type'] ?? ''), license: String(f['license'] ?? '') as LicenseFamily | '',
            deployment: list(f['deployment']).map(String),
          },
        };
      });
    return {
      version: 1,
      settings: {
        missing: settings['missing'] as MissingChoice,
        requiredDeployments: list(settings['requiredDeployments']).map(String),
        scenario: settings['scenario'] as Scenario,
      },
      attributes: Object.fromEntries(Object.entries(obj(o['attributes'])).map(([id, a]) => [id, { weight: Number(obj(a)['weight']), mandatory: obj(a)['mandatory'] as boolean }])),
      dimensions: Object.fromEntries(Object.entries(obj(o['dimensions'])).map(([id, w]) => [id, Number(w)])),
      profiles: { datos: profiles('datos'), martech: profiles('martech') },
      summary: this.normalizeSummary(o['summary']),
    };
  }
}

type Json = Record<string, unknown>;
/** Un objeto (no nulo ni lista) o, si el valor es otra cosa, uno vacío: los JSON importados no son de fiar. */
const obj = (v: unknown): Json => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Json) : {});
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const split = (v: string): string[] => (v ? v.split('|') : []);
const csvCell = (v: string): string => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** CSV con comillas dobles; ignora las líneas vacías. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x)) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x)) rows.push(row);
  return rows;
}
