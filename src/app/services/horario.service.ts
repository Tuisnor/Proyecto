import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) { }

  getHorariosByMedicoAndDate(idMedico: number, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/horarios/${idMedico}/${fecha}`);
  }
}
