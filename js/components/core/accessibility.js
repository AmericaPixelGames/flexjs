let accessibilityEnabled = false;  // Initial accessibility state
let originalTheme = null;  // Variable to store the original theme
let highContrastEnabled = false;  // High contrast state
let currentZoom = 1;  // Current text zoom

// Main function of the accessibility component
export function Accessibility() {
    return `
        <div id="accessibility-container" style="position: fixed; bottom: 10px; right: 10px; background: #333; color: #fff; padding: 10px; border-radius: 5px; z-index: 1000;">
            <p id="accessibility-message" style="color: #fff;">Do you want to activate accessible mode?</p>
            <button id="toggle-accessibility" class="btn btn-primary">Yes</button>

            <!-- Selector for color blindness modes -->
            <div style="margin-top: 10px;">
                <label for="color-blind-select">Color Blind Mode:</label>
                <select id="color-blind-select" class="form-control">
                    <option value="none">None</option>
                    <option value="monochromacy">Monochromacy</option>
                    <option value="protanopia">Protanopia (Red)</option>
                    <option value="deuteranopia">Deuteranopia (Green)</option>
                    <option value="tritanopia">Tritanopia (Blue)</option>
                    <option value="protanomaly">Protanomaly (Weak Red)</option>
                    <option value="deuteranomaly">Deuteranomaly (Weak Green)</option>
                    <option value="tritanomaly">Tritanomaly (Weak Blue)</option>
                </select>
            </div>

            <!-- Text zoom control -->
            <div style="margin-top: 10px;">
                <button id="increase-font" class="btn btn-secondary">Increase Text</button>
                <button id="decrease-font" class="btn btn-secondary">Decrease Text</button>
            </div>

            <!-- High contrast -->
            <div style="margin-top: 10px;">
                <button id="toggle-contrast" class="btn btn-warning">High Contrast</button>
            </div>
        </div>
    `;
}

// Function to apply or remove accessibility enhancements
function toggleAccessibilityFeatures() {
    const body = document.body;

    if (!accessibilityEnabled) {
        // Enable accessibility
        body.style.backgroundColor = "#000";  // Black background
        body.style.color = "#fff";  // White text

        // Read the content out loud
        const textContent = body.innerText;
        const speech = new SpeechSynthesisUtterance(textContent);
        window.speechSynthesis.speak(speech);

        accessibilityEnabled = true;

        // Update accessibility message and button
        document.getElementById('accessibility-message').innerText = 'Accessible mode enabled. Do you want to disable it?';
        document.getElementById('toggle-accessibility').innerText = 'Disable';

        // Save accessibility state in localStorage
        localStorage.setItem('accessibilityEnabled', 'true');
    } else {
        // Disable accessibility
        body.style.backgroundColor = "";  // Restore original background
        body.style.color = "";  // Restore original text color

        // Stop the speech synthesis
        window.speechSynthesis.cancel();

        accessibilityEnabled = false;

        // Update accessibility message and button
        document.getElementById('accessibility-message').innerText = 'Do you want to activate accessible mode?';
        document.getElementById('toggle-accessibility').innerText = 'Activate';

        // Save accessibility state in localStorage
        localStorage.setItem('accessibilityEnabled', 'false');
    }
}

// Function to apply color blindness filter
function loadColorBlindStylesheet(mode) {
    const themeLink = document.getElementById('theme-link');
    
    if (!themeLink) {
        console.error('Element with id "theme-link" not found.');
        return;
    }

    // Restore original theme if mode is 'none'
    if (mode === 'none') {
        const savedOriginalTheme = localStorage.getItem('originalTheme');
        themeLink.href = savedOriginalTheme ? savedOriginalTheme : themeLink.href;
        localStorage.setItem('colorBlindMode', 'none');
    } else {
        // Save the original theme if not already stored
        if (!originalTheme) {
            originalTheme = themeLink.href;
            localStorage.setItem('originalTheme', originalTheme);  // Save to localStorage
        }

        // Change the stylesheet to the selected color blindness theme
        themeLink.href = `./css/theme/accessibility/${mode}.css`;

        // Save the color blindness mode in localStorage
        localStorage.setItem('colorBlindMode', mode);
    }
}

// Function to increase or decrease the text size
function adjustFontSize(increase = true) {
    currentZoom = increase ? currentZoom + 0.1 : currentZoom - 0.1;
    document.body.style.zoom = currentZoom;
    localStorage.setItem('fontSize', currentZoom);
}

// Function to toggle high contrast
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

// Initialize settings from localStorage
function initializeAccessibilitySettings() {
    const savedAccessibility = localStorage.getItem('accessibilityEnabled') === 'true';
    const savedColorBlindMode = localStorage.getItem('colorBlindMode') || 'none';
    const savedZoom = localStorage.getItem('fontSize') || 1;
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    originalTheme = localStorage.getItem('originalTheme');  // Retrieve the original theme if stored

    // Apply accessibility if it was enabled
    if (savedAccessibility) {
        toggleAccessibilityFeatures();
    }

    // Apply saved color blindness mode
    if (savedColorBlindMode !== 'none') {
        loadColorBlindStylesheet(savedColorBlindMode);
    }

    // Apply saved zoom level
    document.body.style.zoom = savedZoom;
    currentZoom = parseFloat(savedZoom);

    // Apply high contrast if it was enabled
    if (savedContrast) {
        toggleHighContrast();
    }

    // Set the value of the color blindness selector
    document.getElementById('color-blind-select').value = savedColorBlindMode;
}

// Event logic for accessibility button and color blindness selector
export function setupAccessibilityEvents() {
    // Initialize settings from localStorage
    initializeAccessibilitySettings();

    // Handle click event to toggle accessibility
    document.getElementById('toggle-accessibility').addEventListener('click', toggleAccessibilityFeatures);

    // Apply selected color blindness mode when the select value changes
    document.getElementById('color-blind-select').addEventListener('change',  () => {
        const selectedMode = document.getElementById('color-blind-select').value;
        loadColorBlindStylesheet(selectedMode);
    });

    // Adjust text size
    document.getElementById('increase-font').addEventListener('click', () => adjustFontSize(true));
    document.getElementById('decrease-font').addEventListener('click', () => adjustFontSize(false));

    // Toggle high contrast
    document.getElementById('toggle-contrast').addEventListener('click', toggleHighContrast);
}
