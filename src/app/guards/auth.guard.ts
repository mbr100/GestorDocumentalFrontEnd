import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/authService.service';
import {map, of} from 'rxjs';
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
    const router: Router = inject(Router);
    const auth = inject(AuthService);
    return auth.usuario$.pipe(map((usuario):boolean => {
        if (!usuario) {
            router.navigateByUrl('/login').then(_ => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No tienes permisos para acceder a esta página',
                }).then();
            });
            return false;
        }  else {
            return true;
        }
    }), catchError(error => {
            console.error('Error de autenticación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error de autenticación',
            }).then();
            return of(false);
        }));
}
