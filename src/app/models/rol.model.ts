export class Rol {
    rol: String;

    constructor(rol: String) {
        this.rol = rol;
    }
}

export class editarRolDTO {
    antiuguoRol: String;
    nuevoRol: String;

    constructor(antiuguoRol: String, nuevoRol: String) {
        this.antiuguoRol = antiuguoRol;
        this.nuevoRol = nuevoRol;
    }
}
