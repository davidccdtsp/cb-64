import { FormControl, FormGroup } from '@angular/forms';

export interface WeightControls {
  id: FormControl<string>;
  weight: FormControl<number>;
  mandatory: FormControl<boolean>;
}

/**
 * Qué hacer con un criterio sin puntuación (docs/01-metodologia.md §7): excluirlo, contarlo como 0 o usar
 * la media de las notas conocidas de ese criterio entre los candidatos comparados.
 */
export type MissingChoice = 'exclude' | 'zero' | 'mean';

export interface WeightsFormControls {
  missing: FormControl<MissingChoice>;
  weights: FormGroup<Record<string, FormGroup<WeightControls>>>;
}

export type WeightsForm = FormGroup<WeightsFormControls>;

/** Formulario de pesos de las dimensiones de un dominio: un control por id de dimensión. */
export type DimensionWeightsForm = FormGroup<Record<string, FormControl<number>>>;
