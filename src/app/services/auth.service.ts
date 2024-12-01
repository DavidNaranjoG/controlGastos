import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para hacer login
  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  // Método para hacer solicitudes con token
  getProtectedData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.get<any>(`${this.apiUrl}/protected`, { headers });
  }
}
