import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NoConformidadDto, nuevaRespuestaNC} from '../models/noConformidad.model';

@Injectable({
  providedIn: 'root'
})
export class NoConformidadService {
    private baseUrl: string = environment.apiUrl;
    private apiNcs: string = environment.apiNcs

    constructor(private httpClient: HttpClient) { }

    public obtenerNoConformidadProyecto(idProyecto: string): Observable<NoConformidadDto[]> {
        return this.httpClient.get<NoConformidadDto[]>(`${this.baseUrl}/${this.apiNcs}/proyecto/${idProyecto}`);
    }

    public responderNoConformidad(nuevaRespuestaNC: nuevaRespuestaNC): Observable<any> {
        return this.httpClient.post<nuevaRespuestaNC>(`${this.baseUrl}/${this.apiNcs}/responder`, nuevaRespuestaNC);
    }

    public cerrarPuntoNoConformidad(idPuntoNoConformidad: number): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/${this.apiNcs}/cerrarPuntoNc/${idPuntoNoConformidad}`);
    }


    public crearPuntoNoConformidad(idProyecto: string | null, idNoConformidad: number | null, nuevoPuntoNC: String): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/${this.apiNcs}/crearPuntoNoConformidad`, {
            idProyecto,
            idNoConformidad,
            nuevoPuntoNC
        });
    }

    crearNoConformidad(idProyecto: string, tipo: string) {
        return this.httpClient.post(`${this.baseUrl}/${this.apiNcs}/crearNoConformidad`, {
            idProyecto,
            tipo
        });
    }
}
