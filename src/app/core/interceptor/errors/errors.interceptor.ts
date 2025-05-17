// src/app/core/interceptor/errors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      switch (error.status) {
        case 401:
          errorMessage = 'Session expired. Please login again.';
          router.navigate(['/auth/login']);
          break;
        case 403:
          errorMessage = 'Access denied.';
          router.navigate(['/unauthorized']);
          break;
        case 404:
          errorMessage = 'Page not found.';
          router.navigate(['/notfound']);
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
      }

      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 5000,
      });

      return throwError(() => error);
    })
  );
};
