import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './data.service';

/** Si un JSON falta o viene degradado, la app carga lo demás en vez de quedarse vacía o romperse. */
describe('DataService con JSON degradados', () => {
  const rubrica = {
    datos: { categorias: [{ id: 'c', descripcion: 'C' }], dimensiones: [{ id: 'D', nombre: 'Dim', criterios: 1, peso: 5, valores: [{ id: 'D-01', nombre: 'A', pregunta: '', tipo: 'booleano', peso: null, obligatorio: null }] }] },
  };
  const setup = () => {
    const open = vi.fn();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), { provide: MatSnackBar, useValue: { open } }] });
    const data = TestBed.inject(DataService);
    return { data, http: TestBed.inject(HttpTestingController), open };
  };

  it('un fichero que falla no impide cargar el resto y se avisa de cuál', () => {
    const { data, http, open } = setup();
    http.expectOne('rubrica.json').flush(rubrica);
    http.expectOne('candidatos.json').flush({ datos: [], martech: [] });
    http.expectOne('costes_datos.json').flush('x', { status: 500, statusText: 'Error' });
    http.expectOne('costes_martech.json').flush([]);
    http.expectOne('escenarios.json').flush({ datos: { parametros: [] }, martech: { parametros: [] } });
    expect(data.loaded()).toBe(true);
    expect(data.categories('datos')).toHaveLength(1);
    expect(open.mock.calls[0][0]).toContain('costes_datos.json');
  });

  it('campos que faltan, fechas inválidas y nulos no rompen la carga', () => {
    const { data, http } = setup();
    http.expectOne('rubrica.json').flush(rubrica); // falta martech; peso y obligatorio null
    http.expectOne('candidatos.json').flush({
      datos: [{ id: 'a', nombre: 'A', dominio: 'datos', categoria: 'c', tipo: 'oss', licencia: 'MIT', fecha_revision: 'no-es-fecha' }], // sin despliegue ni puntuaciones; falta martech
    });
    http.expectOne('costes_datos.json').flush([{ candidato: 'a', fecha_revision: '', region_referencia: '', moneda: 'USD' }]); // sin tablas, totales ni enlaces
    http.expectOne('costes_martech.json').flush([]);
    http.expectOne('escenarios.json').flush({ datos: { parametros: [] } }); // falta martech
    const c = data.candidate('a')!;
    expect(c.deployment).toEqual([]);
    expect(Number.isNaN(c.lastRevisionDater.getTime())).toBe(false);
    expect(data.attribute('D-01')).toMatchObject({ mandatory: false, weight: undefined });
    expect(data.costs('a')?.tables).toEqual([]);
    expect(data.dimensions('martech')).toEqual([]);
    expect(data.scenarioParams('martech')).toEqual([]);
  });
});
