import {Component, Input } from '@angular/core';
import {UsuarioProyectoDTO} from '../../../../models/usuario.model';

@Component({
  selector: 'app-mostrar-empleados',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-empleados.component.html',
  styles: ``
})
export class MostrarEmpleadosComponent{
    @Input()
    public empleados!: UsuarioProyectoDTO[];
}
