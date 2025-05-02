import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const APIURL = '/api/usuarios';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private _http: HttpClient) {}
  getUsuarios(): Observable<any> {
    return this._http.get<any[]>(APIURL);
  }
  createUsuario(usuario: any): Observable<any> {
    return this._http.post(APIURL, usuario);
  }

  updateUsuario(id: number, usuario: any): Observable<any> {
    return this._http.patch(`${APIURL}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this._http.delete(`${APIURL}/${id}`);
  }
}
