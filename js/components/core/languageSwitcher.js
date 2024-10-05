import { loadTranslations, getUserLanguage, changeLanguage } from '../../translations/index.js';

export function LanguageSwitcher() {
    const currentLanguage = getUserLanguage();
    const currentLabel = currentLanguage === 'es' ? 'Español' : 'English';

    return `
        <div class="form-group" id="language-switcher">
            <select id="language-select" class="form-control">
                <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>English</option>
                <option value="es" ${currentLanguage === 'es' ? 'selected' : ''}>Español</option>
            </select>
        </div>
    `;
}

export function setupLanguageSwitcher() {
    const selectElement = document.getElementById('language-select');

    // Escuchar el cambio de idioma en el select
    selectElement.addEventListener('change', function (event) {
        const selectedLanguage = event.target.value;
        changeLanguage(selectedLanguage);  // Cambiar el idioma y recargar la página
    });
}
