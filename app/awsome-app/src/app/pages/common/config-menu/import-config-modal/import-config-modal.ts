import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigTransferService } from '../../../../services/config-transfer.service';

/** Exporta la configuración (JSON o CSV) e importa un fichero exportado antes. */
@Component({
  selector: 'app-import-config-modal',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './import-config-modal.html',
  styleUrl: './import-config-modal.scss',
})
export class ImportConfigModal {
  private readonly transfer = inject(ConfigTransferService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialogRef = inject(MatDialogRef<ImportConfigModal>);

  protected export(format: 'json' | 'csv'): void {
    const text = format === 'json' ? this.transfer.toJson() : this.transfer.toCsv();
    const url = URL.createObjectURL(new Blob([text], { type: format === 'json' ? 'application/json' : 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `configuracion.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  protected async import(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = ''; // permite volver a elegir el mismo fichero
    if (!file) return;
    try {
      const format = file.name.toLowerCase().endsWith('.csv') ? 'csv' : 'json';
      const discarded = this.transfer.apply(this.transfer.parse(await file.text(), format));
      this.snackBar.open(
        discarded ? `Configuración importada; se han descartado ${discarded} pesos de perfiles del resumen que apuntan a dimensiones que ya no existen.` : 'Configuración importada.',
        'Cerrar', { duration: discarded ? 10000 : 4000 });
      this.dialogRef.close();
    } catch (e) {
      this.snackBar.open(e instanceof Error ? e.message : 'No se ha podido importar la configuración.', 'Cerrar', { duration: 10000 });
    }
  }
}
