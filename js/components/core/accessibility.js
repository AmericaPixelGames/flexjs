let accessibilityEnabled = false;  // Estado inicial de accesibilidad
let originalTheme = null;  // Variable para almacenar el tema original
let highContrastEnabled = false;  // Estado de contraste alto
let currentZoom = 1;  // Zoom de texto actual

// Función principal del componente de accesibilidad
export function Accessibility() {
    return `
        <div id="accessibility-container" style="position: fixed; bottom: 10px; right: 10px; background: #333; color: #fff; padding: 10px; border-radius: 5px; z-index: 1000;">
            <p id="accessibility-message" style="color: #fff;">¿Deseas activar el modo accesible?</p>
            <button id="toggle-accessibility" class="btn btn-primary">Sí</button>

            <!-- Selector para modos de daltonismo -->
            <div style="margin-top: 10px;">
                <label for="color-blind-select">Modo Daltonismo:</label>
                <select id="color-blind-select" class="form-control">
                    <option value="none">Ninguno</option>
                    <option value="monochromacy">Monocromatismo</option>
                    <option value="protanopia">Protanopia (Rojo)</option>
                    <option value="deuteranopia">Deuteranopia (Verde)</option>
                    <option value="tritanopia">Tritanopia (Azul)</option>
                    <option value="protanomaly">Protanomalía (Rojo débil)</option>
                    <option value="deuteranomaly">Deuteranomalía (Verde débil)</option>
                    <option value="tritanomaly">Tritanomalía (Azul débil)</option>
                </select>
            </div>

            <!-- Control de zoom de texto -->
            <div style="margin-top: 10px;">
                <button id="increase-font" class="btn btn-secondary">Aumentar Texto</button>
                <button id="decrease-font" class="btn btn-secondary">Disminuir Texto</button>
            </div>

            <!-- Contraste alto -->
            <div style="margin-top: 10px;">
                <button id="toggle-contrast" class="btn btn-warning">Contraste Alto</button>
            </div>
        </div>
    `;
}

// Función para aplicar o quitar mejoras de accesibilidad
function toggleAccessibilityFeatures() {
    const body = document.body;

    if (!accessibilityEnabled) {
        // Activar accesibilidad
        body.style.backgroundColor = "#000";  // Fondo negro
        body.style.color = "#fff";  // Texto blanco

        // Leer el contenido en voz alta
        const textContent = body.innerText;
        const speech = new SpeechSynthesisUtterance(textContent);
        window.speechSynthesis.speak(speech);

        accessibilityEnabled = true;

        // Actualizar el mensaje de accesibilidad y el botón
        document.getElementById('accessibility-message').innerText = 'Modo accesible activado. ¿Deseas desactivarlo?';
        document.getElementById('toggle-accessibility').innerText = 'Desactivar';

        // Guardar el estado de accesibilidad en localStorage
        localStorage.setItem('accessibilityEnabled', 'true');
    } else {
        // Desactivar accesibilidad
        body.style.backgroundColor = "";  // Restaurar fondo original
        body.style.color = "";  // Restaurar color de texto original

        // Detener la lectura en voz alta
        window.speechSynthesis.cancel();

        accessibilityEnabled = false;

        // Actualizar el mensaje de accesibilidad y el botón
        document.getElementById('accessibility-message').innerText = '¿Deseas activar el modo accesible?';
        document.getElementById('toggle-accessibility').innerText = 'Activar';

        // Guardar el estado de accesibilidad en localStorage
        localStorage.setItem('accessibilityEnabled', 'false');
    }
}

// Función para aplicar el filtro de daltonismo
function loadColorBlindStylesheet(mode) {
    const themeLink = document.getElementById('theme-link');
    
    if (!themeLink) {
        console.error('No se encontró el elemento con id "theme-link".');
        return;
    }

    // Restaurar el tema original si el modo es 'none'
    if (mode === 'none') {
        const savedOriginalTheme = localStorage.getItem('originalTheme');
        themeLink.href = savedOriginalTheme ? savedOriginalTheme : themeLink.href;
        localStorage.setItem('colorBlindMode', 'none');
    } else {
        // Guardar el tema original si aún no está almacenado
        if (!originalTheme) {
            originalTheme = themeLink.href;
            localStorage.setItem('originalTheme', originalTheme);  // Guardar en localStorage
        }

        // Cambiar la hoja de estilos al tema de daltonismo seleccionado
        themeLink.href = `./css/theme/accessibility/${mode}.css`;

        // Guardar el modo de daltonismo en localStorage
        localStorage.setItem('colorBlindMode', mode);
    }
}

// Función para aumentar o disminuir el tamaño del texto
function adjustFontSize(increase = true) {
    currentZoom = increase ? currentZoom + 0.1 : currentZoom - 0.1;
    document.body.style.zoom = currentZoom;
    localStorage.setItem('fontSize', currentZoom);
}

// Función para activar/desactivar el contraste alto
function toggleHighContrast() {
    const body = document.body;
    if (!highContrastEnabled) {
        body.style.filter = "invert(1) hue-rotate(180deg)";
        highContrastEnabled = true;
        localStorage.setItem('highContrast', 'true');
    } else {
        body.style.filter = "";
        highContrastEnabled = false;
        localStorage.setItem('highContrast', 'false');
    }
}

// Inicializar configuraciones desde localStorage
function initializeAccessibilitySettings() {
    const savedAccessibility = localStorage.getItem('accessibilityEnabled') === 'true';
    const savedColorBlindMode = localStorage.getItem('colorBlindMode') || 'none';
    const savedZoom = localStorage.getItem('fontSize') || 1;
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    originalTheme = localStorage.getItem('originalTheme');  // Recuperar el tema original si está almacenado

    // Aplicar accesibilidad si estaba activada
    if (savedAccessibility) {
        toggleAccessibilityFeatures();
    }

    // Aplicar el modo de daltonismo si había uno guardado
    if (savedColorBlindMode !== 'none') {
        loadColorBlindStylesheet(savedColorBlindMode);
    }

    // Aplicar el zoom guardado
    document.body.style.zoom = savedZoom;
    currentZoom = parseFloat(savedZoom);

    // Aplicar el contraste alto si estaba activado
    if (savedContrast) {
        toggleHighContrast();
    }

    // Establecer el valor del selector de daltonismo
    document.getElementById('color-blind-select').value = savedColorBlindMode;
}

// Lógica de eventos para el botón de accesibilidad y la selección de daltonismo
export function setupAccessibilityEvents() {
    // Inicializar configuraciones desde localStorage
    initializeAccessibilitySettings();

    // Manejar el evento de clic para alternar la accesibilidad
    document.getElementById('toggle-accessibility').addEventListener('click', toggleAccessibilityFeatures);

    // Aplicar el modo de daltonismo seleccionado cuando cambie el valor del select
    document.getElementById('color-blind-select').addEventListener('change',  () =>{
        const selectedMode = document.getElementById('color-blind-select').value;
        loadColorBlindStylesheet(selectedMode);
    });

    // Ajustar el tamaño del texto
    document.getElementById('increase-font').addEventListener('click', () => adjustFontSize(true));
    document.getElementById('decrease-font').addEventListener('click', () => adjustFontSize(false));

    // Activar/desactivar el contraste alto
    document.getElementById('toggle-contrast').addEventListener('click', toggleHighContrast);
}
