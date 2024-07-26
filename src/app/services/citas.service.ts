import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:5000/api/citas';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createCita(cita: any): Observable<any> {
    const token = this.authService.getToken(); // Obtiene el token almacenado
  
    console.log('Token utilizado:', token); // Imprime el token para verificar
  
    // Configura las cabeceras con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(this.apiUrl, cita, { headers });
  }
  getCitasByUsuario(): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      tap(data => console.log('Datos recibidos:', data)), // Añade esto para verificar la respuesta
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }
}