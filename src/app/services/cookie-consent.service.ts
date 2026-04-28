import { Injectable, computed, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from './analytics.service';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private platformId = inject(PLATFORM_ID);
  private analyticsService = inject(AnalyticsService);
  private readonly STORAGE_KEY = 'cookie-consent';

  showBanner = signal(true);
  consent = signal<CookieConsent | null>(null);
  hasAnalyticsConsent = computed(() => this.consent()?.analytics === true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadConsent();
    }
  }

  acceptAll(): void {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      timestamp: Date.now()
    };
    this.saveConsent(consent);
  }

  acceptNecessary(): void {
    const consent: CookieConsent = {
      necessary: true,
      analytics: false,
      timestamp: Date.now()
    };
    this.saveConsent(consent);
  }

  private saveConsent(consent: CookieConsent): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consent));
      this.consent.set(consent);
      this.showBanner.set(false);

      if (consent.analytics) {
        this.enableAnalytics();
      } else {
        this.disableAnalytics();
      }
    }
  }

  reopenBanner(): void {
    this.showBanner.set(true);
  }

  withdrawAnalyticsConsent(): void {
    this.acceptNecessary();
  }

  private loadConsent(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          const consent = JSON.parse(stored) as CookieConsent;
          this.consent.set(consent);
          this.showBanner.set(false);

          if (consent.analytics) {
            this.enableAnalytics();
          } else {
            this.disableAnalytics();
          }
        } catch {
          localStorage.removeItem(this.STORAGE_KEY);
          this.consent.set(null);
          this.showBanner.set(true);
        }
      }
    }
  }

  private enableAnalytics(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.analyticsService.initializeAnalytics();
      this.analyticsService.grantConsent();
    }
  }

  private disableAnalytics(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.analyticsService.revokeConsent();
    }
  }
}
