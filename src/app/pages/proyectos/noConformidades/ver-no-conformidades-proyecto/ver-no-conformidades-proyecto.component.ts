import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NoConformidadService } from '../../../../services/no-conformidad.service';
import { NoConformidadDto, PuntosNoConformidadDto } from '../../../../models/noConformidad.model';
import { VerPuntoNoConformidadComponent } from '../ver-punto-no-conformidad/ver-punto-no-conformidad.component';
import { VerContenidoNoConformidadComponent } from '../ver-contenido-no-conformidad/ver-contenido-no-conformidad.component';
import { constantes, tiposNoConformidad } from '../../../../../environments/environment';
import { CrearPuntoNoConformidadComponent } from '../crear-punto-no-conformidad/crear-punto-no-conformidad.component';
import {AuthService} from '../../../../services/authService.service';
import {Usuario} from '../../../../models/usuario.model';


@Component({
  selector: 'app-ver-no-conformidades-proyecto',
  standalone: true,
    imports: [
        VerPuntoNoConformidadComponent,
        VerContenidoNoConformidadComponent,
        CrearPuntoNoConformidadComponent

    ],
  templateUrl: './ver-no-conformidades-proyecto.component.html',
  styleUrl: './ver-no-conformidades-proyecto.component.css'
})
export class VerNoConformidadesProyectoComponent implements OnInit {
    private readonly estadoAbierta: string = constantes.ESTADO_ABIERTA;
    private readonly estadoCerrada: string = constantes.ESTADO_CERRADA;
    private noConformidades: NoConformidadDto[];
    protected idProyecto: string;
    public abiertas: NoConformidadDto[];
    public cerradas: NoConformidadDto[];
    public ncSeleccionada: boolean
    public idNoConformidad: number|null;
    public verPuntosNc: NoConformidadDto | null;
    public puntoNoConformidadSeleccionado: number;
    public verContenidoNC: PuntosNoConformidadDto | null;
    public nuevoPuntoNC: boolean;
    public tiposNc: string[];
    public usuario: Usuario | null | undefined;

    @ViewChild('nuevaNcModal', { static: true }) nuevaNcModal!: ElementRef;

    public constructor(private route: ActivatedRoute, private noConformidadService: NoConformidadService, private authService: AuthService, private router: Router) {
        this.idProyecto = this.route.snapshot.paramMap.get('idProyecto') || '';
        this.ncSeleccionada = false;
        this.noConformidades =[]
        this.abiertas = []
        this.cerradas = []
        this.idNoConformidad = null;
        this.verPuntosNc = null;
        this.puntoNoConformidadSeleccionado = 0;
        this.verContenidoNC = null;
        this.nuevoPuntoNC = false;
        this.tiposNc = tiposNoConformidad;
        this.authService.usuario$.subscribe({
            next: (usuario) => {
                this.usuario = usuario;
                console.log(this.usuario)
            }
        })
    }

    public ngOnInit(): void {
        this.cargarNoConformidades();
    }

    private cargarNoConformidades(): void {
        this.noConformidadService.obtenerNoConformidadProyecto(this.idProyecto).subscribe({
            next: data => {
                this.noConformidades = data;
                console.log(this.noConformidades)
            }, complete: () => {
                this.dividirNoConformidades()
                console.log(this.abiertas)
            }
        })
    }
    public dividirNoConformidades(): void {
        this.abiertas = this.noConformidades.filter(nc =>
            !nc.puntosNoConformidades.length || // Si no tiene puntos, es abierta
            nc.puntosNoConformidades.some(punto => punto.estado === this.estadoAbierta) // O tiene algún punto abierto
        );
        this.cerradas = this.noConformidades.filter(nc =>
            nc.puntosNoConformidades.length > 0 && // Solo considerar si tiene puntos
            nc.puntosNoConformidades.every(punto => punto.estado === this.estadoCerrada) // Y todos están cerrados
        );
    }



    public seleccionarNoConformidad(id: number): void {
        this.ncSeleccionada = true;
        this.idNoConformidad = id;
        this.verPuntosNc = this.noConformidades.find(nc => nc.id === id) ?? null;
    }

    public verPuntoNoConfomidad(puntoNoConformidad: number): void {
        this.puntoNoConformidadSeleccionado = puntoNoConformidad;
        this.verContenidoNC = this.verPuntosNc?.puntosNoConformidades.find(pnc => pnc.id === this.puntoNoConformidadSeleccionado)|| null;
    }

    public volverNoConformidadesProyecto(): void {
        this.puntoNoConformidadSeleccionado = 0;
    }

    public recargarNC($event: boolean): void {
        if ($event) {
            this.nuevoPuntoNC = false;

            // Restablecer las variables antes de cargar las no conformidades
            this.ncSeleccionada = false;
            this.verPuntosNc = null;
            this.verContenidoNC = null;

            // Cargar las no conformidades y actualizar el estado al finalizar
            this.noConformidadService.obtenerNoConformidadProyecto(this.idProyecto).subscribe({
                next: (data) => {
                    this.noConformidades = data;
                },
                complete: () => {
                    this.dividirNoConformidades();
                    this.ncSeleccionada = true;
                    this.verPuntosNc = this.noConformidades.find(nc => nc.id === this.idNoConformidad) ?? null;

                    // Actualizar el punto de no conformidad seleccionado, si aplica
                    if (this.puntoNoConformidadSeleccionado) {
                        this.verPuntoNoConfomidad(this.puntoNoConformidadSeleccionado);
                    }
                },
            });
        }
    }

    public abrirPuntoNC(): void {
        this.nuevoPuntoNC = true;
    }

    public cancelarNuevoPunto($event: boolean): void {
        this.nuevoPuntoNC= !$event
    }

    public crearNuevaNc(tipo: string) {
        this.noConformidadService.crearNoConformidad(this.idProyecto, tipo).subscribe({
            next: () => {
                this.recargarNC(true);
            }, error: (error) => {
                console.error(error);
            }
        });
        this.cerrarModal();
    }

    private cerrarModal(): void {
        const modal: HTMLElement = this.nuevaNcModal.nativeElement;
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('style', 'display: none;');
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    }

    public volverDocumentosProyecto() {
        this.router.navigate(['/proyectos', this.idProyecto, 'documentos']).then();
    }
}
