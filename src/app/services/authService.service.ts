import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {jwtDecode} from "jwt-decode";
import {Usuario} from '../models/usuario.model';
import {environment} from '../../environments/environment';
import {AuthenticationResponse} from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl: string = environment.apiUrl;
    private apiAuth: string = environment.apiAuth;

    private readonly tokenKey: string = 'authToken';
    public usuarioSubject = new BehaviorSubject<Usuario | null>(null);
    public usuario$ = this.usuarioSubject.asObservable();
    private token: string | null = null;
    public user: Usuario | null = null;

    constructor(private http: HttpClient, private router: Router) {
        this.initAuthState();

    }

    // Inicializa el estado de autenticación al cargar la app
    private initAuthState(): void {
        const token = this.getTokenFromStorage();
        if (token) {
            this.setToken(token);
            // Realiza la validación del token de manera diferida
            setTimeout(() => {
                this.validateToken(token).subscribe({
                    next: (isValid) => {
                        if (!isValid) {
                            console.error('Token no válido');
                            this.logout();
                        }
                    },
                    error: (err) => {
                        console.error('Error al validar el token:', err);
                        this.clearToken();
                        this.usuarioSubject.next(null);
                        this.router.navigate(['/login']).then();
                    },
                    complete: () => {
                        console.log('Validación del token completada');
                    }
                });
            });
        } else {
            this.logout();
        }
    }

    // Inicia sesión en el backend y guarda el token
    public login(nombre: string, password: string): Promise<Usuario> {
        return new Promise((resolve, reject): void => {
            this.http.post<AuthenticationResponse>(`${this.baseUrl}/${this.apiAuth}/authenticate`, { nombre, password }).subscribe({
                next: (data: AuthenticationResponse) => {
                    this.setToken(data.jwt);
                    const decodedToken = this.decodeToken(data.jwt);
                    this.user = {
                        auth: true,
                        idUsuario: decodedToken.idUsuario,
                        nombre: decodedToken.sub,
                        rol: decodedToken.rol || '',
                        email: decodedToken.email
                    }
                    console.log('Usuario autenticado:', this.user);
                    this.router.navigate(['/']).then(() => resolve(this.user!));
                },
                error: (err) => {
                    console.error(err);
                    this.clearToken();
                    reject(false);
                },
                complete: () => {
                    console.log('Petición de login completada');
                    console.log(' es gesot' +this.isGestor());
                }
            });
        });
    }

    // Cierra sesión
    public logout(): void {
        this.http.post(`${this.baseUrl}/${this.apiAuth}/logout`, {}).subscribe({
            next: () => {
                console.log('Sesión cerrada');
            },
            error: (err) => {
                console.error('Error al cerrar la sesión:', err);
            },
            complete: () => {
                this.clearToken();
                this.usuarioSubject.next(null);
                this.router.navigate(['/login']).then();
            }
        });
    }

    // Carga el token en el servicio y genera el objeto Usuario
    private setToken(token: string): void {this.token = token;
        localStorage.setItem(this.tokenKey, token);
        const decodedToken = this.decodeToken(token);
        if (decodedToken) {
            this.usuarioSubject.next({
                auth: true,
                idUsuario: decodedToken.idUsuario,
                nombre: decodedToken.sub,
                rol: decodedToken.rol ,
                email: decodedToken.email
            });
        }
    }

    public get getToken(): string | null {
        return this.token;
    }

    // Borra el token del almacenamiento
    private clearToken(): void {
        this.token = null;
        localStorage.removeItem(this.tokenKey); // Cambiado a sessionStorage
    }

    // Obtiene el token desde el sessionStorage
    private getTokenFromStorage(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Valida el token con el backend
    private validateToken(jwt: string): Observable<boolean> {
        const params = new HttpParams().set('jwt', jwt);
        const validateTokenUrl = `${this.baseUrl}/${this.apiAuth}/validate-token`;
        return this.http.get<boolean>(validateTokenUrl, { params });
    }

    // Decodifica el token para extraer datos
    private decodeToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (e) {
            return null;
        }
    }

    public getUsuario(): Usuario | null {
        return this.usuarioSubject.value;
    }

    public isGestor(): boolean {
        return this.usuarioSubject.value?.rol != 'Cliente';
    }

}
