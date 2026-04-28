import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  templateUrl: './cookie-banner.component.html'
})
export class CookieBannerComponent {
  cookieService = inject(CookieConsentService);
  protected readonly primaryActionButton = viewChild<ElementRef<HTMLButtonElement>>('cookiePrimaryActionButton');

  constructor() {
    let wasVisible = this.cookieService.showBanner();

    effect(() => {
      const isVisible = this.cookieService.showBanner();
      if (isVisible && !wasVisible) {
        queueMicrotask(() => {
          this.primaryActionButton()?.nativeElement.focus();
        });
      }

      wasVisible = isVisible;
    });
  }
}
