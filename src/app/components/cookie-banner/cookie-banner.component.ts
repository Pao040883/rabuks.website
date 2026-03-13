import { Component, inject } from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [],
  templateUrl: './cookie-banner.component.html'
})
export class CookieBannerComponent {
  cookieService = inject(CookieConsentService);
}
