import context from '../../core/context.js';
import { loadTranslations, getUserLanguage } from '../../translations/index.js';  // Load translations

// Component to change the theme
export function ThemeSelector() {
    // Get the user's language and load translations
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

// Function to apply the theme
function applyTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    themeLink.href = `css/theme/${theme}.css`;
}

// Function to get the saved theme from the context
function getTheme() {
    context.loadInitialContext();
    context.loadProgressiveContext();
    const progressiveContext = context.getContext();
    const selectedTheme = progressiveContext.selectedTheme;
    return selectedTheme;
}

// Function to set up theme selector events
export function setupThemeSelector() {
    // Read the selected theme and apply it
    const themeSelector = document.getElementById('theme-selector');

    // Option to load the previously selected theme (e.g., from localStorage)
    const savedTheme = context.getContext().selectedTheme || 'light';
    themeSelector.value = savedTheme;
    applyTheme(savedTheme);

    themeSelector.addEventListener('change', function () {
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
    });

    // Save the selected theme in the context for future sessions
    themeSelector.addEventListener('change', function () {
        context.updateContext('selectedTheme', this.value);
    });
}
