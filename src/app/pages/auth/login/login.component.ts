import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/authService.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
    imports: [
        FormsModule
    ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{
    public email: string;
    public password: string;
    public constructor(private router: Router, private loginService: AuthService) {
        this.email = 'GP';
        this.password = '1234';
    }

    public ngOnInit(): void {
        this.loginService.usuarioSubject.subscribe(auth => {
            if (auth?.auth) {
                this.router.navigate([`/`]).then(r => console.log(r));
            }
        });
    }

    public login(): void {
        this.loginService.login(this.email, this.password).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido '+ res.nombre,
                text: 'Inicio de sesión correcto',
            }).then(() => this.router.navigate([`/`]).then(r => console.log(r)))
        }).catch( error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos'+error,
            }).then();
        })
    }
}
