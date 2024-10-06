import { es } from './es.js';
import { en } from './en.js';

// Container for all translations
const translations = {
    es,
    en
};

// Function to load translations based on the language
export function loadTranslations(language) {
    return translations[language] || translations.en;  // Returns 'en' by default if the language doesn't exist
}

// Function to get the user's language
export function getUserLanguage() {
    return localStorage.getItem('language') || navigator.language.slice(0, 2);  // Stored language or browser language
}

// Function to change the language and reload the page
export function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    window.location.reload();  // Reload the page to apply the new language
}
