# FlexJS – El Framework Modular y Rápido para la Web

Bienvenidos a **FlexJS**, un framework revolucionario para la creación de interfaces de usuario web modernas y dinámicas. Diseñado para ser fácil de usar tanto para desarrolladores expertos como para principiantes, **FlexJS** te proporciona un entorno potente y modular que simplifica la creación de aplicaciones web avanzadas.

## ¿Qué es FlexJS?

**FlexJS** es un framework rápido, modular y completamente enfocado en **JavaScript (99%)** y **HTML5 (1%)**. Su principal característica es la creación de componentes reutilizables, lo que permite construir interfaces complejas en un solo archivo HTML5, mejorando la seguridad y la eficiencia del desarrollo web. Ya sea que estés creando una página web sencilla o una aplicación compleja, **FlexJS** te ofrece herramientas poderosas y fáciles de integrar para acelerar tu desarrollo.

## Características clave de FlexJS

### 1. **Modularidad Completa**
Cada componente de **FlexJS** es independiente y reutilizable. Puedes mezclar y combinar módulos como tarjetas (**cards**), modales (**modals**), pestañas (**tabs**), imágenes adaptativas, video, audio y mucho más. FlexJS está diseñado para maximizar la modularidad, haciendo que tu código sea limpio y fácil de mantener.

### 2. **HTML5 Optimizado**
Usando solo un archivo HTML5, todo el contenido se renderiza y gestiona directamente desde JavaScript. Esto simplifica la configuración inicial y refuerza la seguridad de la aplicación al minimizar el número de archivos y posibles vulnerabilidades.

### 3. **Componentes Multimedia Avanzados**
**FlexJS** incluye componentes de video y audio con capacidades tanto de reproducción como de grabación, permitiendo seleccionar dispositivos de manera dinámica (cámara y micrófono). Además, cuenta con un sistema de eventos para manejar la codificación en **base64** de los videos grabados, y la gestión de dispositivos de entrada.

### 4. **Accesibilidad Mejorada**
Con **FlexJS**, la accesibilidad es una prioridad. El framework ofrece componentes diseñados para usuarios con discapacidades visuales y personas con daltonismo (incluyendo filtros para protanomalía, deuteranomalía, tritanomalía y monocromatismo). Además, incluye soporte para temas accesibles y modos que hacen las aplicaciones inclusivas desde el inicio.

### 5. **Contexto Progresivo**
El contexto progresivo de **FlexJS** utiliza el almacenamiento local (**localStorage**) para almacenar y acceder rápidamente a los datos de la aplicación. Este sistema permite realizar cambios dinámicos como cambiar el tema o eliminar información del usuario, con acciones rápidas y eficientes. Todo se almacena en tiempo real, facilitando la persistencia de datos a lo largo de la sesión del usuario.

## Componentes Principales de FlexJS

### 1. **Componente Modal**
Crea ventanas emergentes personalizables con eventos de guardado y cierre. Perfecto para mostrar contenido dinámico o recibir entradas del usuario.

### 2. **Selector de Temas**
Cambia dinámicamente entre temas claros, oscuros y personalizados. El selector de temas almacena la preferencia del usuario en el contexto de la aplicación, permitiendo una experiencia persistente.

### 3. **Componente de Imagen**
Muestra imágenes adaptativas y responsivas que se ajustan a la resolución del dispositivo, mejorando la experiencia del usuario en diferentes pantallas y dispositivos.

### 4. **Componente de Video**
El componente de video permite tanto la reproducción como la grabación, con soporte para diferentes dispositivos de entrada como cámaras y micrófonos. También ofrece la opción de descargar videos grabados o manipularlos como **base64**.

### 5. **Componente de Audio**
De forma similar al video, el componente de audio permite la reproducción y grabación de sonido, con la posibilidad de seleccionar y cambiar dispositivos de entrada (micrófonos).

### 6. **Componentes de Pestañas (Tabs)**
Permite organizar contenido en pestañas de manera horizontal o vertical. FlexJS te permite decidir si las pestañas se ubican a la izquierda o derecha para una mayor personalización.

### 7. **Componentes de Accesibilidad**
Incluye modos de accesibilidad como la lectura de pantalla, y la posibilidad de ajustar visualmente la aplicación para personas con discapacidades visuales, incluyendo filtros para diferentes tipos de daltonismo.

## ¿Para quién es FlexJS?

**FlexJS** es ideal tanto para desarrolladores principiantes como avanzados. Su estructura modular permite comenzar rápidamente con componentes predefinidos, mientras que su flexibilidad asegura que cualquier aspecto del framework puede ser personalizado para satisfacer las necesidades del desarrollador. Desde pequeñas páginas web hasta aplicaciones web complejas, **FlexJS** se adapta a todos los casos de uso.

## Ejemplo de Uso

```javascript
import { BasicLayout } from '../layouts/BasicLayout.js';
import { Card } from '../components/card.js';
import { Modal, showModal, handleModalEvents } from '../components/modal.js';
import context from '../core/context.js';

export function HomePage() {
  const content = `
    <h1>Bienvenido a FlexJS</h1>
    <button id="openModal">Abrir Modal</button>
    ${Modal({ id: 'exampleModal', title: 'Título del Modal', content: 'Contenido aquí' })}
  `;
  const postRender = () => {
    document.getElementById('openModal').addEventListener('click', () => showModal('exampleModal'));
  };
  return { layout: BasicLayout(content), postRender };
}
