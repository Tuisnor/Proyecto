import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { VerCitasComponent } from './ver-citas/ver-citas.component';
import { CitasPrincipalComponent } from './citas-principal/citas-principal.component';

@NgModule({
  declarations: [
    CitasComponent,
    VerCitasComponent,
    CitasPrincipalComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class CitasModule { }
