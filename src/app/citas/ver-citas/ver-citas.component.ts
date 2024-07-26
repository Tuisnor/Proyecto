import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/citas.service';

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css']
})
export class VerCitasComponent implements OnInit {
  citas: any[] = [];
  errorMessage: string | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas(): void {
    this.citaService.getCitasByUsuario().subscribe(
      data => {
        this.citas = data;
        console.log('Citas cargadas:', this.citas); // Añade esto para verificar los datos recibidos
      },
      error => {
        this.errorMessage = 'Error al cargar las citas. Por favor, intente nuevamente.';
        console.error('Error al cargar las citas:', error);
      }
    );
  }
}