import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js';
import { ThemeSelector, setupThemeSelector } from '../components/core/themeSelector.js';
import { Head } from '../components/core/head.js';
export function SimpleThemeSelectorPage() {

    // Main content of the page, including the theme selector
    const content = `
        <section class="container mt-5">
            ${ThemeSelector()} <!-- Theme selector component -->
        </section>
    `;

    const postRender = () => {
        setupThemeSelector(); // Initialize the theme selector
        basicLayoutPostRender(); // Call the basic layout postRender if needed
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS - Simple Theme Selector', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Required CSS files
                ],
                jsFiles: [
                    //'/js/utils.js', // Required JS files
                ]
            })
        }),
        postRender
    };
}
