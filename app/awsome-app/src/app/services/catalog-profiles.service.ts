import { Injectable, signal } from '@angular/core';
import { CatalogFilters, CatalogProfile } from '../model/catalog-model';
import { Area } from '../model/domain-model';

const defaults = (): Record<Area, CatalogProfile[]> => {
  const profiles = (): CatalogProfile[] => [
    {
      id: 'oss-autoalojado',
      name: 'Open source autoalojado',
      filters: { category: '', type: '', license: 'Open source', deployment: ['self-hosted', 'kubernetes', 'docker'] },
    },
    { id: 'saas', name: 'SaaS gestionado', filters: { category: '', type: '', license: '', deployment: ['saas'] } },
  ];
  return { datos: profiles(), martech: profiles() };
};

/**
 * Perfiles predefinidos del catálogo, por área: cada uno es un conjunto de valores de los filtros del catálogo.
 * Son editables (se sobrescriben con los filtros actuales) y solo se aplican en esa página.
 */
@Injectable({ providedIn: 'root' })
export class CatalogProfilesService {
  private readonly all = signal<Record<Area, CatalogProfile[]>>(defaults());

  profiles(area: Area): CatalogProfile[] {
    return this.all()[area];
  }

  /** Sustituye los filtros del perfil por los dados. */
  save(area: Area, id: string, filters: CatalogFilters): void {
    this.all.update((all) => ({
      ...all,
      [area]: all[area].map((p) => (p.id === id ? { ...p, filters: { ...filters, deployment: [...filters.deployment] } } : p)),
    }));
  }

  /** true si el perfil viene de serie (se puede restaurar); false si lo creó el usuario. */
  isPredefined(area: Area, id: string): boolean {
    return defaults()[area].some((p) => p.id === id);
  }

  /** Crea un perfil nuevo con esos filtros y lo devuelve. @throws Error si el nombre está vacío o ya existe en el área. */
  add(area: Area, name: string, filters: CatalogFilters): CatalogProfile {
    const clean = name.trim();
    if (!clean) throw new Error('El perfil necesita un nombre.');
    if (this.all()[area].some((p) => p.name.toLowerCase() === clean.toLowerCase())) throw new Error(`Ya existe un perfil llamado «${clean}».`);
    const slug = clean.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'perfil';
    const ids = new Set(this.all()[area].map((p) => p.id));
    let id = slug;
    for (let n = 2; ids.has(id); n++) id = `${slug}-${n}`;
    const profile = { id, name: clean, filters: { ...filters, deployment: [...filters.deployment] } };
    this.all.update((all) => ({ ...all, [area]: [...all[area], profile] }));
    return profile;
  }

  /** Devuelve el perfil a sus valores predefinidos. */
  restore(area: Area, id: string): void {
    const original = defaults()[area].find((p) => p.id === id);
    if (original) this.save(area, id, original.filters);
  }

  /** Estado completo, para exportarlo. */
  snapshot(): Record<Area, CatalogProfile[]> {
    return this.all();
  }

  /** Sustituye los perfiles de un área (importación). */
  load(area: Area, profiles: CatalogProfile[]): void {
    this.all.update((all) => ({ ...all, [area]: profiles }));
  }
}
