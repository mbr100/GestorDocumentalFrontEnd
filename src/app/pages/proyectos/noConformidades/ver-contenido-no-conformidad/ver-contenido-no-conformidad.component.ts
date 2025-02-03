import {Component, Input, OnDestroy, OnInit, output, Output} from '@angular/core';
import {nuevaRespuestaNC, PuntosNoConformidadDto} from '../../../../models/noConformidad.model';
import {Editor, NgxEditorModule, Toolbar} from 'ngx-editor';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {NoConformidadService} from '../../../../services/no-conformidad.service';
import Swal from 'sweetalert2';
import {constantes} from '../../../../../environments/environment';
import {Usuario} from '../../../../models/usuario.model';
import {AuthService} from '../../../../services/authService.service';

@Component({
  selector: 'app-ver-contenido-no-conformidad',
  standalone: true,
    imports: [
        NgxEditorModule,
        FormsModule,
        NgClass
    ],
  templateUrl: './ver-contenido-no-conformidad.component.html',
  styleUrl: './ver-contenido-no-conformidad.component.css'
})
export class VerContenidoNoConformidadComponent implements OnInit,OnDestroy {
    @Input() puntoNCSeleccionado!: PuntosNoConformidadDto | null;
    public puntoNCRespondido = output<boolean>();
    public editor: Editor;
    public respuestaNoConformidad: string;
    public toolbar: Toolbar;
    protected estadoCerrada: string;
    public usuario: Usuario | null;
    public rolCliente = constantes.ROL_CLIENTE;

    constructor(private noConformidadService: NoConformidadService, private Auth: AuthService) {
        this.editor = new Editor({
            history: true,
            keyboardShortcuts: true,
        });
        this.toolbar= [
            ['bold', 'italic'],
            ['ordered_list', 'bullet_list'],
            [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
            ['link', 'image'],
            ['align_left', 'align_center', 'align_right', 'align_justify'],
            ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
            ['undo', 'redo'],
        ];
        this.respuestaNoConformidad = '';
        this.estadoCerrada = constantes.ESTADO_CERRADA;
        this.usuario = this.Auth.getUsuario();
    }

    ngOnInit(): void {
        this.editor = new Editor();
        this.editor.commands.insertNewLine();
    }

    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }

    public guardarRespuesta(): void {
        const contenido = new nuevaRespuestaNC(this.puntoNCSeleccionado!.id, this.respuestaNoConformidad);
        console.log(contenido);
        this.noConformidadService.responderNoConformidad(contenido).subscribe({
            next: () => {
                this.puntoNCRespondido.emit(true);
            },
            error: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al responder la no conformidad',
                    text: 'Por favor, intentelo de nuevo'
                }).then();
            }
        });
    }

    public cerrarPuntoNC() {
        console.log('cerrar punto');
        this.noConformidadService.cerrarPuntoNoConformidad(this.puntoNCSeleccionado!.id).subscribe({
            next: () => {
                this.puntoNCRespondido.emit(true);
            },
            error: err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al responder la no conformidad',
                    text: 'Por favor, intentelo de nuevo'
                }).then();
            }
        });
    }
}
