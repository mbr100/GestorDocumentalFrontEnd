import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CabeceroComponent} from './components/cabecero/cabecero.component';

@Component({
  selector: 'app-root',
    imports: [CabeceroComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestorDocumentalFrontEnd';
}
