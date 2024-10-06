// BasicLayout
import { Navbar, setupNavbarEvents } from '../components/core/navbar.js';
import { Footer } from '../components/core/footer.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Load translations

export function BasicLayout(content, options = {}) {
    const userLanguage = getUserLanguage();  // Get the user's language
    const translations = loadTranslations(userLanguage);  // Load translations

    const { 
        title = translations.basicLayout_title || 'My Application', 
        footerText = translations.basicLayout_footer || '© 2025 My Application',
        logoUrl = 'img/logo1.png'
    } = options;

    // Use translations for the navigation links
    const links = [
        { name: translations.navbar_home || 'Home', url: '/' },
        { name: translations.navbar_about || 'About', url: '/about' },
        { name: translations.navbar_details || 'Details', url: '/details/1' }
    ];

    // Add the LanguageSwitcher within the layout
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
                    ${content}  <!-- The specific page content is inserted here -->
                </main>
                ${Footer(footerText, logoUrl)} <!-- We use the Footer here -->
            </body>
        </html>
    `;
}

// Make sure to call `setupLanguageSwitcher` on every page after rendering
export function postRender() {
    setupNavbarEvents();  // Set up the switcher events after the DOM is ready
}
