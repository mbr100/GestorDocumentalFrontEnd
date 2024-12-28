import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

}
