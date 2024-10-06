import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { HyperLinker } from '../components/core/hyperLinker.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations

export function LinkPage() {
    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.linkPage_heading}</h2>
            <p>${translations.linkPage_description}</p>
            <div>
                ${HyperLinker({ href: '/about', label: translations.linkPage_link1, icon: 'icon icon-check' })}
                ${HyperLinker({ href: 'https://google.com', label: translations.linkPage_link2, icon: 'icon icon-plus' })}
            </div>
        </section>
    `;

    const postRender = () => {
        console.log('Link page loaded');
        basicLayoutPostRender();
    };

    return {
        layout: BasicLayout(content, {
             title: 'FlexJS', 
             footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
             head: Head({
                cssFiles: [
                    //'/css/styles.css', // Example CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Example JS file
                ]
            })
        }),
        postRender
    };
}
