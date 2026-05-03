import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    data: {
      title: 'La BUL · Association Républicaine',
      description: "Une amitié d'enfance déposée en préfecture. Cinq amis, quatre weekends par an, depuis 2017.",
    },
  },
  {
    path: 'asso',
    loadComponent: () => import('./pages/asso/asso').then((m) => m.Asso),
    data: {
      title: "L'asso · La BUL",
      description: "Histoire, valeurs et statuts de l'Association Républicaine BUL.",
    },
  },
  {
    path: 'concept',
    loadComponent: () => import('./pages/concept/concept').then((m) => m.Concept),
    data: {
      title: 'Le concept · La BUL',
      description: 'Un weekend par trimestre, dans une ville différente. Voilà.',
    },
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    data: {
      title: 'Mentions légales · La BUL',
      description: 'Mentions légales du site la-bul.com.',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
