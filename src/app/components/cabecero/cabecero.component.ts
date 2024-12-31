import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

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
    constructor(private router: Router) {
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

    cerrarMenuDropdown() {
        // Busca el dropdown abierto y lo cierra
        const dropdown = document.querySelector('#proyectosDesplegable');
        const instance = bootstrap.Dropdown.getInstance(dropdown);
        if (instance) {
            instance.hide();
        }
    }
}
