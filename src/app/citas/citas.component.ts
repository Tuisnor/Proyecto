import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EspecialidadService } from '../services/especialidad.service';
import { MedicoService } from '../services/medico.service';
import { HorarioService } from '../services/horario.service';
import { CitaService } from '../services/citas.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citaForm: FormGroup;
  especialidades: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private horarioService: HorarioService,
    private citaService: CitaService
  ) {
    this.citaForm = this.fb.group({
      id_especialidad: [''],
      id_medico: [''],
      fecha: [''],
      hora: ['']
    });
  }

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  loadEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  onEspecialidadChange(): void {
    const idEspecialidad = this.citaForm.get('id_especialidad')?.value;
    if (idEspecialidad) {
      this.medicoService.getMedicosByEspecialidad(idEspecialidad).subscribe(
        (data) => {
          this.medicos = data;
        },
        (error) => {
          console.error('Error al cargar médicos', error);
        }
      );
    }
  }

  onMedicoChange(): void {
    const idMedico = this.citaForm.get('id_medico')?.value;
    const fecha = this.citaForm.get('fecha')?.value;
    if (idMedico && fecha) {
      this.horarioService.getHorariosByMedicoAndDate(idMedico, fecha).subscribe(
        (data) => {
          this.horarios = data;
        },
        (error) => {
          console.error('Error al cargar horarios', error);
        }
      );
    }
  }

  scheduleCita(): void {
    if (this.citaForm.valid) {
      this.citaService.createCita(this.citaForm.value).subscribe(
        response => {
          this.successMessage = 'Cita programada con éxito.';
          this.errorMessage = null;
          this.citaForm.reset(); // Limpiar el formulario si es necesario
        },
        error => {
          this.successMessage = null;
          this.handleError(error);
          console.error('Error al programar la cita:', error);
        }
      );
    }
  }

  private handleError(error: any): void {
    if (error.status === 400) {
      // Error específico del API, como horario no disponible
      this.errorMessage = error.error.message || 'Error en la solicitud. Verifique los datos ingresados.';
    } else if (error.status === 500) {
      // Error interno del servidor
      this.errorMessage = 'Error interno del servidor. Intente nuevamente más tarde.';
    } else {
      // Otros tipos de errores
      this.errorMessage = 'Ocurrió un error desconocido. Por favor, intente nuevamente.';
    }
  }
  
}
