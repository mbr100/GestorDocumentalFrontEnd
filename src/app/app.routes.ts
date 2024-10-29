import { Routes } from '@angular/router';
import { RolesComponent } from './pages/mantenimientos/gestionRoles/roles/roles.component';
import {EmpleadosComponent} from './pages/mantenimientos/gestionEmpleados/empleados/empleados.component';
import {ProyectosComponent} from './pages/mantenimientos/gestionProyectos/proyectos/proyectos.component';
import {ListarProyectosComponent} from './pages/proyectos/listar-proyectos/listar-proyectos.component';
import {VerDocumentosProyectoComponent} from './pages/proyectos/ver-documentos-proyecto/ver-documentos-proyecto.component';

export const routes: Routes = [
    { path: 'mantenimientos/roles', component: RolesComponent },
    { path: 'mantenimientos/empleados', component: EmpleadosComponent },
    { path: 'mantenimientos/proyectos', component: ProyectosComponent },
    { path: 'proyectos', component: ListarProyectosComponent},
    { path: 'proyectos/:idProyecto/documentos', component: VerDocumentosProyectoComponent},
    { path: '', component: ListarProyectosComponent}
];
