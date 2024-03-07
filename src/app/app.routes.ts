import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    title: 'AMDB - Home',
    loadComponent: async () => {
      return (await import('./home/home.cmp')).HomeCmp;
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
