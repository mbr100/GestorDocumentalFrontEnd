import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/authService.service';
import {Usuario} from '../../models/usuario.model';

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

    public cargarUsuario(): void {
        this.authService.usuario$.subscribe((usuario) => {
            this.user = usuario!;
        });
    }

    public puedeAdministrar(): boolean {
        return this.user?.rol === "Administrador";
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigateByUrl('/login').then(r => console.log('logout', r));
    }
}
