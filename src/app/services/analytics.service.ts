import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);
  private readonly GA_MEASUREMENT_ID = 'G-YPZPH8NSB8';
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

  revokeConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    this.clearAnalyticsCookies();
  }

  trackEvent(eventName: string, eventParams?: Record<string, unknown>): void {
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

  private clearAnalyticsCookies(): void {
    const analyticsCookiePrefixes = ['_ga', '_gid', '_gat', '_ga_'];
    const cookieNames = document.cookie
      .split(';')
      .map((cookie) => cookie.trim().split('=')[0])
      .filter((name) => analyticsCookiePrefixes.some((prefix) => name.startsWith(prefix)));

    if (!cookieNames.length) {
      return;
    }

    const hostname = window.location.hostname;
    const domains = hostname.includes('.') ? [hostname, `.${hostname}`] : [hostname];

    for (const cookieName of cookieNames) {
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
      for (const domain of domains) {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain};SameSite=Lax`;
      }
    }
  }
}
