//BasicLayout
import { Navbar,setupNavbarEvents } from '../components/core/navbar.js';
import { Footer } from '../components/core/footer.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Cargar traducciones

export function BasicLayout(content, options = {}) {
    const userLanguage = getUserLanguage();  // Obtener el idioma del usuario
    const translations = loadTranslations(userLanguage);  // Cargar traducciones

    const { 
        title = translations.basicLayout_title || 'Mi Aplicación', 
        footerText = translations.basicLayout_footer || '© 2025 Mi Aplicación',
        logoUrl = 'img/logo1.png'
    } = options;

    // Usar traducciones para los enlaces de navegación
    const links = [
        { name: translations.navbar_home || 'Inicio', url: '/' },
        { name: translations.navbar_about || 'Acerca de', url: '/about' },
        { name: translations.navbar_details || 'Detalles', url: '/details/1' }
    ];

    // Añadir el LanguageSwitcher dentro del layout
    return `
        <!DOCTYPE html>
        <html lang="${userLanguage}">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${title}</title>
            </head>
            <body>
                <header>
                    ${Navbar('<span style="font-weight: bold;">Flex<span style="color:#078d88">JS</span></span> Framework', links, '/img/logo.png')}
                </header>

                <main class="container-fluid mt-4">
                    ${content}  <!-- Aquí se inserta el contenido específico de la página -->
                </main>
                ${Footer(footerText, logoUrl)} <!-- Usamos el Footer aquí -->
            </body>
        </html>
    `;
}

// Asegúrate de llamar a `setupLanguageSwitcher` en cada página después del renderizado
export function postRender() {
    setupNavbarEvents();  // Configurar los eventos del switcher después de que el DOM esté listo
}
