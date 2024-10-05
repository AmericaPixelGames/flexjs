import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Image } from '../components/core/image.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar traducciones

export function ImagePage() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.imagePage_heading}</h2>
            <p>${translations.imagePage_description}</p>

            <h3 class="mt-4">${translations.imagePage_standardImage}</h3>
            ${Image({
                url: 'https://via.placeholder.com/600',
                width: '100%',
                height: 'auto',
                responsive: true
            })}

            <h3 class="mt-5">${translations.imagePage_adaptedImage}</h3>
            <div style="width: 400px; height: 250px; border: 1px solid #ccc;">
                ${Image({
                    url: 'https://via.placeholder.com/800x600',
                    width: '100%',
                    height: '100%',
                    adaptation: 'cover'
                })}
            </div>
        </section>
    `;

    const postRender = () => {
        console.log('Página de Imagen cargada');
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
