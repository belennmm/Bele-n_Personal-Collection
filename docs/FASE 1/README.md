# Forgotten Places CA


## Fase 1

En esta fase construí las dos piezas base del proyecto de forma independiente:

1. Un frontend funcional en React con persistencia en LocalStorage.
2. Un backend en Express con base de datos real y endpoints REST.

![FASE 1 PREVIEW](./docs/assets/FASE1_FP_preview.png)


## Elementos realizados

### Frontend

Creé un proyecto con Vite + React 18.

Implementé los tres componentes solicitados:

- FormularioItem: lo utilicé para registrar nuevos lugares olvidados.
- ListaItems: lo utilicé para mostrar los lugares guardados en la colección.
- ItemCard: lo utilicé para presentar la información individual de cada lugar y permitir cambiar su estado o archivarlo.

También:

- useState con lazy initializer para cargar datos desde LocalStorage.
- useEffect para sincronizar el estado con LocalStorage.
- Persistencia de datos al recargar la página.
- CRUD funcional en el frontend: crear, leer, actualizar estado y archivar lugares.

### Modelo de datos

Cada item representa un lugar olvidado de Centroamérica y contiene los campos solicitados:

- id: UUID generado con crypto.randomUUID().
- nombre: nombre del lugar.
- categoriaId: categoría del lugar.
- estado: estado de exploración.
- puntuacion: puntuación personal.
- fechaRegistro: fecha de creación del registro.
- fechaActividad: fecha de última actualización.
- notas: notas personales.
- atributos: objeto JSON con datos específicos del lugar.
- activo: indica si el item está activo o archivado.


### Backend 
La base de datos contiene:

Tabla items: almacena los lugares registrados.
Tabla registros: almacena registros de actividad relacionados con cada lugar.

Endpoints implementados:

- GET /api/items: devuelve todos los items activos.
- POST /api/items: crea un nuevo lugar.
- PUT /api/items/:id: actualiza la información de un lugar existente.
- DELETE /api/items/:id: archiva un lugar cambiando activo a false.
- POST /api/items/:id/registro: crea un registro de actividad asociado a un lugar.

#### Evidencia de pruebas en Postman

GET /api/items

Para este endpoint, este obtiene todos los lugares activos guardados.

![GET FP](./docs/assets/GET%20FP.png)

POST /api/items

Crear un nuevo lugar olvidado dentro de la colección.

![POST FP](./docs/assets/POST%20FP.png)

Manejo de errores en POST /api/items

También probé el manejo de errores al intentar crear un item sin cumplir con los datos requeridos.

![POST Manejo de errores FP](./docs/assets/POST%20Manejo%20de%20errores%20FP.png)

PUT /api/items/:id

Este endpoint actualiza la información de un lugar existente.

![PUT FP](./docs/assets/PUT%20FP.png)

/api/items/:id/registro

Utilicé este endpoint para crear un registro de actividad asociado a un lugar específico.

![POST Registro FP](./docs/assets/POST%20Registro%20FP.png)

DELETE /api/items/:id

Utilicé este endpoint para archivar un lugar.

![DELETE FP](./docs/assets/DELETE%20FP.png)