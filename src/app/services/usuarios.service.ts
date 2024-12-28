import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {usuarioDTO} from '../models/usuario.model';
import {map, Observable} from 'rxjs';
import {Responde} from '../models/eliminar-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    private baseUrl: string = environment.apiUrl;
    private apiUsuarios: string = environment.apiUsuarios

    public constructor(private http: HttpClient) { }

    public getUsuario(): Observable<usuarioDTO[]> {
        return this.http.get(`${this.baseUrl}/${this.apiUsuarios}`).pipe(map((data: any) => <usuarioDTO[]>data));
    }

    public eliminarUsuario(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${this.apiUsuarios}/${id}`);
    }

    public crearUsuario(value: usuarioDTO): Observable<Responde> {
        return this.http.post<Responde>(`${this.baseUrl}/${this.apiUsuarios}`, value);
    }

    public editarUsuario(usuario: usuarioDTO): Observable<Responde> {
        return this.http.put<Responde>(`${this.baseUrl}/${this.apiUsuarios}/${usuario.idUsuario}`, usuario);
    }

}
