let accessibilityEnabled = false;  // Estado inicial de accesibilidad
let colorBlindMode = null;  // Estado del modo de daltonismo (ninguno por defecto)
let currentStylesheet = null; // Variable para almacenar la hoja de estilos actual
let oldStyle = null;//El thema anterior 
export function Accessibility() {
    return `
        <div id="accessibility-container" style=" bottom: 10px; right: 10px; background: #333; color: #fff; padding: 10px; border-radius: 5px;">
            <p id="accessibility-message">¿Deseas activar el modo accesible?</p>
            <button id="toggle-accessibility" class="btn btn-primary">Sí</button>

            <!-- Nuevo botón para activar el modo daltonismo -->
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
        </div>
    `;
}

// Función para aplicar o quitar mejoras de accesibilidad
function toggleAccessibilityFeatures(onActivateAccessibility = null) {
    const body = document.body;

    if (!accessibilityEnabled) {
        // Activar accesibilidad
        body.style.backgroundColor = "#000";  // Fondo negro
        body.style.color = "#fff";  // Texto blanco
        body.style.fontSize = "1.5em";  // Aumentar tamaño de texto

        // Leer el contenido en voz alta
        const textContent = body.innerText;
        const speech = new SpeechSynthesisUtterance(textContent);
        window.speechSynthesis.speak(speech);

        // Cambiar el estado a "activado"
        accessibilityEnabled = true;

        // Cambiar la interfaz del botón para desactivar
        document.getElementById('accessibility-message').innerText = 'Modo accesible activado. ¿Deseas desactivarlo?';
        document.getElementById('toggle-accessibility').innerText = 'Desactivar';
    } else {
        // Desactivar accesibilidad
        body.style.backgroundColor = "";  // Volver al fondo normal
        body.style.color = "";  // Volver al color de texto normal
        body.style.fontSize = "";  // Volver al tamaño de texto normal

        // Detener cualquier lectura de voz
        window.speechSynthesis.cancel();

        // Cambiar el estado a "desactivado"
        accessibilityEnabled = false;

        // Cambiar la interfaz del botón para activar de nuevo
        document.getElementById('accessibility-message').innerText = '¿Deseas activar el modo accesible?';
        document.getElementById('toggle-accessibility').innerText = 'Activar';
    }

    // Si el callback está definido, lo llamamos (seguro para activar o desactivar)
    if (onActivateAccessibility && typeof onActivateAccessibility === 'function') {
        onActivateAccessibility(accessibilityEnabled);  // Pasar el estado actual (true o false)
    }
}

// Función para cargar y aplicar la hoja de estilos correspondiente al tipo de daltonismo
function loadColorBlindStylesheet(mode) {
    currentStylesheet = document.getElementById('theme-link');
    if (mode === 'none') {
        currentStylesheet.href = oldStyle;  // No aplicar ningún estilo si se selecciona "Ninguno"
        return;
    }

    // Cargar la hoja de estilos del modo de daltonismo seleccionado
    oldStyle = currentStylesheet.href;
    currentStylesheet.rel = 'stylesheet';
    currentStylesheet.href = `./css/theme/accessibility/${mode}.css`;  // Cargar la hoja de estilos según el modo seleccionado
    document.head.appendChild(currentStylesheet);
}

// Función para aplicar el filtro de daltonismo usando hojas de estilo
function applyColorBlindMode() {
    const selectedMode = document.getElementById('color-blind-select').value;
    loadColorBlindStylesheet(selectedMode);  // Cargar y aplicar la hoja de estilo correspondiente
}

// Lógica de eventos para el botón de accesibilidad
export function setupAccessibilityEvents(onActivateAccessibility = null) {
    // Alternar accesibilidad al hacer clic
    document.getElementById('toggle-accessibility').addEventListener('click', () => {
        toggleAccessibilityFeatures(onActivateAccessibility);  // Pasar el callback
    });

    // Aplicar el filtro de daltonismo
    document.getElementById('color-blind-select').addEventListener('change', applyColorBlindMode);
}
