import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DataService } from '../services/data.service';
import { Layout } from './layout';

describe('Layout', () => {
  it('el menú lateral se abre con el icono, y se cierra con Escape o al pulsar fuera', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: DataService, useValue: { loaded: signal(true) } }] });
    const fixture = TestBed.createComponent(Layout);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const aside = el.querySelector('aside')!;
    expect(aside.classList.contains('open')).toBe(false);

    (el.querySelector('.menu-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(aside.classList.contains('open')).toBe(true);

    (el.querySelector('.backdrop') as HTMLElement).click();
    fixture.detectChanges();
    expect(aside.classList.contains('open')).toBe(false);

    (el.querySelector('.menu-button') as HTMLButtonElement).click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(aside.classList.contains('open')).toBe(false);
  });
});
