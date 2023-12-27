import { defaultRedirectRoute } from '../+data-access/constants';

export const fallbackRouteToDefault = (route: string) =>
  route !== '/' ? route : defaultRedirectRoute;
