import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectosService} from '../../../services/proyectos.service';
import {VerCarpetaNodoComponent} from '../ver-carpeta-nodo/ver-carpeta-nodo.component';
import {RecargarCarperaDocumentoService} from '../../../services/recargar-carpera-documento.service';

@Component({
  selector: 'app-ver-documentos-proyecto',
  standalone: true,
    imports: [
        VerCarpetaNodoComponent
    ],
  templateUrl: './ver-documentos-proyecto.component.html',
  styles: ``
})
export class VerDocumentosProyectoComponent implements OnInit {
    protected idProyecto: string;
    public documentosProyecto: any;

    public constructor(private route: ActivatedRoute, private proyectosService: ProyectosService, private recargarCarpera: RecargarCarperaDocumentoService, private router: Router) {
        this.idProyecto = this.route.snapshot.paramMap.get('idProyecto') || '';
        console.log('idProyecto', this.idProyecto);
    }

    public ngOnInit(): void {
        this.cargarEstructuraProyecto(this.idProyecto);
        this.recargarCarpera.recargarEvento.subscribe(() => {
            this.cargarEstructuraProyecto(this.idProyecto);
        });
    }

    private cargarEstructuraProyecto(idProyecto: string):void {
        this.proyectosService.documentosProyectos(idProyecto).subscribe(data => {
            this.documentosProyecto = data;
            console.log('documentosProyecto', this.documentosProyecto);
        });
    }

    public volverProyectos(): void {
        this.router.navigateByUrl('/proyectos').then(r => console.log('irGestionRoles', r));

    }

    verNoConformidades() {
        this.router.navigateByUrl(`proyectos/${this.idProyecto}/ncs`).then(r => console.log('ir a ncs', r));

    }
}
