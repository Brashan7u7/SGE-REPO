import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UmfsService {
  private apiUrl = '/api/search/autocomplete';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    const params = new HttpParams().set('query', query).set('limit', '10').set('offset', '0');
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  searchDelegations(): Observable<any[]> {
    return this.http.get<any[]>('/api/search/delegations');
  }

  searchUmfsByDelegation(delegacion: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/search/delegation/${delegacion}`);
  }
}
