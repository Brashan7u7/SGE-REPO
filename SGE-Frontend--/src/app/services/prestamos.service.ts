import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const APIURL = '/api/prestamos/crearprestamo';

@Injectable({
  providedIn: 'root',
})
export class PrestamosService {
  constructor(private _http: HttpClient) {}
  createPrestamo(prestamo: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(APIURL, prestamo, { headers });
  }

  verPrestamos(): Observable<any> {
    return this._http.get<any>('/api/prestamos');
  }

  getPrestamos(id: number): Observable<any> {
    return this._http.get<any>(`/api/prestamos/todos/${id}`);
  }

  ActualizarPrestamo(id_expediente: number, updatePrestamoDto: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.patch(`/api/prestamos/${id_expediente}`, updatePrestamoDto, { headers });
  }

  AutorizarPrestamo(id_expediente: number, updatePrestamoDto: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.patch(`/api/prestamos/autorizar/${id_expediente}`, updatePrestamoDto, { headers });
  }
}
