import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    title: 'AMDB - Home',
    loadComponent: async () => {
      return (await import('@page')).HomeCmp;
    },
  },
  {
    path: 'tv/:seriesId',
    loadComponent: async () => {
      return (await import('@page')).TvShowDetailCmp;
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
