import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import candidatos from '../../../public/candidatos.json';
import costesDatos from '../../../public/costes_datos.json';
import costesMartech from '../../../public/costes_martech.json';
import escenarios from '../../../public/escenarios.json';
import rubrica from '../../../public/rubrica.json';
import { Scenario } from '../model/candidatos-model';
import { CostService } from './cost.service';
import { DataService } from './data.service';

/** Los modelos de precios de las fichas (front matter) deben reproducir los totales de sus propias tablas. */
describe('modelos de precios de las fichas', () => {
  function setup() {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const data = TestBed.inject(DataService);
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('rubrica.json').flush(rubrica);
    http.expectOne('candidatos.json').flush(candidatos);
    http.expectOne('costes_datos.json').flush(costesDatos);
    http.expectOne('costes_martech.json').flush(costesMartech);
    http.expectOne('escenarios.json').flush(escenarios);
    return { data, cost: TestBed.inject(CostService) };
  }

  const modeled = ['bigquery', 'snowflake', 'clickhouse', 'amazon-ses', 'hubspot-marketing-hub', 'klaviyo', 'mailchimp', 'salesforce-marketing-cloud', 'databricks', 'redshift', 'motherduck', 'microsoft-fabric', 'postmark', 'customer-io', 'apache-unomi', 'listmonk', 'mautic', 'rudderstack', 'dittofeed', 'jitsu', 'keila', 'apache-doris', 'starrocks', 'apache-druid', 'apache-pinot', 'postgresql-extensiones-analiticas', 'apache-spark-sql', 'trino', 'dremio', 'firebolt', 'twilio-segment', 'salesforce-data-cloud'];

  it('tienen modelo y coinciden con los totales de la tabla (±1 %)', () => {
    const { data, cost } = setup();
    for (const id of modeled) {
      const total = data.costs(id)!.totals;
      expect(data.costs(id)!.model, id).toBeDefined();
      for (const s of ['S', 'M', 'L'] as Scenario[]) {
        const calc = cost.calculate(id, s)!;
        expect(calc, `${id} ${s}`).toBeDefined();
        const rel = (a: number, b: number) => Math.abs(a - b) / b;
        expect(rel(calc.min, total[s]!.min), `${id} ${s} min`).toBeLessThan(0.01);
        expect(rel(calc.max, total[s]!.max), `${id} ${s} max`).toBeLessThan(0.01);
      }
    }
  });

  it('un cambio de supuesto se recalcula y se restablece', () => {
    const { cost } = setup();
    const antes = cost.calculate('amazon-ses', 'M')!;
    cost.setScenarioParam('martech', 'emails_mes', 'M', 4_000_000);
    expect(cost.calculate('amazon-ses', 'M')!.min).toBeCloseTo(antes.min * 2);
    cost.setScenarioParam('martech', 'emails_mes', 'M', undefined);
    expect(cost.calculate('amazon-ses', 'M')!.min).toBeCloseTo(antes.min);

    cost.setModelParam('bigquery', 'precio_tib', 'S', 12.5); // el doble: solo la parte de consultas
    expect(cost.calculate('bigquery', 'S')!.variants[0].components[0].max).toBeCloseTo(6.25);
  });

  it('el coste del modelo (en EUR) se convierte a USD y alimenta monthly()', () => {
    const { cost } = setup();
    cost.setUsdPerEur(2);
    const est = cost.monthly('clickhouse', 'S')!;
    expect(est.calculated).toBe(true);
    expect(est.min).toBeCloseTo(284 * 2);
    expect(est.max).toBeCloseTo(364 * 2);
  });

  it('un candidato sin modelo usa el total de su tabla', () => {
    const { cost } = setup();
    expect(cost.calculate('sendgrid', 'M')).toBeUndefined();
    expect(cost.monthly('sendgrid', 'M')).toMatchObject({ calculated: false, mid: 949 });
  });
});
