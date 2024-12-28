import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
  standalone: true
})
export class StripHtmlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
      if (!value) {
          return '';
      }
      // Eliminar las etiquetas HTML con una expresión regular
      const strippedText: string = value.replace(/<\/?[^>]+(>|$)/g, '');
      // Limitar a los primeros 50 caracteres
      return strippedText.length > 50 ? strippedText.substring(0, 50) + '...' : strippedText;
  }

}
