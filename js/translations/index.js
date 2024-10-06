import { es } from './es.js';
import { en } from './en.js';

// Contenedor de todas las traducciones
const translations = {
    es,
    en
};

// Función para cargar las traducciones según el idioma
export function loadTranslations(language) {
    return translations[language] || translations.en;  // Retorna 'en' por defecto si no existe el idioma
}

// Función para obtener el idioma del usuario
export function getUserLanguage() {
    return localStorage.getItem('language') || navigator.language.slice(0, 2);  // Idioma almacenado o idioma del navegador
}

// Función para cambiar el idioma y recargar la página
export function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    window.location.reload();  // Recargar la página para aplicar el nuevo idioma
}
