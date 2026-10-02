import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImportConfigModal } from './import-config-modal/import-config-modal';

/** Engranaje de la cabecera de cada página: abre el modal de importar/exportar la configuración. */
@Component({
  selector: 'app-config-menu',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button (click)="open()" aria-label="Importar o exportar la configuración" title="Importar / exportar configuración">
      <mat-icon fontSet="material-symbols-outlined">settings</mat-icon>
    </button>
  `,
})
export class ConfigMenu {
  private readonly dialog = inject(MatDialog);

  protected open(): void {
    this.dialog.open(ImportConfigModal, { width: '36rem', maxWidth: '95vw' });
  }
}
