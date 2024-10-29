import { Component, OnInit } from '@angular/core';
import { ListarProyectoEmpleado } from '../../../models/proyecto.model';
import { ProyectosService } from '../../../services/proyectos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './listar-proyectos.component.html',
  styles: ``
})
export class ListarProyectosComponent implements OnInit {
    public listaProyectos: ListarProyectoEmpleado[];

    public constructor(private proyectosService: ProyectosService, private usuarioService: UsuarioService, private router: Router) {
        this.listaProyectos = [];
    }

    public ngOnInit(): void {
        this.proyectosService.listarProyectosEmpleado(this.usuarioService.idUsuario).subscribe((proyectos: ListarProyectoEmpleado[]) => {
            this.listaProyectos = proyectos;
        });
    }

    public verDocumentosProyecto(idProyecto: string) {
        this.router.navigateByUrl(`/proyectos/${idProyecto}/documentos`);
    }
}
