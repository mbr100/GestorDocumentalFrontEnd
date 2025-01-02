import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/authService.service';
import {Usuario} from '../../models/usuario.model';

declare var bootstrap: any; // Importación para usar Bootstrap

@Component({
  selector: 'app-cabecero',
  standalone: true,
    imports: [
        RouterLink

    ],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent {
    public user: Usuario | undefined;

    constructor(private router: Router, private authService: AuthService) {
        this.cargarUsuario();
    }

    public irGestionRoles(): void {
        this.router.navigateByUrl('/mantenimientos/roles').then(r => console.log('irGestionRoles', r));
    }

    public irGestionUsuarios(): void {
        this.router.navigateByUrl('/mantenimientos/usuarios').then(r => console.log('irGestionRoles', r));

    }

    public irGestionProyectos(): void {
        this.router.navigateByUrl('/mantenimientos/proyectos').then(r => console.log('irGestionRoles', r));
    }

    public cerrarMenuDropdown(): void {
        // Busca el dropdown abierto y lo cierra
        const dropdown = document.querySelector('#proyectosDesplegable');
        const instance = bootstrap.Dropdown.getInstance(dropdown);
        if (instance) {
            instance.hide();
        }
    }

    public cargarUsuario(): void {
        this.authService.usuario$.subscribe((usuario) => {
            this.user = usuario!;
        });
    }

    public puedeAdministrar(): boolean {
        console.log(this.user?.rol);
        return this.user?.rol === "Administrador";
    }
}
