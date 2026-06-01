# Forgotten Places

¡Bienvenidos a Forgotten Places!

Mi nombre es Belén y desarrollé Forgotten Places, un journal web personal de viajes por Centroamérica.

Para este proyecto escogí la temática de viajes porque siempre me ha parecido interesante conocer lugares con historia, cultura y características únicas. Sin embargo, en lugar de enfocarme en destinos turísticos populares, decidí inspirarme en los forgotten places, es decir, lugares olvidados, escondidos o poco conocidos.

La idea de mi proyecto fue crear un journal para travelers que disfrutan de lugares diferentes. Quise darle una estética visual tipo revista.

## Video Demo y Explicación
[DEMOSTRACIÓN Y EXPLICACIÓN DE FORGOTTEN PLACES](https://canva.link/jjql0avo5sfmgwf)
[DEMOSTRACIÓN Y EXPLICACIÓN DE FORGOTTEN PLACES EN YouTube](https://youtu.be/XmHRlQeoFTs)

## Demo de Forgotten Places

Frontend publicado

https://forgotten-places-belen.vercel.app

Backend publicado

https://forgotten-places-backend.onrender.com

> **Nota:** La API está desplegada utilizando la versión gratuita de Render. Debido a esto, los datos almacenados pueden reiniciarse ocasionalmente cuando el servicio se reinicia o vuelve a desplegarse.



## Fases del proyecto

* [Fase 1: useState, useEffect, LocalStorage y Backend](./docs/FASE%201/README.md)
* [Fase 2: useContext, useRef y tema visual](./docs/FASE%202/README.md)
* [Fase 3: useReducer, gráficas y optimización](./docs/FASE%203/README.md)
* [Fase 4: custom hooks, deploy y entrega final](./docs/FASE%204/README.md)
* [Justificación del uso de Tailwind CSS y Anime js](./docs/JUSTIFICACION/README.md)



## Índice

* [Tecnologías principales](#tecnologías-principales)
* [Vista previa](#vista-previa)
* [Funcionalidades principales](#funcionalidades-principales)
* [Cómo ejecutar la app localmente](#cómo-ejecutar-la-app-localmente)
* [Cómo desplegar la app](#cómo-desplegar-la-app)
* [Capturas del proyecto](#capturas-del-proyecto)
* [Optimización y Profiler](#optimización-y-profiler)
* [Custom Hooks implementados](#custom-hooks-implementados)
* [Endpoints del backend](#endpoints-del-backend)
* [Decisiones técnicas importantes](#decisiones-técnicas-importantes)
* [Inteligencia Artificial](#inteligencia-artificial)
* [Limitaciones conocidas](#limitaciones-conocidas)
* [Sobre mí](#sobre-mí)
* [Reflexión final](#reflexión-final)

## Tecnologías principales

| Tecnología              | Uso dentro del proyecto                  |
| ----------------------- | ---------------------------------------- |
| React                   | Construcción de la interfaz del frontend |
| Vite                    | Configuración y build del proyecto       |
| Tailwind CSS            | Estilos visuales y diseño responsive     |
| Express                 | Backend y creación de API REST           |
| LocalStorage            | Persistencia en modo local               |
| Recharts                | Gráficas de categorías y recomendaciones |
| Anime.js                | Animación del avión en recomendaciones   |
| Render                  | Deploy del backend                       |
| Vercel                  | Deploy del frontend                      |
| GitHub                  | Control de versiones y repositorio       |
| React DevTools Profiler | Medición de rendimiento                  |

## Vista previa

Esta es una captura de la aplicación publicada en Vercel.

![Aplicación publicada](./docs/assets/FASE4_public.png)

## Funcionalidades principales

Forgotten Places permite:

* Registrar lugares olvidados o poco conocidos de Centroamérica.
* Editar la información de cada lugar.
* Archivar lugares que ya no quiero mostrar como activos.
* Cambiar el estado de exploración del lugar.
* Calificar cada lugar con estrellas.
* Agregar recomendaciones de viaje.
* Corregir recomendaciones si se agregó una por error.
* Filtrar por categoría, estado y búsqueda.
* Cambiar entre tema claro y oscuro.
* Usar modo LocalStorage o modo API.
* Visualizar gráficas sobre categorías y recomendaciones.
* Ver si la API está conectada o no disponible.
* Usar un atajo de teclado para cambiar el tema.

## Cómo ejecutar la app localmente

### 1. Clonar el repositorio

```powershell
git clone https://github.com/belennmm/Bele-n_Personal-Collection.git
```

Entrar al proyecto:

```powershell
cd Bele-n_Personal-Collection
```

### 2. Ejecutar el backend

Entrar a la carpeta del backend:

```powershell
cd personal-collection-forgotten-places/backend
```

Instalar dependencias:

```powershell
npm install
```

Levantar el servidor:

```powershell
npm run dev
```

El backend estará disponible en:

```txt
http://localhost:3001
```

También se puede probar con:

```txt
http://localhost:3001/health
```

### 3. Ejecutar el frontend

Abrir una nueva terminal y entrar a la carpeta del frontend:

```powershell
cd personal-collection-forgotten-places/frontend
```

Instalar dependencias:

```powershell
npm install
```

Crear un archivo `.env` dentro de la carpeta `frontend` con el siguiente contenido:

```txt
VITE_API_URL=http://localhost:3001
```

Levantar el frontend:

```powershell
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:5173
```

### 4. Utilizar la aplicación

La aplicación puede funcionar de dos formas:

* **Modo Local**, utilizando LocalStorage del navegador.
* **Modo API**, utilizando el backend ejecutándose en `localhost:3001`.

Ambos modos pueden cambiarse directamente desde la interfaz.

## Cómo desplegar la app

Para desplegar la aplicación utilicé dos servicios diferentes, porque el proyecto tiene frontend y backend separados.

### Backend en Render

Primero desplegué el backend en Render.

Configuración utilizada:

| Campo             | Valor                                          |
| ----------------- | ---------------------------------------------- |
| Servicio          | Web Service                                    |
| Root Directory    | `personal-collection-forgotten-places/backend` |
| Build Command     | `npm install`                                  |
| Start Command     | `npm start`                                    |
| Health Check Path | `/health`                                      |

Variable de entorno configurada:

```txt
FRONTEND_URL=https://forgotten-places-belen.vercel.app
```

Esta variable permite que el backend acepte solicitudes desde el frontend publicado.

### Frontend en Vercel

Después desplegué el frontend en Vercel.

Configuración utilizada:

| Campo            | Valor                                           |
| ---------------- | ----------------------------------------------- |
| Framework        | Vite                                            |
| Root Directory   | `personal-collection-forgotten-places/frontend` |
| Build Command    | `npm run build`                                 |
| Output Directory | `dist`                                          |
| Install Command  | `npm install`                                   |

Variable de entorno configurada:

```txt
VITE_API_URL=https://forgotten-places-backend.onrender.com
```

Esta variable permite que el frontend se conecte con el backend publicado en Render.

### Orden del deploy

El orden que seguí fue:

1. Subir los cambios a GitHub.
2. Desplegar primero el backend en Render.
3. Copiar la URL pública del backend.
4. Configurar `VITE_API_URL` en Vercel.
5. Desplegar el frontend en Vercel.
6. Copiar la URL pública del frontend.
7. Actualizar `FRONTEND_URL` en Render.
8. Probar la app publicada en modo API.

De esta forma el frontend y el backend quedaron conectados correctamente en producción.

## Capturas del proyecto

### Tema oscuro

![Tema oscuro](./docs/assets/FASE4_public.png)

### Tema claro

![Tema claro](./docs/assets/FASE2_claro.png)

### Gráficas

![Gráficas modo API](./docs/assets/FASE3_grafica_api.png)

![Gráficas modo Local](./docs/assets/FASE3_grafica_local.png)

### Deploy del frontend

![Deploy Vercel](./docs/assets/FASE4_deploy.png)

### Deploy del backend

![Deploy Render](./docs/assets/FASE4_deploy_back.png)

### Backend en Render

![Render](./docs/assets/FASE4_render.png)



## Optimización y Profiler

Antes de optimizar, varios componentes se renderizaban al mismo tiempo, incluyendo gráficas y tarjetas.

Después utilicé:

* useMemo
* useCallback
* React.memo

Con estas optimizaciones logré reducir renders innecesarios en listas, gráficas y componentes individuales.

### Antes de la optimización

![Profiler antes 1](./docs/assets/profiler_antes_1.png)

![Profiler antes 2](./docs/assets/profiler_antes_2.png)

### Después de la optimización

![Profiler después 1](./docs/assets/profiler_despues_1.png)

![Profiler después 2](./docs/assets/profiler_despues_2.png)

## Custom Hooks implementados

En la fase 4 extraje lógica reutilizable en custom hooks dentro de:

```txt
src/hooks/
```

| Hook                    | Archivo                                | Propósito                                                          |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| useLocalStorage         | `src/hooks/useLocalStorage.js`         | maneja un estado sincronizado con LocalStorage                     |
| useFetch                | `src/hooks/useFetch.js`                | realiza peticiones HTTP con data, loading, error y AbortController |
| useAtajoTeclado         | `src/hooks/useAtajoTeclado.js`         | maneja atajos de teclado con listener y cleanup automático         |
| useRecomendacionesLugar | `src/hooks/useRecomendacionesLugar.js` | maneja la lógica de recomendaciones de cada lugar                  |



## Endpoints del backend

| Método | Endpoint                  | Descripción                             |
| ------ | ------------------------- | --------------------------------------- |
| GET    | `/`                       | Verifica que la API esté corriendo      |
| GET    | `/health`                 | Ruta de health check para Render        |
| GET    | `/api/items`              | Obtiene todos los lugares activos       |
| POST   | `/api/items`              | Crea un nuevo lugar                     |
| PUT    | `/api/items/:id`          | Actualiza un lugar existente            |
| DELETE | `/api/items/:id`          | Archiva un lugar                        |
| POST   | `/api/items/:id/registro` | Registra una recomendación o corrección |

## Decisiones técnicas importantes

La justificación detallada está aquí: [Justificación del uso de Tailwind CSS y Anime js](./docs/JUSTIFICACION/README.md)

### Uso de Tailwind CSS

Decidí utilizar Tailwind CSS principalmente porque quería experimentar con una herramienta diferente a CSS tradicional. 
### Uso de Anime.js

Utilicé Anime.js para implementar la animación del avión en el sistema de recomendaciones y la del emoji según categoría. Quería agregar un detalle visual que hiciera la interacción más entretenida y que reforzara la temática de viajes del proyecto. Por esto probé algo nuevo. 


## Inteligencia Artificial

Durante el desarrollo utilicé inteligencia artificial como herramienta de apoyo para resolver dudas puntuales y aprender tecnologías que no había utilizado anteriormente. 

Documenté los promts que utilicé en cada fase. 

Algunos ejemplos:
* Saber cómo implementar Anime.js.
* Saber cómo configurar Vercel.
* Conocer cómo utilizar Render.
* Guía para solucón con variables de entorno.


## Limitaciones conocidas

La API está desplegada en Render utilizando la versión gratuita. Por eso los datos guardados pueden reiniciarse cuando el servicio se duerme, se reinicia o se vuelve a desplegar.

También es posible que la API tarde unos segundos en responder si el servicio de Render estuvo inactivo.

## Sobre mí

* Belén Monterroso 


Desarrollé este proyecto para Sistemas y Tecnologías Web. Escogí la temática de viajes porque quería trabajar una idea visual y personal, no solo una app de datos. Me gusta investigar de lugares curiosos y poco conocidos, por esto adapté la temática de viajes a Forgotten Places. 

## Reflexión final

Este proyecto me permitió poner a prueva todos los conceptos vistos con Ludwing. 

Aprendí a trabajar con React de forma más organizada, a separar lógica utilizando hooks personalizados, a optimizar componentes con Profiler y a desplegar aplicaciones reales utilizando Vercel y Render.

Lo que más me gustó fue poder transformar una idea personal en una aplicación funcional y publicada. Fue algo nuevo para mí y como me gusta el diseño, me apasionó hacerlo. 