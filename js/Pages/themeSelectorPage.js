import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { ThemeSelector, setupThemeSelector } from '../components/core/themeSelector.js';
import { Head } from '../components/core/head.js';
import { Image } from '../components/core/image.js';  // Importar el componente de imagen
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar traducciones

export function ThemeSelectorPage() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Contenido principal de la página, incluyendo el selector de temas
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.themeSelectorPage_heading}</h2>
            <p>${translations.themeSelectorPage_intro}</p>
            ${ThemeSelector()} <!-- Componente para seleccionar el tema -->

            <!-- Ejemplo de implementación del selector de temas (Imagen en lugar de código) -->
            <section class="mt-5">
                <h3 class="text-center">${translations.themeSelectorPage_exampleImplementation}</h3>
                ${Image({
                    url: '/img/examples/themeSelector.png',   // URL de la imagen
                    width: '100%',                         // Ancho responsive
                    height: 'auto',                        // Altura automática
                    responsive: true                       // Imagen responsive
                })}
            </section>
        </section>
    `;

    const postRender = () => {
        setupThemeSelector(); // Inicializar el selector de temas
        basicLayoutPostRender(); // Llamar al postRender del layout básico si es necesario
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
