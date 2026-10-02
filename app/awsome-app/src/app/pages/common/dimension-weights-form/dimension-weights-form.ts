import { Component, computed, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { DataService } from '../../../services/data.service';
import { DimensionWeightsForm as DimensionWeightsFormModel } from '../../../model/weights-model';

/** Un slider por dimensión para ajustar su peso en la puntuación. El formulario lo crea y gestiona quien lo usa. */
@Component({
  selector: 'app-dimension-weights-form',
  imports: [ReactiveFormsModule, MatSliderModule],
  templateUrl: './dimension-weights-form.html',
  styleUrl: './dimension-weights-form.scss',
})
export class DimensionWeightsForm {
  protected readonly data = inject(DataService);
  readonly form = input.required<DimensionWeightsFormModel>();
  protected readonly ids = computed(() => Object.keys(this.form().controls));
}
