import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    constructor(private router: Router) {}

    public irGestionRoles(): void {
        this.router.navigateByUrl('/mantenimientos/roles').then(r => console.log('irGestionRoles', r));
    }

    public irGestionEmpleados(): void {
        this.router.navigateByUrl('/mantenimientos/empleados').then(r => console.log('irGestionRoles', r));

    }

    public irGestionProyectos(): void {
        this.router.navigateByUrl('/mantenimientos/proyectos').then(r => console.log('irGestionRoles', r));
    }

    public irProyectos(): void {
        this.router.navigateByUrl('/proyectos').then(r => console.log('irGestionRoles', r));
    }
}
