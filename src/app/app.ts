import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('website');
  private themeService = inject(ThemeService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.themeService; // Trigger ThemeService initialization
    this.seoService.init();
    // Analytics wird NICHT hier initialisiert - erst nach Cookie-Zustimmung!
  }
}
