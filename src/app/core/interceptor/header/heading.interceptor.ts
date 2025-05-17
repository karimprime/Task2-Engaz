// src/app/core/interceptor/header/heading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformService } from '../../../shared/services/platform/platform.service';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const platformService = inject(PlatformService);
  const router = inject(Router);

  // Skip adding headers for non-API requests
  if (!req.url.includes('/api/')) {
    return next(req);
  }

  // Get token safely
  const Authorization = platformService.isBrowser()
    ? localStorage.getItem('Authorization') || ''
    : '';

  // Prepare headers
  const headers: Record<string, string> = {
    Authorization: `Bearer ${Authorization}`,
    lang: 'en',
    branches: '[1]', // Note: Your API expects array syntax in string
    subdomain: 'attend1',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Clone request with new headers
  const authReq = req.clone({ setHeaders: headers });

  return next(authReq);
};
