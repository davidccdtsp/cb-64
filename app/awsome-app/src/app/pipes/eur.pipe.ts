import { Pipe, PipeTransform, inject } from '@angular/core';
import { CostService } from '../services/cost.service';

const FORMAT = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

/**
 * Muestra un importe siempre en euros: `1234 | eur` («1234 €»). Si el importe está en otra moneda se
 * indica de dónde viene y se convierte con el tipo de cambio de CostService: `calc.min | eur: calc.currency`.
 * Los importes de CostService.monthly() están en USD, que es el origen por defecto.
 *
 * Es impuro a propósito: el resultado depende de una señal (el tipo de cambio), no solo de sus argumentos.
 * Usa Intl, que ya trae el formato español, para no cargar los datos de idioma de Angular.
 */
@Pipe({ name: 'eur', pure: false })
export class EurPipe implements PipeTransform {
  private readonly cost = inject(CostService);

  transform(value: number | null | undefined, from = 'USD'): string {
    if (value === null || value === undefined) return '—';
    return FORMAT.format(this.cost.toEur(value, from));
  }
}
