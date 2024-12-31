import {Component, OnInit} from '@angular/core';
import {usuarioDTO} from '../../../../models/usuario.model';
import {UsuariosService} from '../../../../services/usuarios.service';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RolesService} from '../../../../services/roles.service';
import {Rol} from '../../../../models/rol.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
    public usuarios: usuarioDTO[];
    public anadirUsuario: boolean;
    public editarUsuario: boolean;
    public formUsuario: FormGroup;
    public roles: Rol[];
    public usuario: usuarioDTO

    public constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder, private rolService: RolesService) {
        this.usuarios = [];
        this.roles = [];
        this.anadirUsuario = false
        this.editarUsuario = false;
        this.formUsuario = this.formBuilder.group({
            nombre: ['',Validators.required],
            email: ['', Validators.required],
            telefono: ['', Validators.required],
            password: ['', Validators.required],
            rol: ['', Validators.required],
        });
        this.usuario = new usuarioDTO(0,'', '', '', '');
    }

    public ngOnInit(): void {
        this.cargarUsuario();
        this.cargarRoles();
    }

    public nuevoUsuario(): void {
        this.anadirUsuario = true;
    }

    public editarInformacionUsuario(usuario: usuarioDTO): void {
        this.editarUsuario = true;
        this.usuario ={
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono,
            rol: usuario.rol
        }
    }

    public eliminarUsuario(usuario: usuarioDTO): void {
        this.usuariosService.eliminarUsuario(usuario.idUsuario).subscribe({
            next: (respone) => {
                this.mostrarMensaje("success","Empleado Eliminado", respone.message);
                this.cargarUsuario();
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

    public guardarNuevoUsuario(): void {
        if (this.formUsuario.invalid) {
            this.mostrarMensaje("error","Error al crear", "Por favor llene todos los campos");
        } else {
            this.usuariosService.crearUsuario(this.formUsuario.value).subscribe({
                next: (response: any) => {
                    this.mostrarMensaje("success","Empleado Creado", response.message);
                    this.cargarUsuario();
                    this.anadirUsuario = false;
                    console.log(response);
                },
                error: (error) => {
                    this.mostrarMensaje("error","Error al crear", error.error.message);
                }
            });
        }
    }
    public guardarEditarUsuario(): void {
        this.usuariosService.editarUsuario(this.usuario).subscribe({
            next: (response: any) => {
                this.mostrarMensaje("success","Empleado Editado", response.message);
                this.cargarUsuario();
                this.editarUsuario = false;
                console.log(response);
            },
            error: (error) => {
                this.mostrarMensaje("error","Error al editar", error.error.message);
            }
        });
    }

    public cancelarNuevoUsuario(): void {
        this.anadirUsuario = false;
    }

    private cargarUsuario(): void {
        this.usuariosService.getUsuario().subscribe((data: usuarioDTO[]) => {
            this.usuarios = data;
        });
    }

    private cargarRoles(): void {
        this.rolService.getRoles().subscribe((data: Rol[]) => {
            console.log(data);
            this.roles = data;
        });
    }

    public cancelarEditarUsuario(): void {
        this.editarUsuario = false;
        this.usuario ={
            idUsuario: 0,
            nombre: '',
            email: '',
            telefono: '',
            rol: ''
        }
    }
}
