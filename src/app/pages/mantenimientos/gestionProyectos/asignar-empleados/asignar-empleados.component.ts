import {Component, Input, OnInit} from '@angular/core';
import {ListarProyecto} from '../../../../models/proyecto.model';
import {EmpleadosService} from '../../../../services/empleados.service';
import {FormsModule} from '@angular/forms';
import {EmpleadoProyectoDTO} from '../../../../models/empleado.model';
import {ProyectosService} from '../../../../services/proyectos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-asignar-empleados',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './asignar-empleados.component.html',
    styles: ``
})
export class AsignarEmpleadosComponent implements OnInit {
    @Input()
    public proyecto!: ListarProyecto;
    public empleados: EmpleadoProyectoDTO[]
    public gestorExpertos!: EmpleadoProyectoDTO;
    public gestorProyectos!: EmpleadoProyectoDTO;
    public comercial!: EmpleadoProyectoDTO;

    constructor(private empleadoService: EmpleadosService, private proyectoService: ProyectosService) {
        this.empleados = [];
    }

    public ngOnInit(): void {
        this.empleadoService.getEmpleados().subscribe({
            next: (empleados: EmpleadoProyectoDTO[]) => {
                this.empleados = empleados;
                // Asigna a gestorProyectos, gestorExpertos y comercial después de cargar `empleados`
                this.proyecto.empleadoProyecto.forEach((empleadoProyecto) => {
                    if (empleadoProyecto.rol === 'Gestor de proyectos') {
                        this.gestorProyectos = this.empleados.find(e => e.nombre === empleadoProyecto.nombre) || empleadoProyecto;
                    }
                    if (empleadoProyecto.rol === 'Gestor de expertos') {
                        this.gestorExpertos = this.empleados.find(e => e.nombre === empleadoProyecto.nombre) || empleadoProyecto;
                    }
                    if (empleadoProyecto.rol === 'Comercial') {
                        this.comercial = this.empleados.find(e => e.nombre === empleadoProyecto.nombre) || empleadoProyecto;
                    }
                });
            },
            error: (error) => {
                console.log("Error al cargar empleados:", error);
            }
        });
    }

    public empleadoMostrar(rol: String): EmpleadoProyectoDTO[] {
        return this.empleados.filter(empleado => empleado.rol === rol);
    }

    public asignarEmpleados(): void {
        this.proyecto.empleadoProyecto = [];
        if (this.gestorProyectos != null) {
            this.proyecto.empleadoProyecto.push(this.gestorProyectos);
        }
        if (this.gestorExpertos != null) {
            this.proyecto.empleadoProyecto.push(this.gestorExpertos);
        }
        if (this.comercial != null) {
            this.proyecto.empleadoProyecto.push(this.comercial);
        }
        this.proyectoService.editarProyecto(this.proyecto).subscribe({
            next: (response) => {
                this.mostrarMensaje(response.status, 'Proyecto actualizado', response.message);
            },
            error: (error) => {
                this.mostrarMensaje(error.error.status, 'Error al actualizar proyecto', error.error.message);
            }
        });
    }

    private mostrarMensaje(tipo: 'success' | 'error', titulo: string, mensaje: string): void {
        Swal.fire({
            icon: tipo,
            title: titulo,
            text: mensaje
        }).then();
    }
}
