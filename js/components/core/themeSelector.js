import context from '../../core/context.js';
import { loadTranslations, getUserLanguage } from '../../translations/index.js';  // Cargar las traducciones

// Componente para cambiar el tema
export function ThemeSelector() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    return `
        <div class="form-group">
            <label for="theme-selector">${translations.themeSelector_label}</label>
            <select id="theme-selector" class="form-control">
                <option value="light">${translations.themeSelector_light}</option>
                <option value="dark">${translations.themeSelector_dark}</option>
                <option value="blue">${translations.themeSelector_blue}</option>
                <option value="purple">${translations.themeSelector_purple}</option>
            </select>
        </div>
    `;
}

// Función para aplicar el tema
function applyTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    themeLink.href = `css/theme/${theme}.css`;
}

// Función para obtener el tema guardado en el contexto
function getTheme() {
    context.loadInitialContext();
    context.loadProgressiveContext();
    const progressiveContext = context.getContext();
    const selectedTheme = progressiveContext.selectedTheme;
    return selectedTheme;
}

// Función para configurar los eventos del selector de temas
export function setupThemeSelector() {
    // Leer el tema seleccionado y aplicarlo
    const themeSelector = document.getElementById('theme-selector');

    // Opción para cargar el tema previamente seleccionado (por ejemplo, desde localStorage)
    const savedTheme = context.getContext().selectedTheme || 'light';
    themeSelector.value = savedTheme;
    applyTheme(savedTheme);

    themeSelector.addEventListener('change', function () {
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
    });

    // Guardar el tema seleccionado en el contexto para futuras sesiones
    themeSelector.addEventListener('change', function () {
        context.updateContext('selectedTheme', this.value);
    });
}
