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
    path: 'tv/:seriesId',
    loadComponent: async () => {
      return (await import('./tv-show-detail/tv-show-detail.cmp'))
        .TvShowDetailCmp;
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
