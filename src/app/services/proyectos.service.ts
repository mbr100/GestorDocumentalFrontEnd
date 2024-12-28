import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {CrearProyecto, ListarProyecto} from '../models/proyecto.model';

@Injectable({
    providedIn: 'root'
})
export class ProyectosService {
    private baseUrl: string = environment.apiUrl;
    private apiProyectos: string = environment.apiProyectos

    constructor(private httpClient: HttpClient) {}

    public listarProyectos(): Observable<ListarProyecto[]> {
        console.log('listarProyectos');
        return this.httpClient.get(`${this.baseUrl}/${this.apiProyectos}/listarTodosProyectos`).pipe(map((data: any) => <ListarProyecto[]>data));
    }

    public editarProyecto(proyecto: ListarProyecto): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}/${this.apiProyectos}/actualizarProyecto`, proyecto);
    }

    public crearProyecto(proyecto: CrearProyecto): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/${this.apiProyectos}`, proyecto);
    }

    public listarProyectosEmpleado(idEmpleado: string): Observable<ListarProyecto[]> {
        return this.httpClient.get(`${this.baseUrl}/${this.apiProyectos}/listarproyectos/${idEmpleado}`).pipe(map((data: any) => <ListarProyecto[]>data));
    }

    public documentosProyectos(idProyecto: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/${this.apiProyectos}/proyecto/${idProyecto}/documentos`);
    }
}
