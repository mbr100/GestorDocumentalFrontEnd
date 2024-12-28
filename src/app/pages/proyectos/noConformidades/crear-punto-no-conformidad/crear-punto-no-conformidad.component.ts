import {Component, EventEmitter, Input, output, Output} from '@angular/core';
import {Editor, NgxEditorModule, Toolbar} from 'ngx-editor';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {NoConformidadService} from '../../../../services/no-conformidad.service';

@Component({
  selector: 'app-crear-punto-no-conformidad',
  standalone: true,
    imports: [
        NgxEditorModule,
        FormsModule
    ],
  templateUrl: './crear-punto-no-conformidad.component.html',
  styles: ``
})
export class CrearPuntoNoConformidadComponent {
    @Input() idProyecto!: string | null;
    @Input() idNoConformidad!: number | null;
    @Output() puntoNoConformidadCreado = new EventEmitter<boolean>();
    @Output() cancelarCreacion = new EventEmitter<boolean>();
    public editor: Editor;
    public toolbar: Toolbar;
    public nuevoPuntoNC: String;

    constructor(private router: Router, private noConformidadesService: NoConformidadService) {
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
        this.nuevoPuntoNC = '';
    }


    guardarPuntoNC() {
        this.noConformidadesService.crearPuntoNoConformidad(this.idProyecto, this.idNoConformidad, this.nuevoPuntoNC).subscribe({
                next: () => {
                    this.puntoNoConformidadCreado.emit(true);
                },
                error: error => {
                    console.error('Error al crear el punto de no conformidad: ', error);
                }
            }
        );
    }

    public cancelar(): void {
        this.cancelarCreacion.emit(true);
    }
}
