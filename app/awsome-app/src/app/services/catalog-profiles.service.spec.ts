import { TestBed } from '@angular/core/testing';
import { CatalogProfilesService } from './catalog-profiles.service';

describe('CatalogProfilesService', () => {
  it('perfiles por área, editables y restaurables', () => {
    const svc = TestBed.inject(CatalogProfilesService);
    const original = svc.profiles('datos').find((p) => p.id === 'saas')!.filters;
    expect(original.deployment).toEqual(['saas']);

    svc.save('datos', 'saas', { category: 'x', type: 'cloud', license: '', deployment: [] });
    expect(svc.profiles('datos').find((p) => p.id === 'saas')!.filters.category).toBe('x');
    expect(svc.profiles('martech').find((p) => p.id === 'saas')!.filters.category).toBe(''); // otra área, intacta

    svc.restore('datos', 'saas');
    expect(svc.profiles('datos').find((p) => p.id === 'saas')!.filters).toEqual(original);
  });

  it('crea perfiles nuevos con id único y rechaza nombres vacíos o repetidos', () => {
    const svc = TestBed.inject(CatalogProfilesService);
    const f = { category: 'cloud-dwh', type: '', license: '' as const, deployment: ['saas'] };
    const p = svc.add('datos', 'Mi perfil ñandú', f);
    expect(p).toMatchObject({ id: 'mi-perfil-nandu', name: 'Mi perfil ñandú', filters: f });
    expect(svc.profiles('datos').map((x) => x.id)).toContain('mi-perfil-nandu');
    expect(svc.isPredefined('datos', 'saas')).toBe(true);
    expect(svc.isPredefined('datos', 'mi-perfil-nandu')).toBe(false);
    expect(svc.profiles('martech').some((x) => x.id === 'mi-perfil-nandu')).toBe(false);

    expect(() => svc.add('datos', '  ', f)).toThrow();
    expect(() => svc.add('datos', 'MI PERFIL ÑANDÚ', f)).toThrow(/Ya existe/);
    expect(svc.add('datos', 'Mi perfil nandu!', f).id).toBe('mi-perfil-nandu-2');
  });
});
