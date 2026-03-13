import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
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

  showBanner = signal<boolean>(true);
  consent = signal<CookieConsent | null>(null);

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
      }
    }
  }

  private loadConsent(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const consent = JSON.parse(stored) as CookieConsent;
        this.consent.set(consent);
        this.showBanner.set(false);
        
        if (consent.analytics) {
          this.enableAnalytics();
        }
      }
    }
  }

  private enableAnalytics(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialisiere Analytics erst jetzt (nach Zustimmung)
      this.analyticsService.initializeAnalytics();
      this.analyticsService.grantConsent();
    }
  }
}
