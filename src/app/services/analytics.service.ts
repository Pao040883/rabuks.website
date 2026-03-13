import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);
  private readonly GA_MEASUREMENT_ID = 'G-EMVJ6PZZBX';
  private isInitialized = false;

  initializeAnalytics(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isInitialized) return; // Verhindere doppelte Initialisierung

    this.isInitialized = true;

    // Google Analytics 4 Script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('consent', 'default', {
        'analytics_storage': 'denied'
      });
      gtag('config', '${this.GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
  }

  grantConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }

  trackEvent(eventName: string, eventParams?: Record<string, any>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  }

  trackPageView(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (window.gtag) {
      window.gtag('config', this.GA_MEASUREMENT_ID, {
        page_path: url
      });
    }
  }
}
