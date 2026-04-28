import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../services/theme.service';

describe('HeaderComponent', () => {
  const themeMock = {
    theme: signal<'light' | 'dark'>('light'),
    toggleTheme: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        {
          provide: ThemeService,
          useValue: themeMock
        }
      ]
    }).compileComponents();
  });

  it('moves focus to first mobile action when menu opens', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[aria-controls="primary-mobile-navigation"]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await Promise.resolve();

    const firstAction = fixture.nativeElement.querySelector('#primary-mobile-navigation button') as HTMLButtonElement;
    expect(document.activeElement).toBe(firstAction);
  });

  it('closes mobile menu on Escape and returns focus to trigger', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[aria-controls="primary-mobile-navigation"]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await Promise.resolve();

    const menu = fixture.nativeElement.querySelector('#primary-mobile-navigation') as HTMLElement;
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await Promise.resolve();

    expect(fixture.componentInstance.menuOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });
});
