import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Modal, showModal, handleModalEvents } from '../components/core/modal.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations

export function DetailsPage(params) {
    const modalId = 'exampleModal';
    const { id } = params;

    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Define the page content using translations
    const content = `
        <section class="container mt-5" aria-labelledby="main-heading">
            <h1 id="main-heading" class="text-center">${translations.details_heading}</h1>
            <p class="lead text-center">${translations.details_intro}</p>

            <!-- Framework Description -->
            <section class="mt-5" aria-labelledby="description-heading">
                <h2 id="description-heading">${translations.details_whatIsHeading}</h2>
                <p><strong>FlexJS</strong> ${translations.details_whatIsDescription1}</p>
                <p>${translations.details_whatIsDescription2}</p>
            </section>

            <!-- Framework Structure -->
            <section class="mt-5" aria-labelledby="architecture-heading">
                <h2 id="architecture-heading">${translations.details_architectureHeading}</h2>
                <p>${translations.details_architectureDescription}</p>
                <ul>
                    <li><strong>${translations.details_modals}</strong> ${translations.details_modalsDescription}</li>
                    <li><strong>${translations.details_tabs}</strong> ${translations.details_tabsDescription}</li>
                    <li><strong>${translations.details_multimedia}</strong> ${translations.details_multimediaDescription}</li>
                    <li><strong>${translations.details_accessibility}</strong> ${translations.details_accessibilityDescription}</li>
                    <li><strong>${translations.details_themeSelector}</strong> ${translations.details_themeSelectorDescription}</li>
                    <li><strong>${translations.details_context}</strong> ${translations.details_contextDescription}</li>
                </ul>
            </section>

            <!-- Routing and Rendering Functionality -->
            <section class="mt-5" aria-labelledby="routing-heading">
                <h2 id="routing-heading">${translations.details_routingHeading}</h2>
                <p>${translations.details_routingDescription1}</p>
                <p>${translations.details_routingDescription2}</p>
                <p>${translations.details_routingDescription3}</p>
            </section>

            <!-- Progressive Context and Persistence -->
            <section class="mt-5" aria-labelledby="context-heading">
                <h2 id="context-heading">${translations.details_contextHeading}</h2>
                <p>${translations.details_contextDescription1}</p>
                <p>${translations.details_contextDescription2}</p>
                <ul>
                    <li><strong>${translations.details_initialContext}</strong> ${translations.details_initialContextDescription}</li>
                    <li><strong>${translations.details_progressiveContext}</strong> ${translations.details_progressiveContextDescription}</li>
                </ul>
                <p>${translations.details_contextStorageDescription}</p>
            </section>

            <!-- Accessibility and Translation Features -->
            <section class="mt-5" aria-labelledby="accessibility-heading">
                <h2 id="accessibility-heading">${translations.details_accessibilityTranslationHeading}</h2>
                <p>${translations.details_accessibilityTranslationDescription}</p>
                <ul>
                    <li><strong>${translations.details_translation}</strong> ${translations.details_translationDescription}</li>
                    <li><strong>${translations.details_accessibility}</strong> ${translations.details_accessibilityDescription}</li>
                </ul>
            </section>

            <!-- Flexibility and Customization -->
            <section class="mt-5" aria-labelledby="customization-heading">
                <h2 id="customization-heading">${translations.details_customizationHeading}</h2>
                <p>${translations.details_customizationDescription1}</p>
                <p>${translations.details_customizationDescription2}</p>
            </section>

            <!-- Conclusion -->
            <section class="mt-5" aria-labelledby="conclusion-heading">
                <h2 id="conclusion-heading">${translations.details_conclusionHeading}</h2>
                <p>${translations.details_conclusionDescription}</p>
            </section>
        </section>
    `;

    const postRender = () => {
        document.getElementById('open-modal-btn')?.addEventListener('click', () => {
            showModal(modalId);
        });

        handleModalEvents(modalId, () => console.log('Modal closed'), () => console.log('Data saved'));
        basicLayoutPostRender();
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    // '/css/styles.css', // Example stylesheet
                ],
                jsFiles: [
                    // '/js/utils.js', // Example JS file
                ]
            })
        }),
        postRender
    };
}
