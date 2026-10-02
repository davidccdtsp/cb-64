import { Scenario } from '../model/candidatos-model';
import { ConfigSnapshot } from '../model/config-model';
import { MissingChoice } from '../model/weights-model';

/** Parámetros de la URL: solo los que difieren de los valores por defecto. */
export type Params = Record<string, string>;

/** Valores de partida (los de la rúbrica) para saber qué ha modificado el usuario. */
export interface Defaults {
  attribute(id: string): { weight: number; mandatory: boolean } | undefined;
  dimension(id: string): number | undefined;
}

/**
 * Parámetros de configuración que viajan en la URL de todas las páginas:
 * `w` pesos de criterios cambiados (`DP-ARQ-01.3,...`), `ob` criterios que pasan a ser obligatorios, `on` obligatorios de la
 * rúbrica que dejan de serlo, `dw` pesos de dimensión cambiados, `sp` tratamiento de los criterios sin puntuación (`zero` o
 * `mean`), `dep` despliegues obligatorios y `esc` escenario de coste (`S` o `L`; el `M` es el de partida).
 */
export const GLOBAL_KEYS = ['w', 'ob', 'on', 'dw', 'sp', 'dep', 'esc'] as const;

const PAIR = /^([A-Za-z0-9-]+)\.(\d+(?:\.\d+)?)$/;

/** Parámetros de la URL que corresponden a la configuración, con solo lo que se ha cambiado. */
export function encodeGlobal(s: ConfigSnapshot, d: Defaults): Params {
  const w: string[] = [], ob: string[] = [], on: string[] = [], dw: string[] = [];
  for (const [id, a] of Object.entries(s.attributes)) {
    const def = d.attribute(id);
    if (!def) continue;
    if (a.weight !== def.weight) w.push(`${id}.${a.weight}`);
    if (a.mandatory && !def.mandatory) ob.push(id);
    if (!a.mandatory && def.mandatory) on.push(id);
  }
  for (const [id, weight] of Object.entries(s.dimensions)) if (weight !== d.dimension(id)) dw.push(`${id}.${weight}`);
  const out: Params = {};
  if (w.length) out['w'] = w.join(',');
  if (ob.length) out['ob'] = ob.join(',');
  if (on.length) out['on'] = on.join(',');
  if (dw.length) out['dw'] = dw.join(',');
  if (s.settings.missing !== 'exclude') out['sp'] = s.settings.missing;
  if (s.settings.requiredDeployments.length) out['dep'] = s.settings.requiredDeployments.join(',');
  if (s.settings.scenario !== 'M') out['esc'] = s.settings.scenario;
  return out;
}

/**
 * Aplica los parámetros de la URL sobre la configuración de partida `base` y devuelve la resultante, o `null` si algún
 * valor no es válido: formato roto, criterio o dimensión que no existe, despliegue desconocido... No se aplica nada a medias.
 */
export function decodeGlobal(get: (key: string) => string | null, base: ConfigSnapshot, knownDeployments: string[]): ConfigSnapshot | null {
  const s: ConfigSnapshot = {
    ...base,
    settings: { ...base.settings, requiredDeployments: [...base.settings.requiredDeployments] },
    attributes: Object.fromEntries(Object.entries(base.attributes).map(([id, a]) => [id, { ...a }])),
    dimensions: { ...base.dimensions },
  };
  const list = (key: string): string[] | null => {
    const raw = get(key);
    return raw === null ? [] : raw.split(',').filter((x) => x !== '').length ? raw.split(',') : null;
  };
  const pairs = (key: string, target: Record<string, unknown>, set: (id: string, value: number) => void): boolean => {
    const items = list(key);
    if (!items) return false;
    for (const item of items) {
      const m = PAIR.exec(item);
      if (!m || !(m[1] in target)) return false;
      set(m[1], Number(m[2]));
    }
    return true;
  };
  if (!pairs('w', s.attributes, (id, v) => (s.attributes[id].weight = v))) return null;
  if (!pairs('dw', s.dimensions, (id, v) => (s.dimensions[id] = v))) return null;
  for (const [key, mandatory] of [['ob', true], ['on', false]] as const) {
    const ids = list(key);
    if (!ids) return null;
    for (const id of ids) {
      if (!(id in s.attributes)) return null;
      s.attributes[id].mandatory = mandatory;
    }
  }
  const sp = get('sp');
  if (sp !== null) {
    if (sp !== 'zero' && sp !== 'mean') return null;
    s.settings.missing = sp as MissingChoice;
  }
  const dep = list('dep');
  if (!dep || dep.some((d) => !knownDeployments.includes(d))) return null;
  if (dep.length) s.settings.requiredDeployments = dep;
  const esc = get('esc');
  if (esc !== null) {
    if (esc !== 'S' && esc !== 'M' && esc !== 'L') return null;
    s.settings.scenario = esc as Scenario;
  }
  return s;
}
