import type { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    title: 'AMDB - Home',
    loadComponent: async () => {
      return (await import('./home/home.cmp')).HomeCmp;
    },
  },
  {
    path: 'test-ui-page',
    title: "Page UI Test",
    loadComponent: async () => {
      return (await import('./_test-ui-page/test-ui-page.cmp')).TestUiPageCmp;
    },
  },
  {
    path: 'tv/:tvSeriesId',
    loadComponent: async () => {
      return (await import('./tv-series-detail/tv-series-detail.cmp'))
        .TvSeriesDetailCmp;
    },
  },
  {
    path: 'person/:personId',
    loadComponent: async () => {
      return (await import('./person-detail/person-detail.cmp'))
        .PersonDetailCmp;
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
