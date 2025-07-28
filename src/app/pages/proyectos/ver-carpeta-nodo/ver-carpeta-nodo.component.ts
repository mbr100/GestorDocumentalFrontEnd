import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {DocumentosService} from '../../../services/documentos.service';
import Swal from 'sweetalert2';
import {RecargarCarperaDocumentoService} from '../../../services/recargar-carpera-documento.service';
import {AuthService} from '../../../services/authService.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ver-carpeta-nodo',
  standalone: true,
    imports: [
        NgClass
    ],
  templateUrl: './ver-carpeta-nodo.component.html',
  styleUrl: './ver-carpeta-nodo.component.css'
})
export class VerCarpetaNodoComponent {
    @Input() public nodo: any;
    @Input() public idProyecto: string;
    @Input() public nombreCarpetaAlojada: string;
    @Input() public rutaPadre: string; // Nueva propiedad para recibir la ruta del padre

    public isDragOver: boolean;

    public gestionarDocumento: boolean;

    public constructor(private documentosService: DocumentosService, private recargar: RecargarCarperaDocumentoService, private authService: AuthService,
                       private http: HttpClient) {
        this.isDragOver = false; // Inicializa isDragOver en false
        this.idProyecto = '';
        this.nombreCarpetaAlojada = '';
        this.rutaPadre = '';
        this.gestionarDocumento = authService.isGestor();
    }

    public get rutaCompleta(): string {
        return `${this.rutaPadre}/${this.nodo.nombre}`;
    }

    public onDragOver(event: DragEvent): void {
        event.preventDefault(); // Evita el comportamiento por defecto
        event.stopPropagation(); // Detiene la propagación del evento
        if (this.nodo.tipo !== 'fichero') { // Solo se aplica a carpetas
            if (this.nodo.nombre !== "Aceptado" && this.nodo.nombre !== "Rechazado") {
                this.isDragOver = true; // Activa el estilo de arrastre
            }
        }
    }

    public onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.nodo.tipo !== 'fichero') {// Solo se aplica a carpetas
            if (this.nodo.nombre !== "Aceptado" && this.nodo.nombre !== "Rechazado") {
                this.isDragOver = false; // Desactiva el estilo de arrastre
            }
        }
    }

    public onDrop(event: DragEvent, folderName: string): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false; // Desactiva el estilo de arrastre al soltar

        const files = event.dataTransfer?.files;
        if (this.nodo.nombre !== "Aceptado" && this.nodo.nombre !== "Rechazado") {
            if (files && files.length > 0 && this.nodo.tipo !== 'fichero') {
                // Lógica para subir archivos
                this.uploadFiles(files, folderName);
            }
        }
    }

    public uploadFiles(files: FileList, nombreCarpeta: string): void {
        Array.from(files).forEach(file => {
            this.documentosService.subirDocumento(file, nombreCarpeta, this.idProyecto).subscribe({
                next: (response) => {
                    this.mostrarMensaje(response.status, 'Documento subido', response.message);
                    this.recargar.recargarEvento.emit();

                },
                error: (error) => {
                    this.mostrarMensaje(error.error.status, 'Error al subir documento', error.error.message);
                }
            });
        });
    }

    private mostrarMensaje(tipo: 'success' | 'error', titulo: string, mensaje: string): void {
        Swal.fire({
            icon: tipo,
            title: titulo,
            text: mensaje,
            showConfirmButton: true,
        }).then();
    }

    public aceptarDocumento(nodo: any): void {
        this.documentosService.aceptarDocumento(nodo.nombre, this.idProyecto, this.nombreCarpetaAlojada).subscribe({
            next: (response) => {
                this.mostrarMensaje(response.status, 'Documento aceptado', response.message);
                this.recargar.recargarEvento.emit();
            },
            error: (error) => {
                this.mostrarMensaje(error.error.status, 'Error al aceptar documento', error.error.message);
            }
        });
    }

    public rechazarDocumento(nodo: any): void {
        this.documentosService.rechazarDocumento(nodo.nombre, this.idProyecto, this.nombreCarpetaAlojada).subscribe({
            next: (response) => {
                this.mostrarMensaje(response.status, 'Documento Rechazado', response.message);
                this.recargar.recargarEvento.emit();
            },
            error: (error) => {
                this.mostrarMensaje(error.error.status, 'Error al Rechazar documento', error.error.message);
            }
        });
    }


    public descargarArchivo(nodo: any): void {
        const url = `http://localhost:8080/api/documentos/descargar`;
        console.log(this.idProyecto);

        const body = {
            nombreArchivo: nodo.nombre,
            ruta: this.idProyecto + this.rutaCompleta
        };

        // Realiza la petición POST con el cuerpo
        this.http.post(url, body, { responseType: 'blob' }).subscribe((response) => {
            const blob = new Blob([response], { type: response.type });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = nodo.nombre;
            link.click();
            window.URL.revokeObjectURL(link.href);
        });
    }
}
