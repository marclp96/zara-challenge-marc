# Zara Challenge – Catálogo de Móviles

Este proyecto es una aplicación web que permite visualizar, buscar y gestionar un catálogo de móviles. 

La aplicación cuenta con tres vistas: Un listado de teléfonos, detalle de los mismos y un carrito de compras.

## Características

- **Listado de teléfonos:**  
  Muestra una cuadrícula con tarjetas que incluyen imagen, nombre, marca y precio base de cada dispositivo.

- **Buscador en tiempo real:**  
  Permite filtrar teléfonos por su nombre o marca y muestra el número de resultados encontrados.

- **Detalle del teléfono:**  
  Muestra información completa del dispositivo seleccionado. Permite elegir color y almacenamiento con actualización en tiempo real del precio y muestra productos simlares.

- **Carrito de compras:**  
  Permite agregar, eliminar, ver el total del precio y ver el total de productos añadidos.


## Notas sobre la arquitectura

- **React Context API:** Se usa para gestionar el estado global del carrito de compras.
- **Rutas y Navegación:** Implementadas con React Router.
- **API REST:** Se consumen datos mediante funciones definidas en `apiService.js` con autenticación usando la key API y la URL del backend.
- **Variables de Entorno:** Se utilizan para almacenar datos sensibles 

## Stack Tecnológico

- **Frontend:** React, CSS.
- **Backend:** Node 18 
- **Gestión de Estado:** React Context API.
- **Enrutamiento:** React Router.
- **Testing:** Jest y React Testing Library.
- **Linting y Formateo:** Se usó la extensión Prettier para el formate y cuidado del código.

## Instalación

**Clonar el repositorio:**

   - `git clone https://github.com/marclp96/zara-challenge-marc.git`
   - `cd zara-challenge-marc`
   - `npm install`
   - Crear un archivo `.env` en la raíz del proyecto y definir las siguientes variables: 
     - `REACT_APP_API_KEY= <key de la api>.`
     - `REACT_APP_BASE_URL= <url de la api>.`
   - Iniciar el servidor con `npm start`.


## Uso
- **Listado de teléfonos:** La página principal muestra una cuadrícula con las tarjetas de los teléfonos.

- **Buscador:** Usar el campo de búsqueda para filtrar los teléfonos y ver el número de resultados en tiempo real.

- **Vista detalle del teléfonos:** Hacer clic en cualquier tarjeta para ver detalles, cambiar color y almacenamiento, y agregar el producto al carrito.

- **Carrito:** Accede a la vista del carrito para ver los productos añadidos, eliminar artículos y ver el total.

## Variables de Entorno
Se utiliza un archivo `.env` para almacenar datos sensibles, como son la key de la API y la URL. 

- `REACT_APP_API_KEY= <key de la api>.`
- `REACT_APP_BASE_URL= <url de la api>.`

Se usa el encabezado `x-api-key`.

## Testing
Se utilizan Jest y React Testing Library para realizar pruebas unitarias y de integración.

Para ejecutar los tests y ver la cobertura:

`npm test -- --coverage`

## Despliegue
Para generar una build optimizada para producción:

`npm run build`

Y para servir la carpeta build con un servidor estático:

- `npm install -g serve`
- `serve -s build`

## Notas adicionales

**Modo Desarrollo vs. Producción:**
- En desarrollo, los assets se sirven sin minimizar para facilitar el debugging.
- En producción, los assets se concatenan y minimizan para mejorar el rendimiento.

**Linting y Formateo:**

Se utilizó la extensión *Prettier* para VSCode para mantener el código limpio y bien estructurado. 

**Testing:**

He implementado pruebas unitarias para cubrir la funcionalidad principal de la aplicación. Sin embargo, reconozco que aún hay algunos tests que no he podido corregir por completo debido a limitaciones de tiempo. Esto no afecta la funcionalidad general de la aplicación, y tengo previsto continuar trabajando en la optimización y cobertura de pruebas en futuros desarrollos.

Si tienen alguna duda o encuentran algún inconveniente, estaré encantado de ayudarles. Por favor, no duden en contactarme para cualquier consulta o aclaración.
