import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsService } from './analytics.service';
import { CookieConsentService } from './cookie-consent.service';

describe('CookieConsentService', () => {
  const createStorageMock = (): Storage => {
    const data = new Map<string, string>();

    return {
      get length() {
        return data.size;
      },
      clear: () => {
        data.clear();
      },
      getItem: (key: string) => data.get(key) ?? null,
      key: (index: number) => Array.from(data.keys())[index] ?? null,
      removeItem: (key: string) => {
        data.delete(key);
      },
      setItem: (key: string, value: string) => {
        data.set(key, value);
      }
    };
  };

  const analyticsMock = {
    initializeAnalytics: vi.fn(),
    grantConsent: vi.fn(),
    revokeConsent: vi.fn()
  };

  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: createStorageMock(),
      configurable: true,
      writable: true
    });

    localStorage.clear();
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        CookieConsentService,
        {
          provide: AnalyticsService,
          useValue: analyticsMock
        }
      ]
    });
  });

  it('stores analytics consent and enables analytics on accept all', () => {
    const service = TestBed.inject(CookieConsentService);

    service.acceptAll();

    expect(service.hasAnalyticsConsent()).toBe(true);
    expect(service.showBanner()).toBe(false);
    expect(analyticsMock.initializeAnalytics).toHaveBeenCalledOnce();
    expect(analyticsMock.grantConsent).toHaveBeenCalledOnce();
  });

  it('withdraws analytics consent and revokes tracking', () => {
    const service = TestBed.inject(CookieConsentService);

    service.acceptAll();
    service.withdrawAnalyticsConsent();

    expect(service.hasAnalyticsConsent()).toBe(false);
    expect(analyticsMock.revokeConsent).toHaveBeenCalled();
  });

  it('reopens banner for post-hoc consent changes', () => {
    const service = TestBed.inject(CookieConsentService);

    service.acceptNecessary();
    service.reopenBanner();

    expect(service.showBanner()).toBe(true);
  });
});
