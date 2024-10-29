import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EmpleadoDTO} from '../models/empleado.model';
import {map, Observable} from 'rxjs';
import {Responde} from '../models/eliminar-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
    private baseUrl: string = environment.apiUrl;
    private apiEmpleados: string = environment.apiEmpleados

    public constructor(private http: HttpClient) { }

    public getEmpleados(): Observable<EmpleadoDTO[]> {
        return this.http.get(`${this.baseUrl}/${this.apiEmpleados}`).pipe(map((data: any) => <EmpleadoDTO[]>data));
    }

    public eliminarEmpleado(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${this.apiEmpleados}/${id}`);
    }

    public crearEmpleado(value: EmpleadoDTO): Observable<Responde> {
        return this.http.post<Responde>(`${this.baseUrl}/${this.apiEmpleados}`, value);
    }

    public editarEmpleado(empleado: EmpleadoDTO): Observable<Responde> {
        return this.http.put<Responde>(`${this.baseUrl}/${this.apiEmpleados}/${empleado.idEmpleado}`, empleado);
    }

}
