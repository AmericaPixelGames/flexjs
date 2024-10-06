import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js';
import { ThemeSelector, setupThemeSelector } from '../components/core/themeSelector.js';
import { Head } from '../components/core/head.js';
export function SimpleThemeSelectorPage() {

    // Contenido principal de la página, incluyendo el selector de temas
    const content = `
        <section class="container mt-5">
            ${ThemeSelector()} <!-- Componente para seleccionar el tema -->
        </section>
    `;

    const postRender = () => {
        setupThemeSelector(); // Inicializar el selector de temas
        basicLayoutPostRender(); // Llamar al postRender del layout básico si es necesario
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS - Selector de Tema Simple', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Archivos CSS necesarios
                ],
                jsFiles: [
                    //'/js/utils.js', // Archivos JS necesarios
                ]
            })
        }),
        postRender
    };
}



