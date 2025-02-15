# Gestor Documental de Proyectos de Deducciones de I+D+i

Este proyecto es un cliente desarrollado con Angular 19.0.5 que forma parte de un sistema de gestión documental para proyectos de deducciones de I+D+i. Permite a los usuarios conectarse a un backend para realizar diversas tareas relacionadas con la gestión de archivos y la resolución de no conformidades.

## Características

- **Gestión Documental**: Permite compartir y organizar archivos entre usuarios.
- **Resolución de No Conformidades (NC)**:
    - Responder no conformidades generadas por gestores de proyecto, contables, comités, expertos 4D o técnicos.
    - Gestión dinámica de estados de las no conformidades hasta su cierre.
- **Integración con el Backend**: Comunicación eficiente con el servidor para gestionar archivos y datos.
- **Interfaz Dinámica**: Actualización en tiempo real de la estructura de carpetas y archivos.

## Tecnologías Utilizadas

- ![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat&logo=angular&logoColor=white) Angular 19.0.5 
- ![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white) Bootstrap (para estilos)
- ![Font Awesome](https://img.shields.io/badge/-Font%20Awesome-339AF0?style=flat&logo=fontawesome&logoColor=white) Font Awesome (para iconos)
- ![NgxEditor](https://img.shields.io/badge/-NgxEditor-0081CB?style=flat&logo=angular&logoColor=white) NgxEditor (para texto enriquecido)


## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de comenzar:

- Node.js (versión 16 o superior)
- Angular CLI (versión 15 o superior)
- Git (opcional, para clonar el repositorio)

Tambien debes de tener el backend de la aplicación corriendo en tu máquina local. Puedes encontrar el repositorio del backend [aquí](https://github.com/mbr100/GestorDocumentalBackEnd).

## Instalación

1. Clona el repositorio en tu máquina local:
```bash
  git clone https://github.com/mbr100/GestorDocumentalFrontEnd.git 
```
2. Navega a la carpeta del proyecto:
```bash
  cd GestorDocumentalFrontEnd
```
3. Instala las dependencias del proyecto:
```bash
  npm install
```
4. Inicia el servidor de desarrollo:
```bash
  ng serve
```
5. Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación en funcionamiento.
6. Para acceder a la aplicación, utiliza las siguientes credenciales:
```bash
  Usuario: GP@ejemplo.com
  Contraseña: 1234
```
6.1 Para mas usuarios consulta el archivo DataLoaderExample en el backend.

## Uso
El proyecto cuenta con las siguientes funcionalidades:
- Gestion de Proyectos, Usuarios y Roles 
- Asignación de usuarios a proyectos
- Creacion de estructura de carpetas y subcarpetas
- Subida de archivos
- Aceptacion o Rechazo de archivos
- Resolución de no conformidades
- Comentarios en no conformidades
- Cambio de estados de no conformidades
- Visualización de archivos
- Descarga de archivos

## Autores
El proyecto esta integramente desarrollado por Mario Borrego

## Copyright and license
El código fuente de este proyecto es de código abierto y está disponible bajo la [Licencia MIT](https://opensource.org/licenses/MIT).
