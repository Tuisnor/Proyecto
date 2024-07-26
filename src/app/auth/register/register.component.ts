import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  apellido = '';
  telefono = '';
  email = '';
  password = '';
  fechaNacimiento: string = '';
  genero: string = '';
  direccion: string = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (!this.nombre || !this.apellido || !this.telefono || !this.email || !this.password || !this.fechaNacimiento || !this.genero || !this.direccion) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.authService.register(this.nombre, this.apellido, this.telefono, this.email, this.password, this.fechaNacimiento, this.genero, this.direccion).subscribe(
      response => {
        console.log('Register response:', response); // Verifica la respuesta en la consola

        // Verifica la respuesta para asegurar que el usuario fue creado
        if (response && response.user) {
          this.successMessage = 'Registrado con éxito. Redirigiendo al inicio de sesión...';
          setTimeout(() => this.router.navigate(['/login']), 2000); // Redirige después de 2 segundos
        } else {
          this.errorMessage = 'Error al registrar el usuario.';
        }
      },
      error => {
        this.errorMessage = 'Error al registrar el usuario.';
        console.error('Register error:', error);
      }
    );
  }
}
