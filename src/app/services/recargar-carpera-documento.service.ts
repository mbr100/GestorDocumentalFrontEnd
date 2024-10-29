import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecargarCarperaDocumentoService {
    public recargarEvento: EventEmitter<void> = new EventEmitter<void>();
}
