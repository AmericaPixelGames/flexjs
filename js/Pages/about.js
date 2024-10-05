import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Card } from '../components/core/card.js';
import { navigateTo } from '../core/router.js';
import { Head } from '../components/core/head.js';
import { Image } from '../components/core/image.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar sistema de traducciones

// Página About (Acerca de)
export function AboutPage() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <!-- Encabezado Principal -->
        <section class="container mt-5" aria-labelledby="about-heading">
            <h1 id="about-heading" class="text-center">${translations.about_heading}</h1>
            <p class="lead text-center">${translations.about_intro}</p>
        </section>

        <!-- Características del Framework -->
        <section class="container mt-5" aria-labelledby="framework-features">
            <h2 id="framework-features" class="text-center">${translations.about_features_heading}</h2>
            <div class="row">
                <div class="col-md-6">
                    ${Card({
                        title: translations.about_feature_modals_title, 
                        content: translations.about_feature_modals_content, 
                        buttonText1: translations.about_feature_modals_button, 
                        buttonId1: 'modal-feature',
                        buttonEvent1:() => {
                            navigateTo('/modal');
                        },
                        style: 'single-button'
                    })}
                </div>
                <div class="col-md-6">
                    ${Card({
                        title: translations.about_feature_routing_title, 
                        content: translations.about_feature_routing_content, 
                        buttonText1: translations.about_feature_routing_button, 
                        buttonId1: 'routing-feature',
                        buttonEvent1:() => {
                            navigateTo('/about');
                        },
                        style: 'single-button'
                    })}
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    ${Card({
                        title: translations.about_feature_tabs_title, 
                        content: translations.about_feature_tabs_content, 
                        buttonText1: translations.about_feature_tabs_button, 
                        buttonId1: 'tabs-feature',
                        buttonEvent1:() => {
                            navigateTo('/tabs');
                        },
                        style: 'single-button'
                    })}
                </div>
                <div class="col-md-6">
                    ${Card({
                        title: translations.about_feature_themes_title, 
                        content: translations.about_feature_themes_content, 
                        buttonText1: translations.about_feature_themes_button, 
                        buttonId1: 'themes-feature',
                        buttonEvent1:() => {
                            navigateTo('/theme-selector');
                        },
                        style: 'single-button'
                    })}
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    ${Card({
                        title: translations.about_feature_multimedia_title, 
                        content: translations.about_feature_multimedia_content, 
                        buttonText1: translations.about_feature_multimedia_button, 
                        buttonId1: 'media-feature',
                        buttonEvent1:() => {
                            navigateTo('/soporte-multimedia');
                        },
                        style: 'single-button'
                    })}
                </div>
                <div class="col-md-6">
                    ${Card({
                        title: translations.about_feature_accessibility_title, 
                        content: translations.about_feature_accessibility_content, 
                        buttonText1: translations.about_feature_accessibility_button, 
                        buttonId1: 'accessibility-feature',
                        buttonEvent1:() => {
                            navigateTo('/accessibility');
                        },
                        style: 'single-button'
                    })}
                </div>
            </div>
        </section>

        <!-- Detalles del Framework -->
        <section class="container mt-5" aria-labelledby="framework-details">
            <h2 id="framework-details">${translations.about_details_heading}</h2>
            <p>${translations.about_details_intro}</p>
            <ul>
                <li><strong>HTML5</strong>: ${translations.about_details_html}</li>
                <li><strong>JavaScript ES6</strong>: ${translations.about_details_js}</li>
                <li><strong>CSS3</strong>: ${translations.about_details_css}</li>
                <li><strong>Bootstrap</strong>: ${translations.about_details_bootstrap}</li>
                <li><strong>jQuery</strong>: ${translations.about_details_jquery}</li>
            </ul>
            <p>${translations.about_details_modularity}</p>
        </section>

        <!-- Información sobre Marvin Calvo -->
        <section class="container mt-5" aria-labelledby="about-marvin">
            <h2 id="about-marvin">${translations.about_marvin_heading}</h2>
            <div class="row">
                <div class="col-md-4 text-center">
                    <!-- Utilización del componente de imagen -->
                    ${Image({
                        url: 'img/yo.jpg',
                        alt: 'Marvin Calvo',
                        width: '150',  
                        height: '150',
                        responsive: true,  
                        highResolution: true  
                    })}
                </div>
                <div class="col-md-8">
                    <p class="lead"><strong>Marvin Calvo</strong></p>
                    <p>${translations.about_marvin_description}</p>
                    <p>${translations.about_marvin_projects}</p>
                    <ul>
                        <li><a href="https://americapixelgames.com" target="_blank">AmericaPixelGames</a></li>
                        <li><a href="https://stackoverflow.com/users/19557324/marvin-calvo" target="_blank">StackOverflow</a></li>
                    </ul>
                    <p>${translations.about_marvin_hobbies}</p>
                </div>
            </div>
        </section>
    `;

    const postRender = () => {
        basicLayoutPostRender();
    };

    return { 
        layout: BasicLayout(content, {
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Desarrollado por <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    // '/css/styles.css',
                ],
                jsFiles: [
                    // '/js/utils.js',
                ]
            })
        }),
        postRender
    };
}
