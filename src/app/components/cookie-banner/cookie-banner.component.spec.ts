import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { CookieBannerComponent } from './cookie-banner.component';

describe('CookieBannerComponent', () => {
  const cookieServiceMock = {
    showBanner: signal(false),
    acceptNecessary: vi.fn(),
    acceptAll: vi.fn()
  };

  beforeEach(async () => {
    cookieServiceMock.showBanner.set(false);

    await TestBed.configureTestingModule({
      imports: [CookieBannerComponent],
      providers: [
        provideRouter([]),
        {
          provide: CookieConsentService,
          useValue: cookieServiceMock
        }
      ]
    }).compileComponents();
  });

  it('moves focus to primary action button when banner is reopened', async () => {
    const fixture = TestBed.createComponent(CookieBannerComponent);
    fixture.detectChanges();

    const outsideButton = document.createElement('button');
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    cookieServiceMock.showBanner.set(true);
    fixture.detectChanges();
    await Promise.resolve();

    const primaryAction = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(document.activeElement).toBe(primaryAction);

    outsideButton.remove();
  });
});
