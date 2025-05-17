import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signUp(userData: any): Observable<any> {
    return this.http.post(`${environment.baseApiUrl}/auth/signup`, userData);
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.baseApiUrl}/auth/signin`, credentials);
  }

  forgotPassword(emailData: any): Observable<any> {
    return this.http.post(
      `${environment.baseApiUrl}/auth/forgotPasswords`,
      emailData
    );
  }

  verifyResetCode(resetCodeData: any): Observable<any> {
    return this.http.post(
      `${environment.baseApiUrl}/auth/verifyResetCode`,
      resetCodeData
    );
  }

  resetPassword(resetData: any): Observable<any> {
    return this.http.put(
      `${environment.baseApiUrl}/auth/resetPassword`,
      resetData
    );
  }

  saveUserToken(token: string): void {
    localStorage.setItem('Authorization', token);
  }

  getUserToken(): string | null {
    return localStorage.getItem('Authorization');
  }

  removeUserToken(): void {
    localStorage.removeItem('Authorization');
  }

  isAuthenticated(): boolean {
    return !!this.getUserToken();
  }
}
