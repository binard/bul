import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

const SITE_URL = 'https://la-bul.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/Logo_BUL.png`;

interface RouteSeoData {
  title?: string;
  description?: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  initRouteListener(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.collectDeepest(this.route)),
      )
      .subscribe((data) => {
        this.applySeo(data, this.router.url);
      });
  }

  private collectDeepest(route: ActivatedRoute): RouteSeoData {
    let r = route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return (r.snapshot.data ?? {}) as RouteSeoData;
  }

  private applySeo(data: RouteSeoData, url: string): void {
    const title = data.title ?? 'La BUL';
    const description = data.description ?? '';
    const ogImage = data.ogImage ?? DEFAULT_OG_IMAGE;
    const fullUrl = `${SITE_URL}${url === '/' ? '' : url}`;

    this.title.setTitle(title);

    this.upsertMeta('name', 'description', description);
    this.upsertMeta('property', 'og:title', title);
    this.upsertMeta('property', 'og:description', description);
    this.upsertMeta('property', 'og:url', fullUrl);
    this.upsertMeta('property', 'og:image', ogImage);
    this.upsertMeta('name', 'twitter:title', title);
    this.upsertMeta('name', 'twitter:description', description);
    this.upsertMeta('name', 'twitter:image', ogImage);

    this.upsertCanonical(fullUrl);
  }

  private upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
    if (!content) {
      return;
    }
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content });
    } else {
      this.meta.addTag({ [attr]: key, content });
    }
  }

  private upsertCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
