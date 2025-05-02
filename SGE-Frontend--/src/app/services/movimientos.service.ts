import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const APIURL = '/api/movimientos';
@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  constructor(private _http: HttpClient) {}

  getMisMovimientos(id_usuario: number): Observable<any> {
    return this._http.get<any>(`${APIURL}/${id_usuario}`);
  }
}
