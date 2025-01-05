import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/authService.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService); // Inyecta el servicio de autenticación
    const token = authService.getToken; // Obtén el token del servicio o localStorage
    if (token) {
        // Clonar la solicitud para agregar el encabezado Authorization
        req = req.clone({
            setHeaders: {
                authorization: `Bearer ${ token }`
            },
        });
    }

    return next(req);
};
