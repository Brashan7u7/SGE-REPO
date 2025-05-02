import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
  role: string;
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  // Subject para almacenar el token
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(null); // Nuevo subject para el rol
  public role$ = this.roleSubject.asObservable(); // Observable para el rol

  private idSubject = new BehaviorSubject<number | null>(null); // Nuevo subject para el id
  public id$ = this.idSubject.asObservable(); // Observable para el id

  private nombreSubject = new BehaviorSubject<string | null>(null); // Nuevo subject para el id
  public nombre$ = this.nombreSubject.asObservable(); // Observable para el id

  // Subject para el estado de la sesión (true = autenticado, false = no autenticado)
  private sessionStatusSubject = new BehaviorSubject<boolean>(false);
  public sessionStatus$ = this.sessionStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    // Recuperar datos almacenados en sessionStorage o localStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const id = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : null;
    const nombre = sessionStorage.getItem('nombre');

    this.tokenSubject.next(token);
    this.roleSubject.next(role);
    this.idSubject.next(id);
    this.nombreSubject.next(nombre);

    this.updateSessionStatus(!!token); // Emitir true solo si hay un token
  }

  login(correo: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', { correo, contrasena }).pipe(
      tap((response) => {
        if (response && response.access_token) {
          this.tokenSubject.next(response.access_token);
          this.roleSubject.next(response.role);
          this.idSubject.next(response.id);
          this.nombreSubject.next(response.nombre);

          sessionStorage.setItem('token', response.access_token);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('id', response.id.toString());
          sessionStorage.setItem('nombre', response.nombre);

          this.updateSessionStatus(true);
        }
      }),
    );
  }

  // Método para actualizar el estado de la sesión
  updateSessionStatus(status: boolean): void {
    this.sessionStatusSubject.next(status);
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.getValue();
  }

  logout(): void {
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.idSubject.next(null);

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');

    this.updateSessionStatus(false);
  }

  getToken(): string | null {
    const token = this.tokenSubject.getValue();

    return token;
  }

  getRole(): string | null {
    const role = this.roleSubject.getValue();

    return role;
  }
  getNombre(): string | null {
    const nombre = this.nombreSubject.getValue();
    return nombre;
  }

  getId(): number | null {
    const id = this.idSubject.getValue();

    return id;
  }
}
