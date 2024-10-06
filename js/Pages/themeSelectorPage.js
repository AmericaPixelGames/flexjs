import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { ThemeSelector, setupThemeSelector } from '../components/core/themeSelector.js';
import { Head } from '../components/core/head.js';
import { Image } from '../components/core/image.js';  // Import the image component
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations

export function ThemeSelectorPage() {
    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Main content of the page, including the theme selector
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.themeSelectorPage_heading}</h2>
            <p>${translations.themeSelectorPage_intro}</p>
            ${ThemeSelector()} <!-- Theme selector component -->

            <!-- Example of theme selector implementation (Image instead of code) -->
            <section class="mt-5">
                <h3 class="text-center">${translations.themeSelectorPage_exampleImplementation}</h3>
                ${Image({
                    url: '/img/examples/themeSelector.png',   // Image URL
                    width: '100%',                         // Responsive width
                    height: 'auto',                        // Auto height
                    responsive: true                       // Ensure image responsiveness
                })}
            </section>
        </section>
    `;

    const postRender = () => {
        setupThemeSelector(); // Initialize the theme selector
        basicLayoutPostRender(); // Call the basic layout's postRender if necessary
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Example stylesheet
                ],
                jsFiles: [
                    //'/js/utils.js', // Example JS file
                ]
            })
        }),
        postRender
    };
}
