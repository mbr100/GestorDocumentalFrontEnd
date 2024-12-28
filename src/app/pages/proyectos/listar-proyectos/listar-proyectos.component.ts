import { Component, OnInit } from '@angular/core';
import { ListarProyectoEmpleado } from '../../../models/proyecto.model';
import { ProyectosService } from '../../../services/proyectos.service';
import { AuthService } from '../../../services/authService.service';
import { Router } from '@angular/router';
import {Usuario} from '../../../models/usuario.model';

@Component({
  selector: 'app-listar-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './listar-proyectos.component.html',
  styles: ``
})
export class ListarProyectosComponent implements OnInit {
    public listaProyectos: ListarProyectoEmpleado[];
    private user: Usuario | undefined;

    public constructor(private proyectosService: ProyectosService, private usuarioService: AuthService, private router: Router) {
        this.listaProyectos = [];
        this.usuarioService.usuario$.subscribe((usuario) => {
            console.log(usuario);
            this.user = usuario!;
        });
    }

    public ngOnInit(): void {
        this.proyectosService.listarProyectosEmpleado(this.user?.idUsuario!).subscribe((proyectos: ListarProyectoEmpleado[]) => {
            this.listaProyectos = proyectos;
        });
    }

    public verDocumentosProyecto(idProyecto: string) {
        this.router.navigateByUrl(`/proyectos/${idProyecto}/documentos`);
    }
}
