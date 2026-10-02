import { DatePipe, DecimalPipe } from '@angular/common';
import { booleanAttribute, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Candidate } from '../../../model/candidatos-model';
import { Dimension } from '../../../model/rubrica-model';
import { EurPipe } from '../../../pipes/eur.pipe';
import { CostService } from '../../../services/cost.service';

/** Color de fondo de una fila y su texto de ayuda. */
export interface RowHeat {
  color: string | null;
  title: string;
}

/**
 * Tabla de candidatos del Catálogo y del Listado. Las columnas se eligen por nombre (`name`, `category`, `type`, `license`,
 * `lastRevisionDate`, `priceModel`, `cost`, `totalScore`) o por id de dimensión (las de `dimensions`). Opcionalmente
 * ordena, deja editar el coste y colorea las filas. Pinchar una fila emite `rowSelect`.
 */
@Component({
  selector: 'app-candidate-table',
  imports: [DatePipe, DecimalPipe, EurPipe, MatButtonModule, MatIconModule, MatSortModule, MatTableModule],
  templateUrl: './candidate-table.html',
  styleUrl: './candidate-table.scss',
})
export class CandidateTable {
  protected readonly cost = inject(CostService);

  readonly rows = input.required<Candidate[]>();
  readonly columns = input.required<string[]>();
  /** Dimensiones que se pueden mostrar como columnas (por su id). */
  readonly dimensions = input<Dimension[]>([]);
  /** Cabeceras ordenables; el orden lo aplica quien usa la tabla al recibir `sortChange`. */
  readonly sortable = input(false, { transform: booleanAttribute });
  /** Botón para editar el coste de cada fila (emite `editCost` con el id). */
  readonly editableCost = input(false, { transform: booleanAttribute });
  /** Color de cada fila; sin función, sin color. */
  readonly heat = input<((c: Candidate) => RowHeat) | null>(null);

  readonly rowSelect = output<Candidate>();
  readonly sortChange = output<Sort>();
  readonly editCost = output<string>();

  protected heatOf(c: Candidate): RowHeat | null {
    return this.heat()?.(c) ?? null;
  }
}
