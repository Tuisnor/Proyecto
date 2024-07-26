import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
    // otros componentes del módulo
  ],
  imports: [
    CommonModule,
    FormsModule, // Añade FormsModule aquí
    AuthRoutingModule
  ]
})
export class AuthModule { }
