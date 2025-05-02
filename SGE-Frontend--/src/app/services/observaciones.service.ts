import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const APIURL = '/api/observaciones';

@Injectable({
  providedIn: 'root',
})
export class ObservacionesService {
  constructor(private _http: HttpClient) {}

  createObservacion(observacion: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(`${APIURL}`, observacion, { headers });
  }

  getObservaciones(id_expediente: number): Observable<any> {
    return this._http.get(`${APIURL}/expediente/${id_expediente}`);
  }
}
