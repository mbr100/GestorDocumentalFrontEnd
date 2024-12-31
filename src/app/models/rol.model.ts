export class Rol {
    rol: String;
    tipoRol: String;

    constructor(rol: String, tipoRol: String) {
        this.rol = rol;
        this.tipoRol = tipoRol;
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
