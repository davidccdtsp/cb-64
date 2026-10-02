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
          <a href="#" (click)="$event.preventDefault(); navigate.emit($index)">{{ item }}</a>
          <span class="sep">›</span>
        }
      }
    </nav>
  `,
  styles: 'nav { margin-bottom: 1rem; } .sep { margin: 0 .5rem; }',
})
export class Breadcrumbs {
  readonly items = input.required<string[]>();
  readonly navigate = output<number>();
}
