import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestListResponse } from '../interfaces/RequestList/RequestList.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);
  private apiUrl = 'https://demo2.engazhr.org/engaz_staging/api';

  getRequests(
    status: number[],
    skip: number,
    take: number
  ): Observable<RequestListResponse> {
    return this.http.post<RequestListResponse>(`${this.apiUrl}/request/list`, {
      status,
      skip,
      take,
    });
  }
}
