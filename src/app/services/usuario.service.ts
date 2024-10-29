import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private _nombreUsuario: string;
    private _idUsuario: number;

    constructor() {
        this._nombreUsuario = 'Mario';
        this._idUsuario = 1;
    }

    get nombreUsuario(): string {
        return this._nombreUsuario;
    }

    get idUsuario(): number {
        return this._idUsuario;
    }
}
