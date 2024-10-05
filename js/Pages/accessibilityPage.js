import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Accessibility, setupAccessibilityEvents } from '../components/core/accessibility.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar traducciones
import { Image } from '../components/core/image.js';  // Importar el componente de imagen

export function AccessibilityPage() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Contenido de la página con las traducciones y la descripción del componente
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.accessibilityPage_heading}</h2>
            <p>${translations.accessibilityPage_description}</p>

            <!-- Componente de Accesibilidad -->
            <h3>${translations.accessibilityPage_componentTitle}</h3>
            ${Accessibility()}  <!-- Mostrar el componente de accesibilidad -->

            <!-- Descripción del Componente -->
            <section class="mt-5">
                <h3>${translations.accessibilityPage_descriptionTitle}</h3>
                <p>${translations.accessibilityPage_descriptionContent}</p>
                
                <!-- Funciones y Propiedades -->
                <h4>${translations.accessibilityPage_functionsTitle}</h4>
                <ul>
                    <li><strong>toggleAccessibilityFeatures:</strong> ${translations.accessibilityPage_toggleAccessibilityDescription}</li>
                    <li><strong>loadColorBlindStylesheet:</strong> ${translations.accessibilityPage_loadColorBlindDescription}</li>
                    <li><strong>adjustFontSize:</strong> ${translations.accessibilityPage_adjustFontDescription}</li>
                    <li><strong>toggleHighContrast:</strong> ${translations.accessibilityPage_toggleContrastDescription}</li>
                </ul>

                <!-- Ejemplo de Implementación (Como Imagen) -->
                <section class="mt-5">
                    <h4>${translations.accessibilityPage_exampleTitle}</h4>
                    ${Image({
                        url: '/img/examples/accessibility.png',  // Ruta a la imagen del ejemplo
                        alt: 'Ejemplo de Código de Accesibilidad',
                        width: '100%',  // Ancho máximo para que sea responsiva
                        height: 'auto',  // Mantener la relación de aspecto
                        responsive: true
                    })}
                </section>
            </section>
        </section>
    `;

    const handleActivateAccessibility = (isEnabled) => {
        if (isEnabled) {
            console.log("Modo accesible activado");
        } else {
            console.log("Modo accesible desactivado");
        }
    };

    const postRender = () => {
        setupAccessibilityEvents(handleActivateAccessibility);
        basicLayoutPostRender();  // Llamar al postRender básico si es necesario
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
