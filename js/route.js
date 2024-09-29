import { renderPage } from './render.js';
import { HomePage } from './pages/home.js';
import { AboutPage } from './pages/about.js';
import { DetailsPage } from './pages/details.js';  // Ejemplo de página dinámica
import { TodoPage } from './pages/todo.js';  // Ejemplo de página dinámica

// Importar las nuevas páginas
import { ModalPage } from './pages/modalPage.js';
import { LinkPage } from './pages/linkPage.js';
import { TabsPage } from './pages/tabsPage.js';
import { ImagePage } from './pages/imagePage.js';
import { ThemeSelectorPage } from './pages/themeSelectorPage.js';
import { AccessibilityPage } from './pages/accessibilityPage.js';
import { SoporteMultimediaPage } from './pages/soporteMultimediaPage.js';

// Definir las rutas y las páginas asociadas
const routes = {
    '/': HomePage,
    '/about': AboutPage,
    '/details/:id': DetailsPage,  // Ruta dinámica
    '/todo/:id': TodoPage,  // Ruta dinámica
    '/modal': ModalPage,  // Página para el componente Modal
    '/link': LinkPage,  // Página para el componente Link
    '/tabs': TabsPage,  // Página para el componente Tabs
    '/image': ImagePage,  // Página para el componente Image
    '/theme-selector': ThemeSelectorPage,  // Página para el selector de temas
    '/accessibility': AccessibilityPage,  // Página para el componente de accesibilidad
    '/soporte-multimedia': SoporteMultimediaPage,  // Nueva ruta para Soporte Multimedia

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
