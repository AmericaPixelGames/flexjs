// Archivo: js/components/themeSelector.js

// Componente para cambiar el tema
export function ThemeSelector() {
    return `
        <div class="form-group">
            <label for="theme-selector">Elige un tema:</label>
            <select id="theme-selector" class="form-control">
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
                <option value="blue">Azul</option>
            </select>
        </div>
    `;
}

// Función para aplicar el tema
function applyTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    themeLink.href = `css/theme/${theme}.css`;
}

// Función para configurar los eventos del selector de temas
export function setupThemeSelector() {
    // Leer el tema seleccionado y aplicarlo
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.addEventListener('change', function () {
        console.log("mm1");
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
    });

    // Opción para cargar el tema previamente seleccionado (por ejemplo, desde localStorage)
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    themeSelector.value = savedTheme;
    applyTheme(savedTheme);

    // Guardar el tema seleccionado en localStorage para futuras sesiones
    themeSelector.addEventListener('change', function () {
        console.log("mm2");
        localStorage.setItem('selectedTheme', this.value);
    });
}
