
# FlexJS – El Framework Modular, Personalizable y Escalable para la Web

Bienvenidos a **FlexJS**, un framework revolucionario para la creación de interfaces de usuario web modernas y dinámicas. Diseñado para ser fácil de usar tanto para desarrolladores expertos como para principiantes, **FlexJS** te proporciona un entorno potente y modular que simplifica la creación de aplicaciones web avanzadas. **Cada componente, así como el propio framework, es completamente personalizable y escalable a nivel de código e implementación**, permitiendo que los desarrolladores adapten el framework a sus necesidades específicas.

Además, **FlexJS** permite la **implementación libre de librerías y plugins externos**, lo que significa que puedes integrar herramientas adicionales para expandir las funcionalidades del framework sin restricciones. También puedes utilizar **hojas de estilo CSS personalizadas** para diseñar una interfaz única, ajustada al estilo y necesidades de tu aplicación.

## ¿Qué es FlexJS?

**FlexJS** es un framework rápido, modular y completamente enfocado en **JavaScript (99%)** y **HTML5 (1%)**. Su principal característica es la creación de componentes reutilizables y **totalmente personalizables**, lo que permite construir interfaces complejas con flexibilidad, mejorando la seguridad y la eficiencia del desarrollo web. Ya sea que estés creando una página web sencilla o una aplicación compleja, **FlexJS** te ofrece herramientas poderosas y fáciles de integrar para acelerar tu desarrollo, con la posibilidad de **escalar** tu aplicación sin perder rendimiento ni organización.

## ¿Para quién es FlexJS?

**FlexJS** es ideal tanto para desarrolladores principiantes como avanzados. Su estructura modular permite comenzar rápidamente con componentes predefinidos, mientras que su flexibilidad y **capacidad de personalización** asegura que cualquier aspecto del framework puede ser ajustado o extendido para satisfacer las necesidades del proyecto.

## Características clave de FlexJS

### 1. **Modularidad y Personalización Completa**
Cada componente de **FlexJS** es independiente, reutilizable y completamente **personalizable**. Puedes mezclar y combinar módulos como tarjetas (**cards**), modales (**modals**), pestañas (**tabs**), imágenes adaptativas, video, audio y mucho más. **FlexJS** está diseñado para maximizar la modularidad, lo que permite escalar proyectos y personalizar el comportamiento de cada componente según las necesidades de la aplicación.

Además, **FlexJS** te permite agregar **librerías y plugins externos** libremente, lo que amplía las funcionalidades del framework sin interferir con su arquitectura principal. Puedes integrar desde herramientas para gráficos, hasta funcionalidades avanzadas como animaciones o validaciones.

### 2. **HTML5 Optimizado y Personalizable**
Usando solo un archivo HTML5, todo el contenido se renderiza y gestiona directamente desde JavaScript, lo que simplifica la configuración inicial y refuerza la seguridad del sitio. **Este enfoque es personalizable**, permitiendo que los desarrolladores ajusten la estructura HTML y optimicen la seguridad según los requerimientos específicos del proyecto.

### 3. **Estilos CSS Personalizados**
**FlexJS** te brinda la libertad de utilizar **hojas de estilo CSS personalizadas**, lo que permite a los desarrolladores adaptar completamente el diseño y estilo visual de su aplicación. Ya sea integrando **Bootstrap** para un diseño responsivo o aplicando tu propio **CSS**, el framework no impone restricciones sobre el diseño, dándote control total sobre el aspecto visual.

### 4. **Componentes Multimedia Avanzados y Escalables**
**FlexJS** incluye componentes de video y audio con capacidades tanto de reproducción como de grabación, permitiendo seleccionar dispositivos de manera dinámica (cámara y micrófono). **Estos componentes son escalables** para admitir flujos multimedia más complejos o integraciones con terceros, y pueden personalizarse para manejar diferentes formatos y resoluciones de archivo según sea necesario.

### 5. **Accesibilidad Mejorada y Configurable**
**FlexJS** prioriza la accesibilidad, ofreciendo componentes diseñados para usuarios con discapacidades visuales y personas con daltonismo. **Cada componente de accesibilidad es completamente configurable**, lo que permite ajustarlo para cumplir con las normas de accesibilidad o los requisitos específicos de un proyecto. Esto incluye un selector de temas que se puede personalizar para ofrecer diferentes esquemas de color y ajustes visuales para personas con diferentes tipos de discapacidades visuales.

### 6. **Contexto Progresivo Personalizable**
El núcleo de **FlexJS** incluye un sistema de contexto progresivo que utiliza **localStorage** para almacenar y acceder rápidamente a datos de la aplicación. **Este sistema es escalable y altamente personalizable**, lo que permite almacenar datos de usuarios, preferencias y más, de forma eficiente. Los desarrolladores pueden adaptar este contexto para ajustarse a las necesidades de almacenamiento dinámico o persistente de cualquier aplicación.

## Componentes Principales de FlexJS

Cada componente de **FlexJS** está diseñado para ser **personalizable** en cuanto a apariencia, comportamiento y funcionalidad. Los desarrolladores pueden **escalar** el uso de estos componentes para proyectos más grandes o más complejos, sin sacrificar la modularidad o la simplicidad.

### 1. **Componente Modal**
El componente modal permite crear ventanas emergentes personalizables, donde los eventos de cierre y guardado pueden ser personalizados por el desarrollador. Puedes **ajustar el contenido, los eventos, y el diseño** del modal según las necesidades de tu aplicación.

 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js';
import { Modal, showModal, handleModalEvents } from '../components/core/modal.js';
import { Head } from '../components/core/head.js';
export function ModalPage() {
    const modalId = 'modalExample';
    const content = `
        <section class="container mt-5">
            <!-- Botón para abrir el modal -->
            <button id="open-modal-btn" class="btn btn-primary">${translations.modalPage_openButton}</button>
            <!-- Ejemplo del componente Modal -->
            ${Modal({
                id: modalId,
                title: translations.modalPage_modalTitle,
                content: `<p>${translations.modalPage_modalContent}</p>`,
                onClose: () => alert('Hola mundo'),
                onSave: () => alert('Hola mundo')
            })}
        </section>
    `;
    const postRender = () => {
        document.getElementById('open-modal-btn').addEventListener('click', () => {
            showModal(modalId);  // Mostrar el modal
        });

        handleModalEvents(modalId, () => console.log(translations.modalPage_modalCloseAlert), () => console.log(translations.modalPage_modalSaveAlert));
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            })
        }),
        postRender// Inyección de eventos de JavaScript
    };
}
```

### 2. **Selector de Temas Personalizable**
El selector de temas permite cambiar entre varios temas (claro, oscuro y personalizados). **Los temas son completamente configurables**, y puedes crear nuevos temas según los colores y el estilo de tu aplicación. Las preferencias de tema se guardan en el contexto de la aplicación para que los usuarios siempre tengan una experiencia coherente.
 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { ThemeSelector, setupThemeSelector } from '../components/core/themeSelector.js';
import { Head } from '../components/core/head.js';
export function ThemeSelectorPage() {
    // Contenido principal de la página, incluyendo el selector de temas
    const content = `
        <section class="container mt-5">
            ${ThemeSelector()} <!-- Componente para seleccionar el tema -->
        </section>
    `;
    const postRender = () => {
        setupThemeSelector(); // Inicializar el selector de temas
        basicLayoutPostRender(); // Llamar al postRender del layout básico si es necesario
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            })
        }),
        postRender // Inyección de eventos de JavaScript
    };
}
```
### 3. **Componente de Imagen**
El componente de imagen se adapta a diferentes resoluciones de pantalla y dispositivos, con opciones para hacer la imagen **responsive** o adaptarse a diferentes contenedores. **Los desarrolladores pueden personalizar las opciones de adaptación**, ajustando cómo las imágenes se renderizan en la interfaz, mejorando la experiencia del usuario en diferentes dispositivos.
 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Image } from '../components/core/image.js';
import { Head } from '../components/core/head.js';
export function ImagePage() {
    const content = `
        <section class="container mt-5">
            ${Image({
                url: 'https://via.placeholder.com/600',
                width: '100%',
                height: 'auto',
                responsive: true
            })}
        </section>
    `;
    const postRender = () => {
        console.log('Página de Imagen cargada');
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            })
        }),
        postRender// Inyección de eventos de JavaScript
    };
}
```
### 4. **Componente de Video**
El componente de video permite tanto la reproducción como la grabación. **Puedes personalizar el formato de grabación, las entradas de cámara y micrófono**, y manejar los datos en formatos como base64 o blobs. Además, se pueden integrar diferentes resoluciones y formatos según los requerimientos de la aplicación.
 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Video, setupVideoEvents } from '../components/core/video.js';
import { Head } from '../components/core/head.js';
export function SoporteMultimediaPage() {
    const content = `
        <section class="container mt-5">
            <!--Ejemplo Video modo play-->
            ${Video({ mode: 'play', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' })}
            <!--Ejemplo Video modo record-->
            ${Video({ mode: 'record', onBase64Ready: handleBase64Video })}
            </section>
        </section>
    `;
    function handleBase64Video(base64) {
        console.log('Base64 del video grabado:', base64);
    }
    const postRender = () => {
        setupVideoEvents(handleBase64Video);
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            })
        }),
        postRender// Inyección de eventos de JavaScript
    };
}
```
### 5. **Componente de Audio**
Similar al componente de video, el componente de audio permite la reproducción y grabación con selección dinámica de dispositivos. **Puedes escalar la funcionalidad del componente para manejar diferentes fuentes de entrada y personalizar el formato de grabación de audio**.
 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Audio, setupAudioEvents } from '../components/core/audio.js';
import { Head } from '../components/core/head.js';
export function SoporteMultimediaPage() {
    const content = `
        <section class="container mt-5">
            <!--Ejemplo audio modo play-->
            ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}
            <!--Ejemplo audio modo record-->
            ${Audio({ mode: 'record', onBase64Ready: handleBase64Audio })}
        </section>
    `;

    function handleBase64Audio(base64) {
        console.log('Base64 del audio grabado:', base64);
    }
    const postRender = () => {
        setupAudioEvents(handleBase64Audio);
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            })
        }),
        postRender// Inyección de eventos de JavaScript
    };
}
```
### 6. **Componentes de Pestañas (Tabs)**
Los desarrolladores pueden personalizar la orientación (horizontal o vertical) y la posición (izquierda o derecha) de las pestañas. **El sistema de pestañas es escalable**, permitiendo cargar contenido dinámico o secciones enteras de la aplicación de forma modular.
 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Tabs, setupTabs } from '../components/core/tab.js';
import { Head } from '../components/core/head.js';
export function TabsPage() {
    const content = `
        <section class="container mt-5">
            <section class="mt-5">
                <!-- Ejemplo de Tabs Horizontales -->
                ${Tabs({
                    id: 'horizontal',
                    orientation: 'horizontal',
                    tabs: [
                        { title: translations.tabsPage_tab1, content: `<p>${translations.tabsPage_tab1Content}</p>` },
                        { title: translations.tabsPage_tab2, content: `<p>${translations.tabsPage_tab2Content}</p>` },
                        { title: translations.tabsPage_tab3, content: `<p>${translations.tabsPage_tab3Content}</p>` }
                    ]
                })}
               
            </section>
            <section class="mt-5">
                <!-- Ejemplo de Tabs Verticales -->
                ${Tabs({
                    id: 'vertical',
                    orientation: 'vertical',
                    position: 'left',
                    tabs: [
                        { title: translations.tabsPage_tabA, content: `<p>${translations.tabsPage_tabAContent}</p>` },
                        { title: translations.tabsPage_tabB, content: `<p>${translations.tabsPage_tabBContent}</p>` },
                        { title: translations.tabsPage_tabC, content: `<p>${translations.tabsPage_tabCContent}</p>` }
                    ]
                })}
            </section>
        </section>
    `;
    const postRender = () => {
        basicLayoutPostRender();
        setupTabs('vertical');
        setupTabs('horizontal');
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            }) 
        }),
        postRender// Inyección de eventos de JavaScript
    };
}
```
### 7. **Componentes de Accesibilidad**
Con **FlexJS**, puedes **configurar y personalizar** los modos de accesibilidad, activando la lectura de pantalla o aplicando ajustes visuales según el tipo de discapacidad. Los componentes de accesibilidad son totalmente configurables para adaptarse a los estándares de accesibilidad globales o a las necesidades particulares de los usuarios.
 **Ejemplo**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Accessibility, setupAccessibilityEvents } from '../components/core/accessibility.js';
import { Head } from '../components/core/head.js';
export function AccessibilityPage() {
    // Contenido de la página con las traducciones y la descripción del componente
    const content = `
        <section class="container mt-5">
            <!-- Componente de Accesibilidad -->
            ${Accessibility()}  <!-- Mostrar el componente de accesibilidad -->
        </section>
    `;
    const handleActivateAccessibility = (isEnabled) => {
        if (isEnabled) {
            console.log("Modo accesible activado");
        } else {
            console.log("Modo accesible desactivado");
        }
    };
    const postRender = () => {
        setupAccessibilityEvents(handleActivateAccessibility);
        basicLayoutPostRender();  // Llamar al postRender básico si es necesario
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inyección de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Inyección de archivo JS
                ]
            })
        }),
        postRender// Inyección de eventos de JavaScript
    };
}

```
### Detalles del Framework FlexJS

Conoce cómo funciona **FlexJS**, su estructura modular y cómo optimiza el desarrollo web moderno.
**FlexJS** está diseñado para optimizar el desarrollo web moderno, brindando flexibilidad y personalización en cada aspecto de la aplicación. A continuación, se detallan algunas de sus características clave:

### **Enrutamiento Dinámico y Renderizado**
**FlexJS** utiliza un único archivo index.html para manejar la renderización de todo el contenido de la aplicación. La navegación se realiza sin recargar la página, gracias a un sistema de enrutamiento dinámico gestionado por router.js y render.js. Este sistema se encarga de interpretar la URL del navegador, extraer parámetros y renderizar la página adecuada sin necesidad de recargar toda la interfaz.

El proceso incluye:

router.js: Este archivo descompone la URL y extrae los parámetros necesarios para determinar qué componente o página debe cargarse.
 **Router.js**
```javascript
import { renderPage } from './render.js';
import { HomePage } from '../pages/home.js';
import { AboutPage } from '../pages/about.js';
import { DetailsPage } from '../pages/details.js';  // Ejemplo de página dinámica

// Definir las rutas y las páginas asociadas
const routes = {
    '/': HomePage,
    '/about': AboutPage,
    '/details/:id': DetailsPage,  // Ruta dinámica
};

// Función para extraer parámetros dinámicos de una ruta
function extractParams(route, url) {
    const routeParts = route.split('/');
    const urlParts = url.split('/');
    const params = {};

    routeParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1);  // Quita el ":"
            params[paramName] = urlParts[index];  // Extrae el valor del parámetro
        }
    });

    return params;
}

// Función que compara la ruta y la URL actual
function matchRoute(route, url) {
    const routeParts = route.split('/');
    const urlParts = url.split('/');

    if (routeParts.length !== urlParts.length) {
        return false;  // Diferente número de partes, no hay coincidencia
    }

    return routeParts.every((part, index) => {
        return part.startsWith(':') || part === urlParts[index];
    });
}

// Función que obtiene la ruta actual de la URL (sin hash)
function getCurrentPath() {
    return window.location.pathname || '/';
}

// Función que gestiona el enrutamiento
function router() {
    const path = getCurrentPath();

    // Buscar coincidencias de la ruta en la lista de rutas
    const matchedRoute = Object.keys(routes).find(route => matchRoute(route, path));

    if (matchedRoute) {
        // Extraer parámetros si es una ruta dinámica
        const params = extractParams(matchedRoute, path);
        const page = routes[matchedRoute];

        // Verificar si la página devuelve un layout y postRender
        const { layout, postRender } = page(params);  // Pasar los parámetros a la página

        if (layout) {
            renderPage(layout, 'app', postRender);  // Renderizar con layout y postRender
        } else {
            renderPage(page(params));  // Si no hay layout, renderizar directamente
        }
    } else {
        renderPage('Página no encontrada');
    }
}

// Función para navegar a una nueva ruta
export function navigateTo(url) {
    window.history.pushState({}, '', url);  // Actualiza la URL sin recargar la página
    router();  // Llama al enrutador para cargar la nueva ruta
}

// Escuchar el evento "popstate" para manejar el botón de atrás/adelante del navegador
window.addEventListener('popstate', router);

// Llamar al router al cargar la página por primera vez
window.addEventListener('load', router);

```
render.js: Este archivo se encarga de inyectar dinámicamente el contenido en el DOM, haciendo que la navegación dentro de la aplicación sea fluida y sin interrupciones visuales.
 **Render.js**
```javascript
// Archivo: js/render.js

/**
 * Función de renderizado que inserta contenido HTML dinámicamente en el DOM
 * y ejecuta cualquier lógica adicional (eventos) después del renderizado.
 * 
 * @param {string} component - El HTML del componente o página a renderizar.
 * @param {string} target - El selector del contenedor donde se renderizará el contenido.
 * @param {Function} [postRender] - Función opcional que se ejecuta después de renderizar el contenido.
 */
export function renderPage(component, target = 'app', postRender = null) {
    const container = document.getElementById(target); 
    
    if (container&& component!=undefined) {
        // Renderiza el contenido HTML en el contenedor especificado
        container.innerHTML = component;

        // Si se pasa una función postRender, se ejecuta después del renderizado
        if (typeof postRender === 'function') {
            postRender();
        }
    } else {
        //console.error(`Contenedor ${target} no encontrado en el DOM.`);
    }
}
```
### **Contexto Progresivo y Persistencia de Datos**
Para gestionar el estado de la aplicación, **FlexJS** implementa un sistema de contexto progresivo, el cual almacena los datos localmente utilizando localStorage. Esto permite mantener la persistencia de la información del usuario a lo largo de la sesión, incluso si se recarga la página o se cierra el navegador.

El flujo de persistencia incluye:

Contexto Inicial: Al iniciar la aplicación, se carga información predefinida en el contexto para configurar el estado inicial.
Contexto Progresivo: A medida que el usuario interactúa con la aplicación, el contexto se actualiza dinámicamente, almacenando datos clave de manera eficiente.
context.js: Este archivo interactúa directamente con el contextStorage.js, facilitando la lectura y escritura de los datos de contexto ContextoProgresivo, y asegurando que estos estén disponibles en futuras sesiones.
 **context.js**
```javascript
// context.js - Gestión del contexto de la aplicación
import contextStorage from './contextStorage.js';
const context = (() => {
    // El contexto inicial cargado cuando la app se inicia
    const initialContext = {
        appName: "Mi Framework",
        version: "1.0",
        user: {
            name: "Usuario",
        },
        selectedTheme: "blue",
        highContrast: 'false',
        fontSize:"1",
        colorBlindMode: "none"
    };
    // El contexto progresivo donde el usuario agrega o modifica datos
    let progressiveContext = {};

    // Cargar el contexto inicial en memoria y en localStorage al iniciar la app
    function loadInitialContext() {
        contextStorage.setItem('appContext', initialContext);  // Guarda el contexto inicial en localStorage
        progressiveContext = { ...initialContext };  // Carga el contexto inicial en memoria
    }
    // Obtener el contexto completo (progresivo o inicial) en tiempo real
    function getContext() {
        return progressiveContext;
    }
    // Obtener un valor específico del contexto por su clave (key) para initialContext o progressiveContext
    function getContextValue(key, contextType = 'progressive') {
        if (contextType === 'initial') {
            return getNestedValue(initialContext, key);
        } else {
            return getNestedValue(progressiveContext, key);
        }
    }
    // Actualizar un valor específico en el contexto progresivo y almacenarlo en localStorage
    function updateContext(key, value) {
        setNestedValue(progressiveContext, key, value);
        contextStorage.setItem('appContext', progressiveContext);  // Guarda el contexto actualizado en localStorage
    }
    // Función para agregar nuevos datos al contexto progresivo
    function addToContext(key, value) {
        if (!getNestedValue(progressiveContext, key)) {
            // Solo agregar si la clave no existe en el contexto progresivo
            setNestedValue(progressiveContext, key, value);
            contextStorage.setItem('appContext', progressiveContext);  // Actualizar el almacenamiento en localStorage
        } else {
            console.warn(`La clave ${key} ya existe en el contexto progresivo.`);
        }
    }
    // Eliminar una clave específica del contexto progresivo
    function removeFromContext(key) {
        deleteNestedValue(progressiveContext, key);
        contextStorage.setItem('appContext', progressiveContext);  // Actualiza el localStorage
    }
    // Cargar el contexto progresivo desde localStorage (si existe)
    function loadProgressiveContext() {
        const storedContext = contextStorage.getItem('appContext');
        if (storedContext) {
            progressiveContext = { ...storedContext };  // Cargar el contexto guardado en memoria
        } else {
            loadInitialContext();  // Si no hay contexto guardado, carga el inicial
        }
    }
    // Función utilitaria para obtener un valor anidado por clave
    function getNestedValue(obj, key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
    }
    // Función utilitaria para actualizar un valor anidado por clave
    function setNestedValue(obj, key, value) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1) {
                o[i] = value;
            } else {
                o[i] = o[i] || {};
            }
            return o[i];
        }, obj);
    }
    // Función utilitaria para eliminar un valor anidado por clave
    function deleteNestedValue(obj, key) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1 && o) {
                delete o[i];
            }
            return o ? o[i] : undefined;
        }, obj);
    }
    // Exportar las funciones del contexto
    return {
        loadInitialContext,
        getContext,
        getContextValue,
        updateContext,
        addToContext,
        removeFromContext,
        loadProgressiveContext
    };

})();
export default context;
```
contextStorage.js: Este archivo interactúa directamente con el localStorage, facilitando la lectura y escritura de los datos de contexto, y asegurando que estos estén disponibles en futuras sesiones.
 **contextStorage.js**
```javascript
// contextStorage.js - Gestión del localStorage
const contextStorage = (() => {
    // Guarda un objeto JSON en localStorage con una clave específica
    function setItem(key, value) {
        try {
            const valueString = JSON.stringify(value);
            localStorage.setItem(key, valueString);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }
    // Obtiene un objeto JSON de localStorage basado en la clave
    function getItem(key) {
        try {
            const valueString = localStorage.getItem(key);
            return valueString ? JSON.parse(valueString) : null;
        } catch (error) {
            console.error('Error al recuperar de localStorage:', error);
            return null;
        }
    }
    // Elimina un elemento del localStorage basado en la clave
    function removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error al eliminar de localStorage:', error);
        }
    }
    // Limpia todo el localStorage (opcional si quieres reiniciar el almacenamiento)
    function clearStorage() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error al limpiar el localStorage:', error);
        }
    }
    // Exporta las funciones que estarán disponibles externamente
    return {
        setItem,
        getItem,
        removeItem,
        clearStorage
    };
})();
export default contextStorage;
```
### **Funcionalidades de Accesibilidad y Traducción**
**FlexJS** se compromete con la accesibilidad y la internacionalización, facilitando una experiencia inclusiva para todos los usuarios. Las principales características incluyen:

Traducción Dinámica: El framework permite cambiar el idioma de la aplicación en tiempo real, cargando las traducciones necesarias desde archivos específicos sin afectar el rendimiento.
En traducción el index.js es el encargado de servir las variables constantes de tipo json que contienen las traducciones según el idioma seleccionado.
Accesibilidad Mejorada: **FlexJS** incluye funcionalidades diseñadas para mejorar la experiencia de usuarios con discapacidades visuales o de percepción de colores, como el soporte para lectura de pantalla y modos de alto contraste.

**Este archivo está sujeto a cambios a medida que el framework evolucione**.

© 2024 FlexJS - Desarrollado por [AmericaPixelGames.com](https://americapixelgames.com)

