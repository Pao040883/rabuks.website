import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  private router = inject(Router);
  menuOpen = signal(false);
  private shouldReturnFocusToTrigger = false;
  protected readonly mobileMenuTrigger = viewChild<ElementRef<HTMLButtonElement>>('mobileMenuTrigger');
  protected readonly firstMobileMenuAction = viewChild<ElementRef<HTMLButtonElement>>('firstMobileMenuAction');
  protected readonly mobileMenuId = 'primary-mobile-navigation';

  constructor() {
    effect(() => {
      if (this.menuOpen()) {
        queueMicrotask(() => {
          this.firstMobileMenuAction()?.nativeElement.focus();
        });
        return;
      }

      if (!this.shouldReturnFocusToTrigger) {
        return;
      }

      this.shouldReturnFocusToTrigger = false;
      queueMicrotask(() => {
        this.mobileMenuTrigger()?.nativeElement.focus();
      });
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMenu() {
    if (this.menuOpen()) {
      this.closeMenu({ returnFocus: true });
      return;
    }

    this.menuOpen.set(true);
  }

  closeMenu(options?: { returnFocus?: boolean }) {
    this.shouldReturnFocusToTrigger = options?.returnFocus ?? false;
    this.menuOpen.set(false);
  }

  closeMenuOnEscape() {
    this.closeMenu({ returnFocus: true });
  }

  scrollToSection(sectionId: string) {
    this.closeMenu();
    
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
}
