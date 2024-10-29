import {Component, OnInit} from '@angular/core';
import { RolesService } from '../../../../services/roles.service';
import {editarRolDTO, Rol} from '../../../../models/rol.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [],
  templateUrl: './roles.component.html',
  styles: ``
})
export class RolesComponent implements OnInit {
    public roles: Rol[];

    constructor(private _rolesService: RolesService) {
        this.roles = [];
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
                    this.roles = this.roles.map((rolItem: Rol) => rolItem===rol ? { rol: result.value }  : rolItem);
                },
                error: (error: any) => {
                    console.log(error);
                    this.mostrarMensajeError(error.error.message)
                }
            });
        });
    }

    public nuevoRol(): void {
        Swal.fire({
            title: 'Nuevo Rol',
            input: 'text',
            inputLabel: 'Rol'
        }).then((result) => {
            const nuevoRol = new Rol( result.value);
            this._rolesService.nuevoRol(nuevoRol).subscribe({
                next: (data) => {
                    console.log(data);
                    this.mostrarMensajeExito(data.message);
                    this.roles = this.roles.concat(nuevoRol);

                },
                error: (error: any) => this.mostrarMensajeError(error.error.message)
            });
        });
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


}
