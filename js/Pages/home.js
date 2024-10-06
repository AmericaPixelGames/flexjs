import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js';
import { Card } from '../components/core/card.js';
import { Modal, showModal, handleModalEvents } from '../components/core/modal.js';
import { Head } from '../components/core/head.js';
import { Image } from '../components/core/image.js';
import context from '../core/context.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Load translations

// Home Page
export function HomePage() {
    const modalId = 'exampleModal';

    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Load the progressive context when the app starts
    context.loadProgressiveContext();

    // Get the complete context and some specific values
    const appContext = context.getContext();
    const theme = context.getContextValue('user.preferences.theme', 'progressive') || 'light';

    // Define the content of the page using translations
    const content = `
        <!-- Main section with header and logo -->
        <section class="hero-section text-center mt-5" aria-labelledby="main-heading">
            <!-- Here we add the FlexJS logo -->
            <div class="d-flex justify-content-center mb-4">
                ${Image({
                    url: '/img/logo2.png',  // Path to the logo image
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

        <!-- FlexJS Description -->
        <section class="container mt-5" aria-labelledby="what-is-flexjs">
            <h2 id="what-is-flexjs" class="text-center mb-4">${translations.home_whatIsFlexJS}</h2>
            <p class="text-justify">${translations.home_flexjsDescription}</p>
        </section>

        <!-- Key Features of FlexJS -->
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

        <!-- Final Invitation -->
        <section class="container mt-5" aria-labelledby="join-us">
            <h2 id="join-us" class="text-center">${translations.home_joinUs}</h2>
            <p class="lead text-center">${translations.home_intro}</p>
        </section>

        <!-- Additional Information Modal -->
        ${Modal({
            id: modalId,
            title: translations.home_modalTitle,
            content: `<p>${translations.home_modalContent}</p>`,
            onClose: () => console.log('Modal closed'),
            onSave: () => console.log('Data saved')
        })}
    `;

    // Post-render logic to add interactivity
    const postRender = () => {
        document.getElementById('openModal')?.addEventListener('click', () => {
            showModal(modalId);  // Show the modal with more information
        });
        basicLayoutPostRender(); 
    };

    return { 
        layout: BasicLayout(content, 
            { 
                title: 'FlexJS', 
                footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
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
