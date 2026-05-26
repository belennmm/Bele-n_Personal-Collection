# Justificación del uso de herramientas adicionales

## Forgotten Places Centro América

Para mi proyecto decidí utilizar herramientas adicionales a React y JavaScript. Mi aplicación está inspirada en una revista personal de viajes, enfocada en registrar forgotten places de Centroamérica, por lo que desde el inicio quería que no se viera únicamente como un formulario o una lista de datos.

Mi intención fue crear una experiencia más parecida a documentar lugares dentro de un journal de viajes tipo revista. Por esta razón decidí experimentar con **Tailwind CSS** para construir la parte visual y con **Anime.js** para agregar una interacción animada.

Más que todo lo decidí por estética visual ya que quería lograr el objetivo de parecerse a  una revista. 
---

## Uso de Tailwind CSS

### Qué es Tailwind CSS

Tailwind CSS es una herramienta que permite aplicar estilos con clases directamente dentro de los componentes. Por ejemplo se puede trabajar con tamaños, espacios, colores, bordes y cajas para diferentes pantallas sin tener que declarar cada estilo por separado en un CSS.

En mi proyecto lo utilicé para construir la parte visual de la página y poder probar diferentes formas de presentar la información.

### Por qué decidí utilizarlo

Decidí utilizar Tailwind CSS porque quería experimentar con una manera diferente de trabajar el diseño de una página web. En proyectos anteriores había trabajado con CSS puro, pero en esta ocasión quería probar una herramienta que me permitiera construir y modificar el diseño de una forma más directa mientras iba desarrollando los componentes.

Esto porque estaba consciente de que el proyecto crecería y quería añadir el diseño directamente con los nuevos cambios sin depender del CSS. 

No quería que Forgotten Places se sintiera como un CRUD cualquiera y genérico. Yo quería que fuera un journal con sentido y transmitiera la idea de una revista. Esto también se puede lograr con CSS pero ya había utilizado tanto CSS que quería algo diferente. 

Con Tailwind puedo probar diferentes distribuciones hasta acercarme a esa idea que tengo en mente. Por ejemplo pude organizar las secciones en columnas, crear la portada inicial, hacer que las entradas parecieran páginas internas de una revista y adaptar todo. 

También lo elegí porque me permitió concentrarme en la apariencia general sin tener que detenerme a crear demasiadas clases nuevas para cada pequeño cambio. 

### Por qué no utilicé únicamente CSS puro

CSS puro sigue siendo parte de mi proyecto. De hecho lo utilicé para manejar las variables de colores del tema claro y oscuro, ya que esto era parte de los requisitos de la fase. 

Utilicé Tailwind para hacerlo más fácil, pero también porque quería conocer cómo se puede aplicar en un proyecto real de React y entender si me ayudaba a organizar mejor una idea visual, 

### Cómo lo utilicé en mi proyecto

Dentro de Forgotten Places utilicé Tailwind CSS para:
- la portada principal de la aplicación
- la estructura  de las secciones
- la página de nueva entrada
- la página de archivo de lugares
- los botones 
- los espacios y divisores entre contenidos
- la navegación por entradas 
- el formulario de edición
- la presentación visual de la puntuación con estrellas




---

## Uso de Anime.js

### Qué es Anime.js

Anime.js es una herramienta de JavaScript que permite agregar animaciones a elementos de una página web. En mi proyecto la utilicé para crear una interacción pequeña dentro de las categorías de cada lugar guardado.

### Por qué decidí utilizarlo

En los requisitos de la fase se solicitaba que cada categoría tuviera un nombre, un emoji y un color propio. Sin embargo, cuando probé mostrar los emojis directamente en la entrada sentí que no combinaban con la estética editorial que estaba construyendo. En la Fase 2 se me ocurrió una idea pero la quería con animación, fue en este momento que decidí implementar anime.js


Decidí utilizar Anime.js porque quería experimentar con una interacción más dinámica. En lugar de mostrar únicamente un dato estático, quise que la categoría tuviera un pequeño detalle interactivo que se sintiera relacionado con la idea de descubrir y ser algo más divertido. 

### Cómo lo utilicé en mi proyecto

En cada entrada del archivo aparece un círculo con el color correspondiente a la categoría del lugar:
- inicialmente se muestra el círculo de color
- al hacer clic sobre el círculo se ejecuta una animación
- después de la interacción aparece el emoji correspondiente a la categoría
- al volver a hacer clic el elemento regresa al círculo de color original

Por ejemplo, un lugar clasificado como naturaleza escondida puede mostrar inicialmente un círculo verde y al interactuar con él revelar el emoji relacionado con esa categoría.
---
