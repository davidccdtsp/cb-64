import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { TitleStrategy, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppConfigService } from './services/app-config.service';
import { PageTitleStrategy } from './services/page-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    { provide: TitleStrategy, useExisting: PageTitleStrategy },
    // lee config.json antes de pintar la aplicación
    provideAppInitializer(() => inject(AppConfigService).load()),
  ]
};
