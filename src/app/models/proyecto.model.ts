import {UsuarioProyectoDTO} from './usuario.model';

export class CrearProyecto {
    titulo: string;
    ano: number;
    cliente: string;
    nombreEmpleado: string;

    constructor(titulo: string, ano: number, cliente: string, nombreEmpleado: string) {
        this.titulo = titulo;
        this.ano = ano;
        this.cliente = cliente;
        this.nombreEmpleado = nombreEmpleado;
    }
}

export class ListarProyecto {
    idProyecto: string;
    titulo: string;
    ano: number;
    cliente: string;
    empleadoProyecto: UsuarioProyectoDTO[];

    constructor(idProyecto: string, titulo: string, ano: number, cliente: string, empleadoProyecto: UsuarioProyectoDTO[]) {
        this.idProyecto = idProyecto;
        this.titulo = titulo;
        this.ano = ano;
        this.cliente = cliente;
        this.empleadoProyecto = empleadoProyecto;
    }
}

export class ListarProyectoEmpleado {
    idProyecto: string;
    titulo: string;
    ano: number;
    cliente: string;

    constructor(idProyecto: string, titulo: string, ano: number, cliente: string) {
        this.idProyecto = idProyecto;
        this.titulo = titulo;
        this.ano = ano;
        this.cliente = cliente;
    }
}
