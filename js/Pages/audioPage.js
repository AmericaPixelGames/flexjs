import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Audio, setupAudioEvents } from '../components/core/audio.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar traducciones

export function AudioPage() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.audioPage_heading}</h2>
            <p>${translations.audioPage_description}</p>

            <h3>${translations.audioPage_play}</h3>
            ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}

            <h3 class="mt-5">${translations.audioPage_record}</h3>
            ${Audio({ mode: 'record' })}
        </section>
    `;

    const postRender = () => {
        setupAudioEvents();
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
