import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { AppConfigService } from './app-config.service';

/** Título de la pestaña: «Página · título de la aplicación» (el de `config.json`), o solo el de la aplicación si la ruta no tiene. */
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly config = inject(AppConfigService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.buildTitle(snapshot);
    this.title.setTitle(page ? `${page} · ${this.config.title()}` : this.config.title());
  }
}
