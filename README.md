# TaskMaster - Frontend

Este es el repositorio del frontend para la aplicación **TaskMaster**, una herramienta de gestión de tareas que permite crear, editar, eliminar y mover tareas entre diferentes estados. Además, permite almacenar tareas en el historial, gestionar detalles y visualizarlas en un calendario.

## Características

- Autenticación de usuarios.
- Gestión de tareas con diferentes estados (pendiente, en progreso, completada).
- Funcionalidad de drag-and-drop para cambiar el estado de las tareas.
- Historial de tareas completadas y eliminadas.
- Modal para ver y gestionar los detalles de las tareas.
- Visualización de tareas en un calendario según la fecha de creación.
- Soporte para modo claro y oscuro.

## Tecnologías utilizadas

- **React**: Biblioteca para la creación de interfaces de usuario.
- **Tailwind CSS**: Framework CSS para el diseño responsivo y personalización de estilos.
- **React Calendar**: Librería para mostrar tareas en un calendario.
- **Hello Pangea DnD**: Librería para implementar drag-and-drop.
- **Supabase**: Autenticación con OAuth para iniciar sesión con Google.
- **Fetch API**: Para las llamadas al backend.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Edwinestrada07/taskmaster-front.git
   
2. Navega al directorio del proyecto:
   
   **cd taskmaster-frontend**
   
3. Instala las dependencias:

   **npm install**

4. Crea un archivo .env en la raíz del proyecto y añade la URL de tu backend:

   **REACT_APP_BACKEND_URL=https://taskmaster-back.onrender.com**

5. Ejecuta el servidor de desarrollo:

   **npm start**

6. Abre la aplicación en tu navegador en http://localhost:3000.

## Scripts Disponibles

- npm start: Ejecuta la aplicación en modo de desarrollo.
- npm run build: Compila la aplicación para producción.
  
## Funcionalidades en Desarrollo

- Integración de notificaciones push.
- Optimización del rendimiento en dispositivos móviles.
- Funcionalidades avanzadas de búsqueda y filtrado de tareas.
  
## Estructura del Proyecto

- src/components/: Componentes reutilizables como TaskList, TaskItem, y el modal de detalles de tareas.
- src/pages/: Vistas principales como Login, Register, Task.
- src/services/: Servicios para interactuar con el backend.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, por favor, abre un issue o crea un pull request con tus mejoras.

## Licencia

Este proyecto está bajo la Licencia MIT.


