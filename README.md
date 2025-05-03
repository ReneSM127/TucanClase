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

### `/App.js`
El archivo principal, aquí se controla las rutas ("/", "/tutorias", etc) y que componente llaman.
Por lo general, en este archivo solo se llaman a los archivos de `/Pages/`

# Ejecutar el backend
Para ejecutar el frontend, nos moveremos a la carpeta `/TucanClase/backend/` y una vez dentro, usamos `node index.js`

### Si es la primera vez que clonamos el repositorio.
Nos moveremos a la carpeta `/TucanClase/backend/` y ejecutamos el comando `npm install` para instalar las dependencias necesarias y después `node index.js`

## Estructura backend
De momento se controla todo mediante el archivo **index.js** pero a futuro se dividirá de manera más modular los elementos
