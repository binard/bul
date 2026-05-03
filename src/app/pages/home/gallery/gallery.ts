import { Component, ElementRef, signal, viewChild } from '@angular/core';
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

  open(item: GalleryItem): void {
    this.active.set(item);
  }

  close(): void {
    this.active.set(null);
  }

  scrollPrev(): void {
    this.scrollByDirection(-1);
  }

  scrollNext(): void {
    this.scrollByDirection(1);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  private scrollByDirection(direction: -1 | 1): void {
    const el = this.trackEl()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: 'smooth' });
  }
}
