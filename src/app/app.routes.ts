import { Routes } from '@angular/router';
import {RolesComponent} from './pages/mantenimientos/gestionRoles/roles/roles.component';
import {EmpleadosComponent} from './pages/mantenimientos/gestionEmpleados/empleados/empleados.component';
import {ProyectosComponent} from './pages/mantenimientos/gestionProyectos/proyectos/proyectos.component';
import {ListarProyectosComponent} from './pages/proyectos/listar-proyectos/listar-proyectos.component';
import {VerDocumentosProyectoComponent} from './pages/proyectos/ver-documentos-proyecto/ver-documentos-proyecto.component';
import {VerNoConformidadesProyectoComponent} from './pages/proyectos/noConformidades/ver-no-conformidades-proyecto/ver-no-conformidades-proyecto.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
    { path: 'mantenimientos/roles', component: RolesComponent, canActivate: [authGuard] },
    { path: 'mantenimientos/empleados', component: EmpleadosComponent, canActivate: [authGuard]  },
    { path: 'mantenimientos/proyectos', component: ProyectosComponent,canActivate: [authGuard]  },
    { path: 'proyectos', component: ListarProyectosComponent, canActivate: [authGuard] },
    { path: 'proyectos/:idProyecto/documentos', component: VerDocumentosProyectoComponent, canActivate: [authGuard] },
    { path: 'proyectos/:idProyecto/ncs', component: VerNoConformidadesProyectoComponent,canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: ListarProyectosComponent, canActivate: [authGuard] }
];
