import { Component, computed, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { DataService } from '../../../services/data.service';
import { WeightsForm as WeightsFormModel } from '../../../model/weights-model';

/**
 * Tratamiento de los criterios sin puntuación y, por criterio, slider de peso y check de obligatorio.
 * El formulario lo crea y gestiona quien lo usa.
 */
@Component({
  selector: 'app-weights-form',
  imports: [ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatSliderModule],
  templateUrl: './weights-form.html',
  styleUrl: './weights-form.scss',
})
export class WeightsForm {
  protected readonly data = inject(DataService);
  readonly form = input.required<WeightsFormModel>();
  /** Reparte los criterios en hasta 4 columnas, que se reducen según el ancho disponible. */
  readonly multiColumn = input(false);
  protected readonly ids = computed(() => Object.keys(this.form().controls.weights.controls));
}
