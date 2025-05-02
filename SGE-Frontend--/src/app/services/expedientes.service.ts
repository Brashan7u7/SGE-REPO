import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpedientesService {
  private APIURL = '/api/expedientes';
  constructor(private _http: HttpClient) {}
  getExpedienteById(id: string): Observable<any> {
    return this._http.get<any>(`${this.APIURL}/${id}`);
  }

  getExpedientes(
    page: number = 1,
    limit: number = 10,
    vigencia_documental?: string,
    num_seg_social?: string,
  ): Observable<{ data: any[]; total: number; page: number; lastPage: number }> {
    let url = `${this.APIURL}?page=${page}&limit=${limit}`;

    if (vigencia_documental) {
      url += `&vigencia_documental=${vigencia_documental}`;
    }

    if (num_seg_social) {
      url += `&num_seg_social=${num_seg_social}`;
    }

    return this._http.get<{ data: any[]; total: number; page: number; lastPage: number }>(url);
  }

  getExpedientesnum_seg_social(num_seg_social: string): Observable<any> {
    return this._http.get<any[]>(`/api/search/num_seg_socialocial/${num_seg_social}`);
  }

  createExpediente(expediente: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(`${this.APIURL}`, expediente, { headers });
  }

  updateExpediente(id: string, expediente: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.patch(`${this.APIURL}/${id}`, expediente, { headers });
  }
}
