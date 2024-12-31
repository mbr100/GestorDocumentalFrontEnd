import {Component, OnInit} from '@angular/core';
import { RolesService } from '../../../../services/roles.service';
import { editarRolDTO, Rol } from '../../../../models/rol.model';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
  templateUrl: './roles.component.html',
  styles: ``
})
export class RolesComponent implements OnInit {
    public roles: Rol[];
    public nRol: Rol;
    public darDeAltaRol: boolean;
    public tipoRol: string[];

    constructor(private _rolesService: RolesService) {
        this.roles = [];
        this.nRol = new Rol('', '');
        this.darDeAltaRol = false;
        this.tipoRol = ['ADMINISTRADOR', 'EMPLEADO','CLIENTE'];
    }

    public ngOnInit(): void {
        this._rolesService.getRoles().subscribe((data: Rol[]) => {
            this.roles = data;
        });
    }

    public eliminarRol(rol: Rol): void {
        this._rolesService.deleteRol(rol).subscribe( {
            next: (data) => {
                this.mostrarMensajeExito(data.message);
                this.roles = this.roles.filter((rolItem: Rol) => rolItem.rol !== rol.rol);

            },
            error: (error: any) =>{
                console.log(error);
                this.mostrarMensajeError(error.error.message)
            }
        });
    }

    public editarRol(rol: Rol): void {
        Swal.fire({
            title: 'Editar Rol',
            input: 'text',
            inputLabel: 'Nuevo Rol'
        }).then((result) => {
            const editarRol = new editarRolDTO(rol.rol, result.value);
            this._rolesService.editarRol(editarRol).subscribe({
                next: (data) => {
                    console.log(data);
                    this.mostrarMensajeExito('Rol editado correctamente');
                    this.roles = this.roles.map((rolItem: Rol) => rolItem === rol ? { ...rolItem, rol: result.value } : rolItem);
                },
                error: (error: any) => {
                    console.log(error);
                    this.mostrarMensajeError(error.error.message)
                }
            });
        });
    }

    public nuevoRol(): void {
        this.darDeAltaRol = true;
    }

    private mostrarMensajeExito(mensaje: string): void {
        Swal.fire({
            icon: 'success',
            title: 'Operación exitosa',
            text: mensaje
        }).then();
    }

    private mostrarMensajeError(mensaje: string): void {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje
        }).then();
    }


    public cancelar(): void {
        this.darDeAltaRol = false;
    }

    public guardarRol(): void {
        this._rolesService.nuevoRol(this.nRol).subscribe({
            next: (data) => {
                this.mostrarMensajeExito(data.message);
                this.roles.push(this.nRol);
                this.darDeAltaRol = false;
                this.nRol = new Rol('', '');
            },
            error: (error: any) => {
                console.log(error);
                this.mostrarMensajeError(error.error.message)
            }
        })
    }
}
