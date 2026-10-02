import { Component, input, output } from '@angular/core';

/** Todos los elementos salvo el último son clicables y emiten su índice. */
@Component({
  selector: 'app-breadcrumbs',
  template: `
    <nav aria-label="Breadcrumb">
      @for (item of items(); track $index; let last = $last) {
        @if (last) {
          <span aria-current="page">{{ item }}</span>
        } @else {
          <button type="button" class="link" (click)="navigate.emit($index)">{{ item }}</button>
          <span class="sep">›</span>
        }
      }
    </nav>
  `,
  styles: `
    nav { margin-bottom: 1rem; }
    .sep { margin: 0 .5rem; }
    .link { padding: 0; border: 0; background: none; font: inherit; color: var(--mat-sys-primary); text-decoration: underline; cursor: pointer; }
  `,
})
export class Breadcrumbs {
  readonly items = input.required<string[]>();
  readonly navigate = output<number>();
}
