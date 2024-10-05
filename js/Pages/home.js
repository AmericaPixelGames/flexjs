import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Card } from '../components/core/card.js';
import { Modal, showModal, handleModalEvents } from '../components/core/modal.js';
import { Head } from '../components/core/head.js';
import { Image } from '../components/core/image.js';
import context from '../core/context.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Cargar las traducciones

// Página Home (Inicio)
export function HomePage() {
    const modalId = 'exampleModal';

    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Cargar el contexto progresivo al iniciar la aplicación
    context.loadProgressiveContext();

    // Obtener el contexto completo y algunos valores específicos
    const appContext = context.getContext();
    const theme = context.getContextValue('user.preferences.theme', 'progressive') || 'light';

    // Definir el contenido de la página con las traducciones
    const content = `
        <!-- Sección principal con encabezado y logo -->
        <section class="hero-section text-center mt-5" aria-labelledby="main-heading">
            <!-- Aquí agregamos el logo de FlexJS -->
            <div class="d-flex justify-content-center mb-4">
                ${Image({
                    url: '/img/logo2.png',  // Ruta de la imagen del logo
                    width: '200px',
                    height: 'auto',
                    responsive: true,
                    adaptation: 'contain'
                })}
            </div>
            <h1 id="main-heading" class="display-4">${translations.home_heading}</h1>
            <p class="lead">${translations.home_intro}</p>
            <button id='openModal' class="btn btn-primary mt-3" aria-controls="exampleModal">${translations.home_moreInfo}</button>
        </section>

        <!-- Descripción de FlexJS -->
        <section class="container mt-5" aria-labelledby="what-is-flexjs">
            <h2 id="what-is-flexjs" class="text-center mb-4">${translations.home_whatIsFlexJS}</h2>
            <p class="text-justify">${translations.home_flexjsDescription}</p>
        </section>

        <!-- Características clave de FlexJS -->
        <section class="container mt-5" aria-labelledby="key-features">
            <h2 id="key-features" class="text-center mb-4">${translations.home_keyFeatures}</h2>
            <div class="row">
                <div class="col-md-4">
                    ${Card({ title: translations.home_card_modularity_title, content: translations.home_card_modularity_desc })}
                </div>
                <div class="col-md-4">
                    ${Card({ title: translations.home_card_html5_title, content: translations.home_card_html5_desc })}
                </div>
                <div class="col-md-4">
                    ${Card({ title: translations.home_card_multimedia_title, content: translations.home_card_multimedia_desc })}
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    ${Card({ title: translations.home_card_accessibility_title, content: translations.home_card_accessibility_desc })}
                </div>
                <div class="col-md-6">
                    ${Card({ title: translations.home_card_themes_title, content: translations.home_card_themes_desc })}
                </div>
            </div>
        </section>

        <!-- Invitación final -->
        <section class="container mt-5" aria-labelledby="join-us">
            <h2 id="join-us" class="text-center">${translations.home_joinUs}</h2>
            <p class="lead text-center">${translations.home_intro}</p>
        </section>

        <!-- Modal de información adicional -->
        ${Modal({
            id: modalId,
            title: translations.home_modalTitle,
            content: `<p>${translations.home_modalContent}</p>`,
            onClose: () => console.log('Modal cerrado'),
            onSave: () => console.log('Datos guardados')
        })}
    `;

    // Lógica post-render para añadir interactividad
    const postRender = () => {
        document.getElementById('openModal')?.addEventListener('click', () => {
            showModal(modalId);  // Mostrar el modal con más información
        });
        basicLayoutPostRender(); 
    
    };

    return { 
        layout: BasicLayout(content, 
            { 
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
