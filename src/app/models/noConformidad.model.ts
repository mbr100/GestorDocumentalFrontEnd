export class ContenidoDto {
    id: number;
    contenido: string;
    fecha: Date;

    constructor(id: number, contenido: string, fecha: Date) {
        this.id = id;
        this.contenido = contenido;
        this.fecha = fecha;
    }
}

export class PuntosNoConformidadDto {
    id: number;
    contenidos: ContenidoDto[];
    fecha: Date;
    estado: string;
    responsable: string;

    constructor(id: number, contenidos: ContenidoDto[], fecha: Date, estado: string, responsable: string) {
        this.id = id;
        this.contenidos = contenidos;
        this.fecha = fecha;
        this.estado = estado;
        this.responsable = responsable;
    }
}

export class ProyectoDto {
    codigo: number;
    titulo: string;
    ano: number;
    cliente: string;

    constructor(proyecto: ProyectoDto) {
        this.codigo = proyecto.codigo
        this.titulo = proyecto.titulo
        this.ano = proyecto.ano
        this.cliente = proyecto.cliente
    }
}

export class NoConformidadDto {
    id: number;
    tipoNc: string;
    proyecto: ProyectoDto;
    estado: string;
    puntosNoConformidades: PuntosNoConformidadDto[];
    version: number;

    constructor(noConformidadDto: NoConformidadDto) {
        this.id = noConformidadDto.id;
        this.tipoNc = noConformidadDto.tipoNc;
        this.estado = noConformidadDto.estado;
        this.proyecto = new ProyectoDto(noConformidadDto.proyecto)
        this.puntosNoConformidades = noConformidadDto.puntosNoConformidades.map(pnc => new PuntosNoConformidadDto(pnc.id,pnc.contenidos,pnc.fecha,pnc.estado,pnc.estado));
        this.version = noConformidadDto.version;
    }

}

export class nuevaRespuestaNC{
    contenido: string;
    idNoConformidad: number;

    constructor(idNoConformidad: number, contenido: string) {
        this.contenido = contenido;
        this.idNoConformidad = idNoConformidad;
    }
}

