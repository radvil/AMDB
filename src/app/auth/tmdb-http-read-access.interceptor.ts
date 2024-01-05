import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TMDBAccessTokenService } from './tmdb-access-token.service';

export const tmdbHttpReadAccessInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const accessTokenApi = inject(TMDBAccessTokenService);
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessTokenApi.accessToken}`,
      },
    }),
  );
};
