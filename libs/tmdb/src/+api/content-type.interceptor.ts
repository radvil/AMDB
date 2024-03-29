import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const tmdbHttpContentTypeInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return next(
    req.clone({
      setHeaders: { 'Content-Type': 'application/json;charset=utf-8' },
    }),
  );
};
