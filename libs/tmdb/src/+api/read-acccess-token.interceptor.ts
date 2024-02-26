import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TmdbAccessTokenService } from './access-token.service';

export const tmdbHttpReadAccessInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const accessTokenApi = inject(TmdbAccessTokenService);
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessTokenApi.accessToken}`,
      },
    }),
  );
};
