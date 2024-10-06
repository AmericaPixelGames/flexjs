import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { HyperLinker } from '../components/core/hyperLinker.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar traducciones

export function LinkPage() {
    // Obtener el idioma del usuario y cargar las traducciones
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
        console.log('Página de Link cargada');
        basicLayoutPostRender();
    };

    return {
        layout: BasicLayout(content, {
             title: 'FlexJS', 
             footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
             head: Head({
                cssFiles: [
                    //'/css/styles.css', // Ejemplo de hoja de estilos
                ],
                jsFiles: [
                    //'/js/utils.js', // Ejemplo de archivo JS
                ]
            })
        }),
        postRender
    };
}
