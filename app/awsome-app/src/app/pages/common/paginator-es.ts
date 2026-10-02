import { MatPaginatorIntl } from '@angular/material/paginator';

/** Textos del paginador en español (por defecto salen en inglés). */
export function paginatorEs(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  intl.itemsPerPageLabel = 'Filas por página:';
  intl.nextPageLabel = 'Página siguiente';
  intl.previousPageLabel = 'Página anterior';
  intl.firstPageLabel = 'Primera página';
  intl.lastPageLabel = 'Última página';
  intl.getRangeLabel = (page, size, length) => {
    if (!length) return '0 de 0';
    const start = page * size;
    return `${start + 1} – ${Math.min(start + size, length)} de ${length}`;
  };
  return intl;
}
