import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas.component';
import { VerCitasComponent } from './ver-citas/ver-citas.component';
import { CitasPrincipalComponent } from './citas-principal/citas-principal.component';

const routes: Routes = [
  {
    path: '',
    component: CitasPrincipalComponent,
    children: [
      { path: 'ver-citas', component: VerCitasComponent },
      { path: 'citas', component: CitasComponent },
      { path: '', redirectTo: 'ver-citas', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
