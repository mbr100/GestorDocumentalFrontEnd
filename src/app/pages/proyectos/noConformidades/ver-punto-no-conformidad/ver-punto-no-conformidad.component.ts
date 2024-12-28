import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PuntosNoConformidadDto} from '../../../../models/noConformidad.model';
import {constantes} from '../../../../../environments/environment';
import {NgClass} from '@angular/common';
import {StripHtmlPipe} from '../../../../utils/pipes/strip-html.pipe';

@Component({
  selector: 'app-ver-punto-no-conformidad',
  standalone: true,
    imports: [
        NgClass,
        StripHtmlPipe
    ],
  templateUrl: './ver-punto-no-conformidad.component.html',
  styles: ``
})
export class VerPuntoNoConformidadComponent{
    @Input() public puntoNc!: PuntosNoConformidadDto;
    @Input() public indice!: number;
    @Output() public puntoNoConformidadSeleccionado: EventEmitter<number> = new EventEmitter<number>();
    public estadoAbierta: string;
    public estadoCerrada: string;


    constructor() {
        this.estadoAbierta = constantes.ESTADO_ABIERTA;
        this.estadoCerrada = constantes.ESTADO_CERRADA;
    }


    public verPuntoNoConformidadSeleccionado(): void {
        this.puntoNoConformidadSeleccionado.emit(this.puntoNc.id);
    }
}
