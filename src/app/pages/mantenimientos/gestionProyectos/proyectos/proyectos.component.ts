import {Component, OnInit} from '@angular/core';
import {ListarProyecto} from '../../../../models/proyecto.model';
import {ProyectosService} from '../../../../services/proyectos.service';
import {AsignarEmpleadosComponent} from '../asignar-empleados/asignar-empleados.component';
import {MostrarEmpleadosComponent} from '../mostrar-empleados/mostrar-empleados.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-proyectos',
    standalone: true,
    imports: [
        AsignarEmpleadosComponent,
        MostrarEmpleadosComponent,
        ReactiveFormsModule
    ],
    templateUrl: './proyectos.component.html',
    styles: ``
})
export class ProyectosComponent implements OnInit {
    public listaProyectos: ListarProyecto[];
    public agregarProyecto: boolean;
    public asginarEmpleado: boolean;
    public idProyectoAsignar: string;
    public formProyecto: FormGroup;

    public constructor(private proyectoService: ProyectosService, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
        this.listaProyectos = [];
        this.asginarEmpleado = false
        this.idProyectoAsignar = "";
        this.agregarProyecto = true;
        this.formProyecto = this.formBuilder.group({
            titulo: ['', Validators.required],
            ano: ['', Validators.required],
            cliente: ['', Validators.required],
            nombreEmpleado: [this.usuarioService.nombreUsuario],
        });
    }

    public ngOnInit(): void {
        this.listarProyectos();
    }

    private listarProyectos(): void {
        this.proyectoService.listarProyectos().subscribe((proyectos: ListarProyecto[]) => {
            this.listaProyectos = proyectos;
        });
    }

    public asignarEmpleadosProyecto(proyectoId: string): void {
        this.asginarEmpleado = !this.asginarEmpleado;
        this.idProyectoAsignar = proyectoId;
    }

    public nuevoProyecto(): void {
        this.agregarProyecto = !this.agregarProyecto;
    }

    public guardarProyecto(): void {
        if (this.formProyecto.valid) {
            this.proyectoService.crearProyecto(this.formProyecto.value).subscribe({
                next: respone => {
                    console.log(respone);
                    this.mostrarMensaje(respone.status, 'Proyecto creado', respone.message);
                    this.listarProyectos();
                    this.agregarProyecto = false;
                },
                error: (error) => {
                    console.error(error);
                    this.mostrarMensaje(error.error.status, 'Error', error.error.message);
                }
            });
        }
    }

    private mostrarMensaje(tipo: 'success' | 'error', titulo: string, mensaje: string): void {
        Swal.fire({
            icon: tipo,
            title: titulo,
            text: mensaje
        }).then();
    }
}