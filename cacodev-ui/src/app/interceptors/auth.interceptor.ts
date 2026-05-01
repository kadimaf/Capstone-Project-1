import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const notification = inject(NotificationService);
  const token = authService.getAccessToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/api/auth/')) {
        if (!isRefreshing) {
          isRefreshing = true;
          return authService.refreshToken().pipe(
            switchMap(() => {
              isRefreshing = false;
              const newToken = authService.getAccessToken();
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next(retryReq);
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        }
        authService.logout();
      }

      if (error.status === 403) {
        notification.error('You do not have permission to perform this action');
      } else if (error.status === 404) {
        notification.error(error.error?.message || 'Resource not found');
      } else if (error.status === 409) {
        notification.error(error.error?.message || 'Conflict occurred');
      } else if (error.status === 400) {
        notification.error(error.error?.message || 'Invalid request');
      }

      return throwError(() => error);
    })
  );
};
