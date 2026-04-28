import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ScreenshotShowcaseComponent } from './screenshot-showcase.component';

describe('ScreenshotShowcaseComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenshotShowcaseComponent]
    }).compileComponents();
  });

  it('renders a single showcase card and cycles showcase items', () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('article');
    expect(cards.length).toBe(1);

    const component = fixture.componentInstance;
    expect(component.activeShowcaseItem().desktopImage).toBe('/Screenshots/1dashboard.png');

    component.showNextShowcase();
    expect(component.activeShowcaseItem().desktopImage).toBe('/Screenshots/2raumbuecher.png');

    component.showPreviousShowcase();
    expect(component.activeShowcaseItem().desktopImage).toBe('/Screenshots/1dashboard.png');
  });

  it('auto-advances showcase and continues sensibly after manual navigation', () => {
    vi.useFakeTimers();
    try {
      const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
      fixture.detectChanges();

      const component = fixture.componentInstance;
      expect(component.activeShowcaseIndex()).toBe(0);

      vi.advanceTimersByTime(7000);
      expect(component.activeShowcaseIndex()).toBe(1);

      component.selectShowcase(3);
      expect(component.activeShowcaseIndex()).toBe(3);

      vi.advanceTimersByTime(6999);
      expect(component.activeShowcaseIndex()).toBe(3);

      vi.advanceTimersByTime(1);
      expect(component.activeShowcaseIndex()).toBe(0);

      fixture.destroy();
    } finally {
      vi.useRealTimers();
    }
  });

  it('opens gallery from desktop preview click and provides all available screenshots', () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectShowcase(1);
    fixture.detectChanges();

    const desktopTrigger = fixture.nativeElement.querySelector('[data-current-desktop-trigger]') as HTMLButtonElement;
    expect(desktopTrigger).toBeTruthy();

    desktopTrigger.click();
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.isGalleryOpen()).toBe(true);
    expect(component.galleryScreenshots.length).toBe(15);
    expect(component.activeGalleryScreenshot()?.image).toBe('/Screenshots/2raumbuecher.png');
    expect(component.galleryScreenshots.some((item) => item.image === '/Mobile-Screenshots/mobile-raumbuecher.jpg')).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('opens gallery from mobile showcase preview', () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    fixture.componentInstance.selectShowcase(1);
    fixture.detectChanges();

    const mobileTrigger = fixture.nativeElement.querySelector('[data-current-mobile-trigger]') as HTMLButtonElement;
    expect(mobileTrigger).toBeTruthy();

    mobileTrigger.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeGalleryScreenshot()?.image).toBe('/Mobile-Screenshots/mobile-raumbuecher.jpg');
  });

  it('closes on Escape and restores focus to opening trigger', async () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('[data-screenshot-trigger]') as HTMLButtonElement;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await Promise.resolve();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog).toBeTruthy();

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await Promise.resolve();

    expect(fixture.componentInstance.isGalleryOpen()).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('cycles to first screenshot when navigating next from the end', () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.openGalleryAt(component.galleryScreenshots.length - 1, null);
    component.showNext();

    expect(component.activeGalleryIndex()).toBe(0);
    expect(component.activeGalleryScreenshot()?.image).toBe('/Screenshots/1dashboard.png');
  });

  it('cycles to last screenshot when navigating previous from the first', () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.openGalleryAt(0, null);
    component.showPrevious();

    expect(component.activeGalleryIndex()).toBe(component.galleryScreenshots.length - 1);
  });

  it('clamps out-of-range gallery index when opening directly', () => {
    const fixture = TestBed.createComponent(ScreenshotShowcaseComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.openGalleryAt(999, null);

    expect(component.activeGalleryIndex()).toBe(component.galleryScreenshots.length - 1);
  });
});
