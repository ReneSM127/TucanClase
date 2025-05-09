# Ejecutar el frontend
Para ejecutar el frontend, nos moveremos a la carpeta `/TucanClase/frontend/` y una vez dentro, usamos `npm start`

### Si es la primera vez que clonamos el repositorio.
Nos moveremos a la carpeta `/TucanClase/frontend/` y ejecutamos el comando `npm install` para instalar las dependencias necesarias y después `npm start`

## Estructura Frontend
En la carpeta `/TucanClase/frontend/src/` encontraemos las carpetas:

### `/Components`
Aquí estarán los componentes que necesitemos para cada página
Dentro de `Components/` se debe crear una carpeta con el nombre del componente y dentro un archivo .jsx y .css

#### Ejemplo
 Si queremos crear un componente *Carrusel* entonces en `/Components` crearemos la carpeta `/Components/Carrusel` y dentro creamos los archivos Carrusel.jsx y Carrusel.css
 Además necesitaremos la extensión de react en VSCode para poder crear componentes mediante atajos como rafce

### `/Components/Assets`
Aquí se pondrán las imagenes como logos, iconos u otros medios multimedia que necesiten los componentes

### `/Pages`
Aquí se pondrán las páginas que usemos. A diferencia de los componentes, tenemos una carpeta `/Pages/CSS` para añadir los estilos a las páginas que queramos en vez de una carpeta para cada uno

### `/Services`
Aquí se ejecutarán las llamadas al backend, devolviendo una función o JSON según la llamada que hagamos que podremos usar en componentes.

### `/App.js`
El archivo principal, aquí se controla las rutas ("/", "/tutorias", etc) y que componente llaman. 
Por lo general, en este archivo solo se llaman a los archivos de `/Pages/` y componentes que deben ir en cada página (header, navbar, footer, etc)

# Ejecutar el backend
Para ejecutar el backend, nos moveremos a la carpeta `/TucanClase/backend/` y una vez dentro, usamos `node server.js` o `npm run dev` (para poder realizar cambios y que se actualice el backend)

### Si es la primera vez que clonamos el repositorio.
Nos moveremos a la carpeta `/TucanClase/backend/` y ejecutamos el comando `npm install` para instalar las dependencias necesarias y después `node server.js` o `npm run dev`

## Estructura backend
En la carpeta `/TucanClase/backend/` encontraemos las carpetas:

### `/Config`
Aquí estarán configuraciones que se necesitan, como la conexión a la base de datos

### `/Models`
Aquí se encuetran funciones que interactúan directamente con la base de datos. Separandolo de los controladores se puede cambiar fácilmente de base de datos sin afectar a las demás partes del backend.

### `/Controllers`
Define la lógica que responde a las rutas. Por ejemplo, cuando se haga una llamada a `/api/registrarUsuario` el backend responderá con el controlador asociado a esa ruta.

### `/Routes`
Define los endpoints y enlaza cada ruta con su controlador correspondiente. Al separar la ruta del controlador, se pueden modificar las rutas sin afectar al controlador

### `app.js`
El archivo principal, se define las rutas y librerias necesarias para el funcionamiento del backend

### `server.js`
Inicia la aplicación en un puerto específico, se puede poner en `app.js` pero llenaría el código principal en configuraciones del servidor

