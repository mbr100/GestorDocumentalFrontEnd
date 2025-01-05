import { Component, OnInit } from '@angular/core';
import { ListarProyectoEmpleado } from '../../../models/proyecto.model';
import { ProyectosService } from '../../../services/proyectos.service';
import { AuthService } from '../../../services/authService.service';
import { Router } from '@angular/router';
import {Usuario} from '../../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './listar-proyectos.component.html',
  styles: ``
})
export class ListarProyectosComponent implements OnInit {
    public listaProyectos: ListarProyectoEmpleado[];

    public constructor(private proyectosService: ProyectosService, private usuarioService: AuthService, private router: Router) {
        this.listaProyectos = [];
    }

    public ngOnInit(): void {
        this.proyectosService.listarProyectosEmpleado().subscribe({
            next: (proyectos: ListarProyectoEmpleado[]) => {
                this.listaProyectos = proyectos;
            },
            error: (err) => {
                Swal.fire('Error', 'No se han podido cargar los proyectos' + err, 'error').then();
            }
        });
    }

    public verDocumentosProyecto(idProyecto: string) {
        this.router.navigateByUrl(`/proyectos/${idProyecto}/documentos`).then();
    }
}
