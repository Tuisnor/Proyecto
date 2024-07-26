import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response); // Muestra la respuesta en la consola
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.redirectBasedOnRole(response.token);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null); // Devuelve un observable vacío en caso de error
      })
    );
  }
  register(
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    password: string,
    fechaNacimiento: string,
    genero: string,
    direccion: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { 
      nombre, 
      apellido, 
      telefono, 
      email, 
      password,
      fechaNacimiento,
      genero,
      direccion
    }).pipe(
      tap(response => {
        console.log('Register response:', response); // Muestra la respuesta en la consola
        // Verificar que la respuesta tenga la estructura correcta
        if (response && response.user) {
          console.log('User registered successfully:', response.user);
        } else {
          console.error('Unexpected response structure:', response);
          // Manejar el caso de una estructura de respuesta inesperada
          throw new Error('Unexpected response structure');
        }
      }),
      catchError(error => {
        console.error('Register error:', error);
        console.error('Error status:', error.status); // Imprime el estado del error
        console.error('Error body:', error.error); // Imprime el cuerpo del error
        // Devuelve un mensaje de error genérico
        return of({ message: 'Error al registrarse. Inténtalo de nuevo.' });
      })
    );
  }

  private redirectBasedOnRole(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded token payload:', payload); 
      const roleIds = payload.roleIds || []; 

      if (roleIds.includes(1)) { 
        this.router.navigate(['/citas/citas']);
      } else if (roleIds.includes(2)) { 
        this.router.navigate(['/citas']);
      } else if (roleIds.includes(3)) { 
        this.router.navigate(['/citas']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
