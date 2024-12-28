export class usuarioDTO {
    idUsuario: number;
    nombre: string;
    email: string;
    telefono: string;
    rol: string;


    constructor(idUsuario: number, nombre: string, email: string, telefono: string, rol: string) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.rol = rol;
    }
}

export class editarUsuarioDTO {
    nombre: string;
    email: string;
    telefono: string;
    rol: string;

    constructor(nombre: string, email: string, telefono: string, rol: string) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.rol = rol;
    }
}

export class UsuarioProyectoDTO {
    nombre: string;
    email: string;
    telefono: string;
    rol: string;

    constructor(nombre: string, email: string, telefono: string, rol: string) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.rol = rol;
    }
}

export class Usuario {
    idUsuario: string;
    nombre: string;
    email: string;
    rol: string;
    auth: boolean;

    constructor(idUsuario: string, nombre: string, email: string, rol: string, auth: boolean) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.auth = auth;
    }
}
