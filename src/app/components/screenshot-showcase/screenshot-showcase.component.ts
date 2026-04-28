import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScreenshotShowcaseItem {
  title: string;
  description: string;
  desktopImage: string;
  desktopAlt: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileImage?: string;
  mobileAlt?: string;
  mobileWidth?: number;
  mobileHeight?: number;
}

interface GalleryScreenshot {
  image: string;
  label: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-screenshot-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './screenshot-showcase.component.html',
  styleUrl: './screenshot-showcase.component.css'
})
export class ScreenshotShowcaseComponent {
  readonly showcaseItems: ScreenshotShowcaseItem[] = [
    {
      title: 'Übersicht im Dashboard',
      description:
        'Das Dashboard bündelt zentrale Kennzahlen, aktive Bereiche und den aktuellen Bearbeitungsstand Ihrer Objekte auf einen Blick.',
      desktopImage: '/Screenshots/1dashboard.png',
      desktopAlt: 'Rabuks Dashboard mit zentralen Kennzahlen, Bereichen und Navigationsübersicht',
      desktopWidth: 6016,
      desktopHeight: 2902,
      mobileImage: '/Mobile-Screenshots/mobil-dashboard.jpg',
      mobileAlt: 'Rabuks Mobile-Dashboard mit zentralen Kennzahlen und Schnellzugriffen',
      mobileWidth: 1080,
      mobileHeight: 2240
    },
    {
      title: 'Raumbücher strukturiert verwalten',
      description:
        'In der Raumbuchansicht finden Teams alle Objekte klar gegliedert und können Arbeitsstände nachvollziehbar pflegen.',
      desktopImage: '/Screenshots/2raumbuecher.png',
      desktopAlt: 'Rabuks Raumbuchübersicht mit strukturierten Einträgen und Filtermöglichkeiten',
      desktopWidth: 6016,
      desktopHeight: 2897,
      mobileImage: '/Mobile-Screenshots/mobile-raumbuecher.jpg',
      mobileAlt: 'Rabuks mobile Raumbuchübersicht mit Objektliste und Statusinformationen',
      mobileWidth: 1080,
      mobileHeight: 2225
    },
    {
      title: 'Detailtiefe für präzise Kalkulationen',
      description:
        'Die Detailansicht zeigt Raumattribute, Leistungswerte und Bearbeitungsinformationen für belastbare Kalkulationsgrundlagen.',
      desktopImage: '/Screenshots/3raumbuchdetails.png',
      desktopAlt: 'Rabuks Detailansicht eines Raumbuchs mit Flächen, Leistungswerten und Eingabefeldern',
      desktopWidth: 6016,
      desktopHeight: 2898,
      mobileImage: '/Mobile-Screenshots/mobile-raumbuchdetails.jpg',
      mobileAlt: 'Rabuks mobile Detailansicht eines Raumbuchs mit Raumdaten und Leistungswerten',
      mobileWidth: 1080,
      mobileHeight: 2216
    },
    {
      title: 'Auswertungen für bessere Entscheidungen',
      description:
        'Analysen und Tabellen helfen, Entwicklungen früh zu erkennen und Ressourcen auf Basis valider Daten zu steuern.',
      desktopImage: '/Screenshots/6auswertungen.png',
      desktopAlt: 'Rabuks Auswertungsbereich mit Diagrammen, Kennzahlen und tabellarischen Ergebnissen',
      desktopWidth: 6016,
      desktopHeight: 2894,
      mobileImage: '/Mobile-Screenshots/mobile-auswertungen.jpg',
      mobileAlt: 'Rabuks mobile Auswertungsansicht mit Kennzahlen und Diagrammübersicht',
      mobileWidth: 1080,
      mobileHeight: 2226
    }
  ];

  readonly galleryScreenshots: GalleryScreenshot[] = [
    {
      image: '/Screenshots/1dashboard.png',
      label: 'Dashboard (Desktop)',
      alt: 'Rabuks Dashboard mit zentralen Kennzahlen, Navigation und aktuellen Statuswerten',
      width: 6016,
      height: 2902
    },
    {
      image: '/Mobile-Screenshots/mobil-dashboard.jpg',
      label: 'Dashboard (Mobile)',
      alt: 'Rabuks Mobile-Dashboard mit Kennzahlen, Navigation und kompakten Statuswerten',
      width: 1080,
      height: 2240
    },
    {
      image: '/Screenshots/2raumbuecher.png',
      label: 'Raumbuchübersicht (Desktop)',
      alt: 'Rabuks Raumbuchübersicht mit gegliederten Objekten und Filtermöglichkeiten',
      width: 6016,
      height: 2897
    },
    {
      image: '/Mobile-Screenshots/mobile-raumbuecher.jpg',
      label: 'Raumbuchübersicht (Mobile)',
      alt: 'Rabuks mobile Raumbuchübersicht mit Objektliste und Filteroptionen',
      width: 1080,
      height: 2225
    },
    {
      image: '/Screenshots/3raumbuchdetails.png',
      label: 'Raumbuchdetails (Desktop)',
      alt: 'Rabuks Detailansicht eines Raumbuchs mit Flächen, Leistungswerten und Bearbeitungsfeldern',
      width: 6016,
      height: 2898
    },
    {
      image: '/Mobile-Screenshots/mobile-raumbuchdetails.jpg',
      label: 'Raumbuchdetails (Mobile)',
      alt: 'Rabuks mobile Detailansicht eines Raumbuchs mit Flächen- und Leistungsinformationen',
      width: 1080,
      height: 2216
    },
    {
      image: '/Screenshots/4raumliste.png',
      label: 'Raumliste',
      alt: 'Rabuks Raumliste mit strukturierten Einträgen und übersichtlicher Tabellenansicht',
      width: 6016,
      height: 2903
    },
    {
      image: '/Mobile-Screenshots/mobile-raumliste.jpg',
      label: 'Raumliste (Mobile)',
      alt: 'Rabuks mobile Raumliste mit kompakten Raumdaten und Statusinformationen',
      width: 1080,
      height: 2235
    },
    {
      image: '/Screenshots/5raumtabelle.png',
      label: 'Raumtabelle',
      alt: 'Rabuks Raumtabelle mit Detailspalten zu Flächen, Intervallen und Leistungen',
      width: 6016,
      height: 2896
    },
    {
      image: '/Screenshots/6auswertungen.png',
      label: 'Auswertungen (Desktop)',
      alt: 'Rabuks Auswertungsbereich mit Diagrammen, Kennzahlen und tabellarischen Ergebnissen',
      width: 6016,
      height: 2894
    },
    {
      image: '/Mobile-Screenshots/mobile-auswertungen.jpg',
      label: 'Auswertungen (Mobile)',
      alt: 'Rabuks mobile Auswertungsansicht mit Kennzahlen und grafischer Entwicklung',
      width: 1080,
      height: 2226
    },
    {
      image: '/Screenshots/7stammdaten.png',
      label: 'Stammdaten (Desktop)',
      alt: 'Rabuks Stammdatenansicht für die Pflege von Kunden-, Objekt- und Strukturinformationen',
      width: 6016,
      height: 2902
    },
    {
      image: '/Mobile-Screenshots/mobile-stammdaten.jpg',
      label: 'Stammdaten (Mobile)',
      alt: 'Rabuks mobile Stammdatenansicht zur Pflege zentraler Strukturinformationen',
      width: 1080,
      height: 2220
    },
    {
      image: '/Screenshots/8konfiguration.png',
      label: 'Konfiguration (Desktop)',
      alt: 'Rabuks Konfigurationsansicht mit Einstellungen für System, Rollen und Arbeitsabläufe',
      width: 6016,
      height: 2896
    },
    {
      image: '/Mobile-Screenshots/mobile-konfiguration.jpg',
      label: 'Konfiguration (Mobile)',
      alt: 'Rabuks mobile Konfigurationsansicht mit Einstellungen für Arbeitsabläufe und Optionen',
      width: 1080,
      height: 2230
    }
  ];

  readonly activeGalleryIndex = signal<number | null>(null);
  readonly activeShowcaseIndex = signal(0);
  readonly activeShowcaseItem = computed(() => this.showcaseItems[this.activeShowcaseIndex()] ?? this.showcaseItems[0]);
  readonly activeShowcasePosition = computed(() => this.activeShowcaseIndex() + 1);
  readonly isGalleryOpen = computed(() => this.activeGalleryIndex() !== null);
  readonly activeGalleryScreenshot = computed(() => {
    const index = this.activeGalleryIndex();
    if (index === null) {
      return null;
    }

    return this.galleryScreenshots[index] ?? null;
  });
  readonly activeGalleryPosition = computed(() => {
    const index = this.activeGalleryIndex();
    return index === null ? 0 : index + 1;
  });

  private readonly destroyRef = inject(DestroyRef);
  private readonly autoSlideDelayMs = 7000;
  private autoSlideTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastFocusedElement: HTMLElement | null = null;

  constructor() {
    this.scheduleAutoSlide();
    this.destroyRef.onDestroy(() => this.clearAutoSlideTimeout());
  }

  showPreviousShowcase(): void {
    if (this.showcaseItems.length === 0) {
      return;
    }

    const nextIndex = (this.activeShowcaseIndex() - 1 + this.showcaseItems.length) % this.showcaseItems.length;
    this.activeShowcaseIndex.set(nextIndex);
    this.scheduleAutoSlide();
  }

  showNextShowcase(fromAuto = false): void {
    if (this.showcaseItems.length === 0) {
      return;
    }

    const nextIndex = (this.activeShowcaseIndex() + 1) % this.showcaseItems.length;
    this.activeShowcaseIndex.set(nextIndex);

    if (!fromAuto) {
      this.scheduleAutoSlide();
    }
  }

  selectShowcase(index: number): void {
    if (index < 0 || index >= this.showcaseItems.length) {
      return;
    }

    this.activeShowcaseIndex.set(index);
    this.scheduleAutoSlide();
  }

  openGalleryForImage(imagePath: string, trigger: EventTarget | null): void {
    const index = this.galleryScreenshots.findIndex((item) => item.image === imagePath);
    this.openGalleryAt(index >= 0 ? index : 0, trigger);
  }

  openGalleryAt(index: number, trigger: EventTarget | null): void {
    const total = this.galleryScreenshots.length;
    if (total === 0) {
      this.activeGalleryIndex.set(null);
      return;
    }

    const safeIndex = Math.min(Math.max(index, 0), total - 1);

    if (trigger instanceof HTMLElement) {
      this.lastFocusedElement = trigger;
    } else if (document.activeElement instanceof HTMLElement) {
      this.lastFocusedElement = document.activeElement;
    } else {
      this.lastFocusedElement = null;
    }

    this.activeGalleryIndex.set(safeIndex);

    queueMicrotask(() => {
      const closeButton = document.getElementById('gallery-close-button') as HTMLButtonElement | null;
      closeButton?.focus();
    });
  }

  closeGallery(): void {
    this.activeGalleryIndex.set(null);

    const previouslyFocusedElement = this.lastFocusedElement;
    this.lastFocusedElement = null;

    queueMicrotask(() => {
      previouslyFocusedElement?.focus();
    });
  }

  showPrevious(): void {
    const index = this.activeGalleryIndex();
    const total = this.galleryScreenshots.length;
    if (index === null || total === 0) {
      return;
    }

    const nextIndex = (index - 1 + total) % total;
    this.activeGalleryIndex.set(nextIndex);
  }

  showNext(): void {
    const index = this.activeGalleryIndex();
    const total = this.galleryScreenshots.length;
    if (index === null || total === 0) {
      return;
    }

    const nextIndex = (index + 1) % total;
    this.activeGalleryIndex.set(nextIndex);
  }

  onGalleryKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeGallery();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.showPrevious();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.showNext();
    }
  }

  private scheduleAutoSlide(): void {
    this.clearAutoSlideTimeout();

    if (this.showcaseItems.length <= 1) {
      return;
    }

    this.autoSlideTimeoutId = setTimeout(() => {
      this.showNextShowcase(true);
      this.scheduleAutoSlide();
    }, this.autoSlideDelayMs);
  }

  private clearAutoSlideTimeout(): void {
    if (this.autoSlideTimeoutId === null) {
      return;
    }

    clearTimeout(this.autoSlideTimeoutId);
    this.autoSlideTimeoutId = null;
  }
}
