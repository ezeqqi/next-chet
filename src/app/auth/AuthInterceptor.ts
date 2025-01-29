import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './AuthService';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const openEndpoints = ['/auth/login', '/auth/register'];
  if (openEndpoints.some((endpoint) => req.url.includes(endpoint))) {
    return next(req);
  }

  console.log('has token', token);
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.clearToken();
          console.log('Unauthorized - Token cleared');
        }
        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
