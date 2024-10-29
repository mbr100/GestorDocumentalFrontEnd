import {Component, OnInit} from '@angular/core';
import {EmpleadoDTO} from '../../../../models/empleado.model';
import {EmpleadosService} from '../../../../services/empleados.service';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RolesService} from '../../../../services/roles.service';
import {Rol} from '../../../../models/rol.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
  templateUrl: './empleados.component.html',
  styles: ``
})
export class EmpleadosComponent implements OnInit {
    public empleados: EmpleadoDTO[];
    public anadirEmpleado: boolean;
    public editarEmpleado: boolean;
    public formEmpleado: FormGroup;
    public roles: Rol[];
    public empleado: EmpleadoDTO

    public constructor(private empleadosService: EmpleadosService, private formBuilder: FormBuilder, private rolService: RolesService) {
        this.empleados = [];
        this.roles = [];
        this.anadirEmpleado = false
        this.editarEmpleado = false;
        this.formEmpleado = this.formBuilder.group({
            nombre: ['',Validators.required],
            email: ['', Validators.required],
            telefono: ['', Validators.required],
            rol: ['', Validators.required],
        });
        this.empleado = new EmpleadoDTO(0,'', '', '', '');
    }

    public ngOnInit(): void {
        this.cargarEmpleados();
        this.cargarRoles();
    }

    public nuevoEmpleado(): void {
        this.anadirEmpleado = true;
    }

    public editarInformacionEmpleado(empleado: EmpleadoDTO): void {
        this.editarEmpleado = true;
        this.empleado ={
            idEmpleado: empleado.idEmpleado,
            nombre: empleado.nombre,
            email: empleado.email,
            telefono: empleado.telefono,
            rol: empleado.rol
        }
    }

    public eliminarEmpleado(empleado: EmpleadoDTO): void {
        this.empleadosService.eliminarEmpleado(empleado.idEmpleado).subscribe({
            next: (respone) => {
                this.mostrarMensaje("success","Empleado Eliminado", respone.message);
                this.cargarEmpleados();
            },
            error: (error) => {
                this.mostrarMensaje("error","Error al eliminar", error.error.message);
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

    public guardarNuevoEmpleado(): void {
        this.empleadosService.crearEmpleado(this.formEmpleado.value).subscribe({
            next: (response: any) => {
                this.mostrarMensaje("success","Empleado Creado", response.message);
                this.cargarEmpleados();
                this.anadirEmpleado = false;
                console.log(response);
            },
            error: (error) => {
                this.mostrarMensaje("error","Error al crear", error.error.message);
            }
        });
    }
    public guardarEditarempleado(): void {
        this.empleadosService.editarEmpleado(this.empleado).subscribe({
            next: (response: any) => {
                this.mostrarMensaje("success","Empleado Editado", response.message);
                this.cargarEmpleados();
                this.editarEmpleado = false;
                console.log(response);
            },
            error: (error) => {
                this.mostrarMensaje("error","Error al editar", error.error.message);
            }
        });
    }

    public cancelarNuevoEmpleado(): void {
        this.anadirEmpleado = false;
    }

    private cargarEmpleados(): void {
        this.empleadosService.getEmpleados().subscribe((data: EmpleadoDTO[]) => {
            this.empleados = data;
        });
    }

    private cargarRoles(): void {
        this.rolService.getRoles().subscribe((data: Rol[]) => {
            console.log(data);
            this.roles = data;
        });
    }

    public cancelarEditarmpleado(): void {
        this.editarEmpleado = false;
        this.empleado ={
            idEmpleado: 0,
            nombre: '',
            email: '',
            telefono: '',
            rol: ''
        }
    }
}
