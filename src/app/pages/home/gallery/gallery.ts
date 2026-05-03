import { Component, ElementRef, effect, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GALLERY_ITEMS, GalleryItem } from './gallery.config';

@Component({
  selector: 'app-gallery',
  imports: [NgOptimizedImage],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  readonly items = GALLERY_ITEMS;
  readonly active = signal<GalleryItem | null>(null);

  private readonly trackEl = viewChild<ElementRef<HTMLElement>>('track');
  private readonly dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private lastOpener: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const item = this.active();
      const dialog = this.dialogEl()?.nativeElement;
      if (!dialog) return;
      if (item && !dialog.open) {
        dialog.showModal();
      } else if (!item && dialog.open) {
        dialog.close();
      }
    });
  }

  open(item: GalleryItem, opener: HTMLElement): void {
    this.lastOpener = opener;
    this.active.set(item);
  }

  close(): void {
    this.active.set(null);
    this.lastOpener?.focus();
    this.lastOpener = null;
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogEl()?.nativeElement) {
      this.close();
    }
  }

  scrollPrev(): void {
    this.scrollByDirection(-1);
  }

  scrollNext(): void {
    this.scrollByDirection(1);
  }

  private scrollByDirection(direction: -1 | 1): void {
    const el = this.trackEl()?.nativeElement;
    if (!el) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: reduced ? 'auto' : 'smooth' });
  }
}
