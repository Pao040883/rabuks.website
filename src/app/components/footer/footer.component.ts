import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private router = inject(Router);
  protected cookieConsentService = inject(CookieConsentService);
  currentYear = new Date().getFullYear();

  scrollToSection(sectionId: string) {
    // Prüfe ob wir auf der Home-Seite sind
    if (this.router.url === '/' || this.router.url === '') {
      // Direkt zum Abschnitt scrollen
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Zur Home-Seite navigieren, dann scrollen
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    }
  }

  protected openCookieSettings(): void {
    this.cookieConsentService.reopenBanner();
  }

  protected withdrawAnalyticsConsent(): void {
    this.cookieConsentService.withdrawAnalyticsConsent();
  }
}
