import context from '../core/context.js';
// Función para aplicar el tema seleccionando el archivo CSS correspondiente
function applyTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    
    if (themeLink) {
        // Actualizar el archivo CSS del tema
        themeLink.href = `css/theme/${theme}.css`;
    } else {
        console.error('Elemento <link> con id "theme-link" no encontrado');
    }
}

// Función para aplicar el tema de daltonismo (si está seleccionado)
function applyColorBlindMode(colorBlindMode) {
    const themeLink = document.getElementById('theme-link'); // Usar el mismo <link> para el tema

    if (!themeLink) {
        console.error('Elemento <link> con id "theme-link" no encontrado');
        return;
    }

    if (colorBlindMode === 'none') {
        // Obtener el tema general guardado en localStorage
        // Si no hay daltonismo, restaurar el tema estándar desde localStorage
        const selectedTheme = getTheme() || 'light';
        applyTheme(selectedTheme);
    } else {
        // Aplicar el tema de daltonismo
        themeLink.href = `css/theme/accessibility/${colorBlindMode}.css`;
    }
}
function getTheme(){
    //context.loadInitialContext();
    context.loadProgressiveContext();
    const progressiveContext = context.getContext();
    const selectedTheme = progressiveContext.selectedTheme;
    return selectedTheme;
}
// Función para aplicar el contraste alto (si está activado)
function applyHighContrast(highContrastEnabled) {
    const body = document.body;
    
    if (highContrastEnabled === 'true') {
        body.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
        body.style.filter = ""; // Desactivar el contraste alto
    }
}

// Función para aplicar el tamaño de fuente (si está configurado)
function applyFontSize(fontSize) {
    const zoomLevel = fontSize || 1; // Por defecto, zoom 1 (tamaño normal)
    document.body.style.zoom = zoomLevel;
}

// Función para inicializar el tema basado en localStorage (incluye daltonismo y otras configuraciones)
function initializeTheme() {
    // Obtener el tema general guardado en localStorage
    const selectedTheme = getTheme()  || 'light'; // Por defecto, tema 'light'
    applyTheme(selectedTheme);

    // Obtener el modo de daltonismo guardado en localStorage
    const colorBlindMode = localStorage.getItem('colorBlindMode') || 'none'; // Por defecto, 'none'
    applyColorBlindMode(colorBlindMode);

    // Obtener el contraste alto guardado en localStorage
    const highContrast = localStorage.getItem('highContrast') || 'false'; // Por defecto, no hay contraste alto
    applyHighContrast(highContrast);

    // Obtener el tamaño de fuente guardado en localStorage
    const fontSize = localStorage.getItem('fontSize') || 1; // Por defecto, tamaño normal
    applyFontSize(fontSize);
}

// Función para escuchar los cambios de tema, daltonismo, contraste y fuente en localStorage
function monitorThemeChanges() {
    window.addEventListener('storage', (event) => {
        // Monitorear cambios en el tema general
        if (event.key === 'selectedTheme') {
            applyTheme(event.newValue);
        }

        // Monitorear cambios en el modo de daltonismo
        if (event.key === 'colorBlindMode') {
            applyColorBlindMode(event.newValue);
        }

        // Monitorear cambios en el contraste alto
        if (event.key === 'highContrast') {
            applyHighContrast(event.newValue);
        }

        // Monitorear cambios en el tamaño de fuente
        if (event.key === 'fontSize') {
            applyFontSize(event.newValue);
        }
    });
}

// Función para cambiar el tema general y guardarlo en localStorage
export function changeTheme(newTheme) {
    localStorage.setItem('selectedTheme', newTheme);
    applyTheme(newTheme);
}

// Función para cambiar el modo de daltonismo y guardarlo en localStorage
export function changeColorBlindMode(mode) {
    localStorage.setItem('colorBlindMode', mode);
    applyColorBlindMode(mode);
}

// Función para cambiar el contraste alto y guardarlo en localStorage
export function changeHighContrast(enabled) {
    localStorage.setItem('highContrast', enabled ? 'true' : 'false');
    applyHighContrast(enabled ? 'true' : 'false');
}

// Función para cambiar el tamaño de fuente y guardarlo en localStorage
export function changeFontSize(zoomLevel) {
    localStorage.setItem('fontSize', zoomLevel);
    applyFontSize(zoomLevel);
}

// Inicializar el tema al cargar la aplicación
initializeTheme();

// Monitorear los cambios de tema, daltonismo, contraste y fuente en todas las páginas
monitorThemeChanges();
