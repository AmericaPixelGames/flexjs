import context from '../core/context.js';
// Function to apply the theme by selecting the corresponding CSS file
function applyTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    
    if (themeLink) {
        // Update the CSS file for the theme
        themeLink.href = `css/theme/${theme}.css`;
    } else {
        console.error('Element <link> with id "theme-link" not found');
    }
}

// Function to apply color blindness mode (if selected)
function applyColorBlindMode(colorBlindMode) {
    const themeLink = document.getElementById('theme-link'); // Use the same <link> for the theme

    if (!themeLink) {
        console.error('Element <link> with id "theme-link" not found');
        return;
    }

    if (colorBlindMode === 'none') {
        // Get the saved general theme from localStorage
        // If no color blindness mode, restore the standard theme from localStorage
        const selectedTheme = getTheme() || 'light';
        applyTheme(selectedTheme);
    } else {
        // Apply the color blindness theme
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

// Function to apply high contrast (if enabled)
function applyHighContrast(highContrastEnabled) {
    const body = document.body;
    
    if (highContrastEnabled === 'true') {
        body.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
        body.style.filter = ""; // Disable high contrast
    }
}

// Function to apply the font size (if configured)
function applyFontSize(fontSize) {
    const zoomLevel = fontSize || 1; // Default zoom is 1 (normal size)
    document.body.style.zoom = zoomLevel;
}

// Function to initialize the theme based on localStorage (includes color blindness and other settings)
function initializeTheme() {
    // Get the general theme saved in localStorage
    const selectedTheme = getTheme()  || 'light'; // Default theme is 'light'
    applyTheme(selectedTheme);

    // Get the color blindness mode saved in localStorage
    const colorBlindMode = localStorage.getItem('colorBlindMode') || 'none'; // Default is 'none'
    applyColorBlindMode(colorBlindMode);

    // Get the high contrast setting saved in localStorage
    const highContrast = localStorage.getItem('highContrast') || 'false'; // Default is no high contrast
    applyHighContrast(highContrast);

    // Get the font size saved in localStorage
    const fontSize = localStorage.getItem('fontSize') || 1; // Default is normal size
    applyFontSize(fontSize);
}

// Function to listen for theme, color blindness, contrast, and font size changes in localStorage
function monitorThemeChanges() {
    window.addEventListener('storage', (event) => {
        // Monitor changes to the general theme
        if (event.key === 'selectedTheme') {
            applyTheme(event.newValue);
        }

        // Monitor changes to color blindness mode
        if (event.key === 'colorBlindMode') {
            applyColorBlindMode(event.newValue);
        }

        // Monitor changes to high contrast
        if (event.key === 'highContrast') {
            applyHighContrast(event.newValue);
        }

        // Monitor changes to font size
        if (event.key === 'fontSize') {
            applyFontSize(event.newValue);
        }
    });
}

// Function to change the general theme and save it to localStorage
export function changeTheme(newTheme) {
    localStorage.setItem('selectedTheme', newTheme);
    applyTheme(newTheme);
}

// Function to change the color blindness mode and save it to localStorage
export function changeColorBlindMode(mode) {
    localStorage.setItem('colorBlindMode', mode);
    applyColorBlindMode(mode);
}

// Function to change high contrast and save it to localStorage
export function changeHighContrast(enabled) {
    localStorage.setItem('highContrast', enabled ? 'true' : 'false');
    applyHighContrast(enabled ? 'true' : 'false');
}

// Function to change the font size and save it to localStorage
export function changeFontSize(zoomLevel) {
    localStorage.setItem('fontSize', zoomLevel);
    applyFontSize(zoomLevel);
}

// Initialize the theme when the application loads
initializeTheme();

// Monitor theme, color blindness, contrast, and font size changes across all pages
monitorThemeChanges();
