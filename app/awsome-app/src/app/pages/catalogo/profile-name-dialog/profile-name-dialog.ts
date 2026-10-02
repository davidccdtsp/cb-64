import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** Pide el nombre de un perfil nuevo. Cierra devolviendo el nombre, o nada si se cancela. */
@Component({
  selector: 'app-profile-name-dialog',
  imports: [FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Nuevo perfil de filtro</h2>
    <mat-dialog-content>
      <p>El perfil se crea con los filtros actuales del catálogo.</p>
      <mat-form-field>
        <mat-label>Nombre del perfil</mat-label>
        <input matInput [ngModel]="name()" (ngModelChange)="name.set($event)" (keydown.enter)="save()" autofocus />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button [disabled]="!name().trim()" (click)="save()">Crear</button>
    </mat-dialog-actions>
  `,
})
export class ProfileNameDialog {
  private readonly dialogRef = inject(MatDialogRef<ProfileNameDialog, string>);
  protected readonly name = signal('');

  protected save(): void {
    if (this.name().trim()) this.dialogRef.close(this.name().trim());
  }
}
