import { decodeGlobal, Defaults, encodeGlobal } from './url-state';
import { ConfigSnapshot } from '../model/config-model';

describe('estado en la URL: configuración', () => {
  const defaults: Defaults = {
    attribute: (id) => ({ 'DP-A-01': { weight: 3, mandatory: false }, 'DP-A-02': { weight: 2, mandatory: true } })[id],
    dimension: (id) => ({ 'DP-A': 8, 'DP-B': 4 })[id],
  };
  const base = (): ConfigSnapshot => ({
    version: 1,
    settings: { missing: 'exclude', requiredDeployments: [], scenario: 'M' },
    attributes: { 'DP-A-01': { weight: 3, mandatory: false }, 'DP-A-02': { weight: 2, mandatory: true } },
    dimensions: { 'DP-A': 8, 'DP-B': 4 },
    profiles: { datos: [], martech: [] },
  });
  const read = (p: Record<string, string>) => (key: string) => (key in p ? p[key] : null);

  it('sin cambios la URL no lleva parámetros', () => {
    expect(encodeGlobal(base(), defaults)).toEqual({});
  });

  it('solo se codifica lo que difiere de la rúbrica', () => {
    const s = base();
    s.attributes['DP-A-01'] = { weight: 1, mandatory: true };
    s.attributes['DP-A-02'].mandatory = false;
    s.dimensions['DP-B'] = 20;
    s.settings = { missing: 'mean', requiredDeployments: ['saas', 'docker'], scenario: 'L' };
    expect(encodeGlobal(s, defaults)).toEqual({ w: 'DP-A-01.1', ob: 'DP-A-01', on: 'DP-A-02', dw: 'DP-B.20', sp: 'mean', dep: 'saas,docker', esc: 'L' });
  });

  it('decodificar es la inversa de codificar', () => {
    const s = base();
    s.attributes['DP-A-01'] = { weight: 1, mandatory: true };
    s.attributes['DP-A-02'].mandatory = false;
    s.dimensions['DP-B'] = 20;
    s.settings = { missing: 'zero', requiredDeployments: ['saas'], scenario: 'S' };
    expect(decodeGlobal(read(encodeGlobal(s, defaults)), base(), ['saas', 'docker'])).toEqual(s);
    expect(decodeGlobal(read({}), base(), [])).toEqual(base());
  });

  it('un valor que no aplica invalida todo: id desconocido, formato roto, despliegue o escenario inexistentes', () => {
    const cases: Record<string, string>[] = [{ w: 'DP-X-01.3' }, { w: 'DP-A-01' }, { w: 'DP-A-01.x' }, { w: '' }, { dw: 'DP-Z.1' }, { ob: 'nada' }, { sp: 'otro' }, { dep: 'mainframe' }, { esc: 'XL' }];
    for (const bad of cases) {
      expect(decodeGlobal(read(bad), base(), ['saas']), JSON.stringify(bad)).toBeNull();
    }
    // un parámetro válido junto a otro inválido tampoco se aplica
    expect(decodeGlobal(read({ w: 'DP-A-01.1', esc: 'XL' }), base(), [])).toBeNull();
  });
});
