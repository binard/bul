# La BUL — site vitrine

Site officiel de l'**Association Republicaine BUL** : [https://la-bul.com](https://la-bul.com)

Cinq amis, des villes. Depuis 2017.

## Stack

- **Angular 21** (zoneless, standalone, signals, control flow)
- **SSG** (Static Site Generation) via `@angular/ssr` — `outputMode: "static"`
- **SCSS** mobile-first
- **GitHub Pages** + domaine custom `la-bul.com`

## Developpement local

```bash
npm ci
npm start
```

Ouvre [http://localhost:4200](http://localhost:4200).

## Build

```bash
npm run build
```

Genere les fichiers HTML prerendered dans `dist/bul/browser/` (un `.html` par route).

## Deploiement

Le deploiement est automatique : tout push sur `master` declenche le workflow
`.github/workflows/deploy.yml` qui build et publie sur GitHub Pages.

Le fichier `public/CNAME` (`la-bul.com`) configure le domaine custom.

## Structure

```
src/
  index.html              # SEO meta, OG, JSON-LD, CSP
  styles.scss             # variables (palette noir/blanc/jaune), reset
  main.ts                 # bootstrap
  app/
    app.ts                # composant root (header + outlet + footer)
    app.config.ts         # providers (router, hydration, scroll, view transitions)
    app.routes.ts         # 4 routes lazy-loaded
    app.routes.server.ts  # prerender all routes
    core/
      seo.service.ts      # meta dynamique par route
      layout/
        header.{ts,html,scss}
        footer.{ts,html,scss}
    pages/
      home/
      asso/
      concept/
      legal/
public/
  Logo_BUL.png
  CNAME                   # la-bul.com
  robots.txt
  sitemap.xml
  favicon.ico
  docs/                   # PDF des statuts
  images/
    gallery/              # photos de la home
    concept/              # carte de France
```

## Notes

- **Zero analytics, zero cookie de suivi** → pas de bandeau RGPD a gerer.
- **Loi Evin** : la promotion d'alcool est encadree, le copy s'aligne sur la formulation
  officielle des statuts (« art de vivre a la francaise »). Les photos sont selectionnees
  pour ne pas mettre la consommation au centre.
- **A11y** : skip-link, focus visible, alt text, navigation clavier, contraste WCAG AA.
