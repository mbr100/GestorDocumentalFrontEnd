import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
    private baseUrl: string = environment.apiUrl;
    private apiDocumentos: string = environment.apiDocumentos

    constructor(private httpCliente: HttpClient) { }

    public subirDocumento(documento: File, carpeta: string, idProyecto: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('documento', documento);
        formData.append('carpeta', carpeta);
        return this.httpCliente.put(`${this.baseUrl}/${this.apiDocumentos}/${idProyecto}`, formData);
    }

    public aceptarDocumento(documento: string, idProyecto: string, ruta: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ruta', ruta);
        formData.append('documento', documento);
        return this.httpCliente.put(`${this.baseUrl}/${this.apiDocumentos}/${idProyecto}/aceptar`, formData);
    }

    public rechazarDocumento(documento: string, idProyecto: string, ruta: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ruta', ruta);
        formData.append('documento', documento);
        return this.httpCliente.put(`${this.baseUrl}/${this.apiDocumentos}/${idProyecto}/rechazar`, formData);
    }
}
