import { Component, Injector, afterNextRender, effect, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Campo numérico (≥ 0, con decimales) de los editores de coste. Muestra el valor que se está usando (`value`); al confirmar
 * (Enter o salir del campo) emite `commit` con el número escrito, o `undefined` si se deja vacío o se pulsa restablecer.
 * Un valor no válido no se emite: el campo queda marcado con su error hasta que se corrige.
 */
@Component({
  selector: 'app-cost-input',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './cost-input.html',
  styleUrl: './cost-input.scss',
})
export class CostInput {
  private readonly injector = inject(Injector);

  readonly label = input.required<string>();
  /** Valor en uso que se muestra; `null` = campo vacío. */
  readonly value = input<number | null>(null);
  readonly placeholder = input('');
  readonly hint = input('');
  /** Muestra el botón de restablecer (hay un valor propio que quitar). */
  readonly resettable = input(false);
  readonly commit = output<number | undefined>();

  protected readonly control = new FormControl<number | null>(null, Validators.min(0));

  constructor() {
    effect(() => this.control.setValue(this.value(), { emitEvent: false }));
  }

  /** Solo dígitos y separador decimal: sin signo ni exponente. */
  protected block(e: KeyboardEvent): void {
    if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
  }

  protected apply(input: HTMLInputElement): void {
    this.control.markAsTouched();
    if (input.validity.badInput) return void this.control.setErrors({ badInput: true });
    if (this.control.invalid) return;
    this.commit.emit(this.control.value ?? undefined);
    // aunque el valor en uso no cambie (p. ej. se repite el de antes), el campo debe mostrar el que se está usando
    afterNextRender(() => this.control.setValue(this.value(), { emitEvent: false }), { injector: this.injector });
  }

  protected reset(): void {
    this.commit.emit(undefined);
  }
}
