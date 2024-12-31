import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, Observable} from 'rxjs';
import {editarRolDTO, Rol} from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    private baseURL: string = environment.apiUrl;
    private apiRoles: string = environment.apiRoles

    constructor(private http: HttpClient) { }

    public getRoles(): Observable<Rol[]> {
        return this.http.get(`${this.baseURL}/${this.apiRoles}/obtenerRoles`).pipe(map((data: any) => <Rol[]>data));
    }

    public deleteRol(rol: Rol): Observable<any> {
        return this.http.delete(`${this.baseURL}/${this.apiRoles}/eliminarRol/${rol.rol}`);
    }

    public editarRol(rol: editarRolDTO): Observable<any> {
        return this.http.put(`${this.baseURL}/${this.apiRoles}/editarRol`, rol);
    }

    public nuevoRol(nuevoRol: Rol): Observable<any> {
        return this.http.post(`${this.baseURL}/${this.apiRoles}/crearRol`, nuevoRol);

    }

}
