import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    title: "AMDB - Home",
    loadComponent: async () => {
      return (await import('./home/home.cmp')).HomeCmp;
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
