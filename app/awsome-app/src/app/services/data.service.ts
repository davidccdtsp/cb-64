import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, finalize, forkJoin, Observable, of, tap } from 'rxjs';
import { AnyScore, Candidate, CandidateCost, CostModel, Scenario, ScenarioParam } from '../model/candidatos-model';
import { Area, Domain, domainOf } from '../model/domain-model';
import { Attribute, AttributeType, Category, Dimension } from '../model/rubrica-model';

interface AtributoJson {
  id: string;
  nombre: string;
  pregunta: string;
  tipo: keyof typeof AttributeType;
  peso?: number;
  obligatorio: boolean;
  calculado?: boolean;
  escala?: { niveles: { valor: number; descripcion: string }[] };
}

interface PuntuacionJson {
  id: string;
  nota: number | null;
  valor: boolean | null;
  texto: string | null;
  confianza: string;
  fuentes: { id: string; url: string }[];
}

interface CandidatoJson {
  id: string;
  nombre: string;
  dominio: Area;
  categoria: string;
  tipo: string;
  licencia: string;
  despliegue: string[];
  fecha_revision: string;
  puntuaciones: PuntuacionJson[];
}

interface ModeloJson {
  moneda: string;
  parametros?: { id: string; nombre: string; unidad?: string; valor: CostModel['params'][number]['value']; fuente?: string }[];
  variantes: { nombre?: string; componentes: { nombre: string; formula: string }[] }[];
}

interface EscenariosJson {
  parametros: { id: string; nombre: string; unidad: string; valores: Partial<Record<Scenario, number>> }[];
}

interface CosteJson {
  candidato: string;
  fecha_revision: string;
  region_referencia: string;
  moneda: string;
  tablas: { titulo: string; filas: Record<string, string>[] }[];
  enlaces: { id: string; titulo: string; url: string; consultado: string }[];
  totales: Record<string, { min: number | null; max: number | null; moneda: string; origen: string }>;
  modelo?: ModeloJson;
}

interface RubricaJson {
  categorias: { id: string; descripcion: string }[];
  dimensiones: { id: string; nombre: string; criterios: number; peso: number; valores: AtributoJson[] }[];
}

/**
 * Criterio de coste de cada área. No está en la rúbrica (.md): su nota no se asigna a mano sino que la calcula la
 * app con los costes de las fichas de `costes/precios/` (ver ScoringService), así que lo aporta la propia app,
 * dentro de la dimensión de coste y con peso 3 por defecto (editable como cualquier otro).
 */
const COST_CRITERION: Record<Area, { dimension: string; attribute: Attribute }> = {
  datos: {
    dimension: 'DP-COS',
    attribute: {
      id: 'DP-COS-01',
      name: 'Coste normalizado por escenario',
      question: '¿Cuál es el coste mensual estimado del candidato en el escenario elegido (S/M/L), en relación con el candidato más barato comparado?',
      type: AttributeType.puntuable,
      weight: 3,
      mandatory: false,
      calculated: true,
    },
  },
  martech: {
    dimension: 'MK-COS',
    attribute: {
      id: 'MK-COS-01',
      name: 'Coste por escenario',
      question: '¿Cuál es el coste mensual estimado del candidato en el escenario elegido (S/M/L), en relación con el candidato más barato comparado?',
      type: AttributeType.puntuable,
      weight: 3,
      mandatory: false,
      calculated: true,
    },
  },
};

interface DataState {
  data: Record<Area, { categories: Category[]; dimensions: Dimension[] }>;
  scenarioParams: Record<Area, ScenarioParam[]>;
  costs: Map<string, CandidateCost>;
  candidates: Candidate[];
  attributesById: Map<string, Attribute>;
  attributesByDimension: Map<string, Attribute[]>;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);
  /** Todo lo cargado y editable en una sola señal: las lecturas son reactivas y cada cambio crea un estado nuevo. */
  private readonly state = signal<DataState>({
    data: { datos: { categories: [], dimensions: [] }, martech: { categories: [], dimensions: [] } },
    scenarioParams: { datos: [], martech: [] },
    costs: new Map(),
    candidates: [],
    attributesById: new Map(),
    attributesByDimension: new Map(),
  });
  /** Peso y obligatoriedad de cada criterio tal como vienen de la rúbrica, para poder restablecerlos. */
  private readonly defaultAttributes = new Map<string, { weight?: number; mandatory: boolean }>();
  /** Peso de cada dimensión tal como viene de la rúbrica. */
  private readonly defaultDimensions = new Map<string, number>();

  /** true cuando la carga inicial ha terminado (con éxito o con error). */
  readonly loaded = signal(false);

  constructor() {
    this.load().subscribe();
  }

  private load(): Observable<unknown> {
    // cada fichero tiene su valor vacío por defecto: si uno falla, la app carga el resto y avisa de cuál
    const failed: string[] = [];
    const file = <T>(url: string, fallback: T): Observable<T> =>
      this.http.get<T>(url).pipe(
        catchError((e) => {
          console.error(`No se pudo cargar ${url}`, e);
          failed.push(url);
          return of(fallback);
        }),
      );
    const noRubrica = { categorias: [], dimensiones: [] };
    return forkJoin([
      file<Record<Area, RubricaJson>>('rubrica.json', { datos: noRubrica, martech: noRubrica }),
      file<Record<Area, CandidatoJson[]>>('candidatos.json', { datos: [], martech: [] }),
      file<CosteJson[]>('costes_datos.json', []),
      file<CosteJson[]>('costes_martech.json', []),
      file<Record<Area, EscenariosJson>>('escenarios.json', { datos: { parametros: [] }, martech: { parametros: [] } }),
    ]).pipe(
      tap(([rubrica, candidatos, costesDatos, costesMartech, escenarios]) => {
        const scenarioParams = {} as Record<Area, ScenarioParam[]>;
        for (const area of ['datos', 'martech'] as const) {
          scenarioParams[area] = (escenarios[area]?.parametros ?? []).map((p) => ({
            id: p.id,
            name: p.nombre,
            unit: p.unidad,
            values: p.valores,
          }));
        }
        const costs = new Map<string, CandidateCost>();
        for (const c of [...(costesDatos ?? []), ...(costesMartech ?? [])]) {
          costs.set(c.candidato, {
            candidateId: c.candidato,
            reviewDate: this.validDate(c.fecha_revision),
            referenceRegion: c.region_referencia,
            currency: c.moneda,
            tables: (c.tablas ?? []).map((t) => ({ title: t.titulo, rows: t.filas })),
            links: (c.enlaces ?? []).map((l) => ({ id: l.id, title: l.titulo, url: l.url, consulted: l.consultado })),
            totals: Object.fromEntries(
              Object.entries(c.totales ?? {})
                .filter(([, t]) => t.min !== null && t.max !== null)
                .map(([scenario, t]) => [scenario, { min: t.min!, max: t.max!, currency: t.moneda, source: t.origen }]),
            ),
            model: c.modelo && {
              currency: c.modelo.moneda,
              params: (c.modelo.parametros ?? []).map((p) => ({
                id: p.id,
                name: p.nombre,
                unit: p.unidad,
                value: p.valor,
                source: p.fuente,
              })),
              variants: (c.modelo.variantes ?? []).map((v) => ({
                name: v.nombre,
                components: (v.componentes ?? []).map((k) => ({ name: k.nombre, formula: k.formula })),
              })),
            },
          });
        }
        const attributesById = new Map<string, Attribute>();
        const attributesByDimension = new Map<string, Attribute[]>();
        const data = {
          datos: this.map('datos', rubrica.datos ?? noRubrica, attributesById, attributesByDimension),
          martech: this.map('martech', rubrica.martech ?? noRubrica, attributesById, attributesByDimension),
        };
        const candidates = [...(candidatos.datos ?? []), ...(candidatos.martech ?? [])].map((c) => this.mapCandidate(c));
        this.state.set({ data, scenarioParams, costs, candidates, attributesById, attributesByDimension });
        if (failed.length) this.handleError(`No se pudieron cargar: ${failed.join(', ')}. La aplicación muestra el resto de los datos.`, failed);
      }),
      // el error se notifica y se completa vacío para que la app arranque igualmente
      catchError((e) => {
        this.handleError('No se pudieron cargar los datos', e);
        return EMPTY;
      }),
      finalize(() => this.loaded.set(true)),
    );
  }

  private mapCandidate(c: CandidatoJson): Candidate {
    return {
      id: c.id,
      name: c.nombre,
      domain: domainOf(c.dominio),
      category: c.categoria,
      type: c.tipo,
      license: c.licencia,
      deployment: Array.isArray(c.despliegue) ? c.despliegue : [],
      lastRevisionDate: this.validDate(c.fecha_revision),
      // una puntuación sin nota, valor ni texto es nula: no se incluye
      scores: (c.puntuaciones ?? []).flatMap((p): AnyScore[] => {
        const base = { id: p.id, reliability: p.confianza, urls: (p.fuentes ?? []).map((f) => f.url) };
        if (p.nota !== null) return [{ ...base, score: p.nota }];
        if (p.valor !== null) return [{ ...base, value: p.valor }];
        if (p.texto !== null) return [{ ...base, text: p.texto }];
        return [];
      }),
    };
  }

  private map(area: Area, r: RubricaJson, attributesById: Map<string, Attribute>, attributesByDimension: Map<string, Attribute[]>) {
    const cost = COST_CRITERION[area];
    for (const d of r.dimensiones ?? []) {
      const attributes = (d.valores ?? []).map((a): Attribute => ({
          id: a.id,
          name: a.nombre,
          question: a.pregunta,
          type: AttributeType[a.tipo],
          weight: a.peso ?? undefined,
          mandatory: a.obligatorio ?? false,
          calculated: a.calculado,
          // solo los puntuables tienen escala
          values: a.escala?.niveles.map((n) => ({ value: n.valor, description: n.descripcion })),
        }));
      if (d.id === cost.dimension && !attributes.some((a) => a.id === cost.attribute.id)) attributes.unshift({ ...cost.attribute });
      attributesByDimension.set(d.id, attributes);
      attributes.forEach((a) => {
        attributesById.set(a.id, a);
        this.defaultAttributes.set(a.id, { weight: a.weight, mandatory: a.mandatory });
      });
    }
    (r.dimensiones ?? []).forEach((d) => this.defaultDimensions.set(d.id, d.peso));
    return {
      categories: (r.categorias ?? []).map(({ id, descripcion }) => ({ id, description: descripcion })),
      dimensions: (r.dimensiones ?? []).map((d) => ({
        id: d.id,
        name: d.nombre,
        numOfCriteria: d.criterios + (d.id === cost.dimension && !(d.valores ?? []).some((a) => a.id === cost.attribute.id) ? 1 : 0),
        weight: d.peso,
      })),
    };
  }

  /** Fecha del JSON o, si no es válida, la época: un Date inválido haría fallar el pipe `date` al pintar la tabla. */
  private validDate(iso: string): Date {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? new Date(0) : d;
  }

  private handleError(message: string, error: unknown): void {
    console.error(message, error);
    this.snackBar.open(message, 'Cerrar', { duration: 8000 });
  }

  categories(area: Area): Category[] {
    return this.state().data[area].categories;
  }

  /** Una dimensión por su id (únicos entre áreas: DP-*, MK-*). */
  dimension(id: string): Dimension | undefined {
    const { data } = this.state();
    return [...data.datos.dimensions, ...data.martech.dimensions].find((d) => d.id === id);
  }

  dimensions(area: Area): Dimension[] {
    return this.state().data[area].dimensions;
  }

  /** Parámetros numéricos de los escenarios S/M/L (docs/costes/escenarios*.md). */
  scenarioParams(area: Area): ScenarioParam[] {
    return this.state().scenarioParams[area];
  }

  candidate(id: string): Candidate | undefined {
    return this.state().candidates.find((c) => c.id === id);
  }

  costs(candidateId: string): CandidateCost | undefined {
    return this.state().costs.get(candidateId);
  }

  /** Sustituye las dimensiones (por id) del área en el catálogo; sirve para editar sus pesos. */
  updateDimensions(area: Area, updated: Dimension[]): void {
    const byId = new Map(updated.map((d) => [d.id, d]));
    this.state.update((s) => ({
      ...s,
      data: { ...s.data, [area]: { ...s.data[area], dimensions: s.data[area].dimensions.map((d) => byId.get(d.id) ?? d) } },
    }));
  }

  /** Sustituye los atributos (por id) en el catálogo. */
  updateAttributes(updated: Attribute[]): void {
    const byId = new Map(updated.map((a) => [a.id, a]));
    this.state.update((s) => ({
      ...s,
      attributesById: new Map([...s.attributesById].map(([id, a]) => [id, byId.get(id) ?? a])),
      attributesByDimension: new Map([...s.attributesByDimension].map(([dimension, list]) => [dimension, list.map((a) => byId.get(a.id) ?? a)])),
    }));
  }

  /** Peso y obligatoriedad de un criterio en la rúbrica (sin los cambios del usuario). */
  defaultAttribute(id: string): { weight: number; mandatory: boolean } | undefined {
    const d = this.defaultAttributes.get(id);
    return d && { weight: d.weight ?? 0, mandatory: d.mandatory };
  }

  /** Peso de una dimensión en la rúbrica (sin los cambios del usuario). */
  defaultDimensionWeight(id: string): number | undefined {
    return this.defaultDimensions.get(id);
  }

  /** Devuelve los pesos y la obligatoriedad de los criterios del área a los valores de la rúbrica. */
  resetAttributes(area: Area): void {
    const { data, attributesByDimension } = this.state();
    const ids = new Set(data[area].dimensions.map((d) => d.id));
    const restored = [...attributesByDimension]
      .filter(([dimensionId]) => ids.has(dimensionId))
      .flatMap(([, list]) => list)
      .map((a) => ({ ...a, ...this.defaultAttributes.get(a.id) }));
    this.updateAttributes(restored);
  }

  attribute(id: string): Attribute | undefined {
    return this.state().attributesById.get(id);
  }

  /** Atributos clasificados por id de dimensión. */
  attributes(): ReadonlyMap<string, Attribute[]> {
    return this.state().attributesByDimension;
  }

  /** Candidatos filtrados por dominio y/o categoría; sin filtros devuelve todos. */
  candidates(filter: { domain?: Domain; category?: string } = {}): Candidate[] {
    return this.state().candidates.filter(
      (c) =>
        (filter.domain === undefined || c.domain === filter.domain) &&
        (filter.category === undefined || c.category === filter.category),
    );
  }
}
