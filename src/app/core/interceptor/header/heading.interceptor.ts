import { HttpInterceptorFn } from '@angular/common/http';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
