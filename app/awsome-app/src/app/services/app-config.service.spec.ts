import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  const setup = () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    return { svc: TestBed.inject(AppConfigService), http: TestBed.inject(HttpTestingController), page: TestBed.inject(Title) };
  };

  it('toma el título de config.json y lo pone también en la pestaña', async () => {
    const { svc, http, page } = setup();
    const done = svc.load();
    http.expectOne('config.json').flush({ title: '  Mi estudio  ', catalogMaxRows: 25, usdPerEur: 1.25 });
    await done;
    expect(svc.title()).toBe('Mi estudio');
    expect(svc.catalogMaxRows()).toBe(25);
    expect(svc.usdPerEur()).toBe(1.25);
    expect(page.getTitle()).toBe('Mi estudio');
  });

  it('con config.json ausente o inválido deja el título por defecto', async () => {
    for (const respond of [(r: any) => r.flush('x', { status: 404, statusText: 'Not Found' }), (r: any) => r.flush({ title: 5, catalogMaxRows: 0, usdPerEur: -2 })]) {
      TestBed.resetTestingModule();
      const { svc, http } = setup();
      const done = svc.load();
      respond(http.expectOne('config.json'));
      await done;
      expect(svc.title()).toBe('Awsome App');
      expect(svc.catalogMaxRows()).toBe(100);
      expect(svc.usdPerEur()).toBe(1.1);
    }
  });
});
