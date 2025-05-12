import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthAPIAdaptorService {
  adapt(data: any): { message: string; token: string; userEmail: string } {
    return {
      message: data.message ?? '',
      token: data.token ?? '',
      userEmail: data.user?.email ?? '',
    };
  }
}
