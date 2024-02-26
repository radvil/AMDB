import { defaultRedirectRoute } from '../+constants/tmdb';

export const fallbackRouteToDefault = (route: string) =>
  route !== '/' ? route : defaultRedirectRoute;
