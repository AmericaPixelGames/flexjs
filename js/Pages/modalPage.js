import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js';
import { Modal, showModal, handleModalEvents } from '../components/core/modal.js';
import { Image } from '../components/core/image.js';  // Import the Image component
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations

export function ModalPage() {
    const modalId = 'modalExample';

    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.modalPage_heading}</h2>
            <p>${translations.modalPage_intro}</p>
            
            <!-- Button to open the modal -->
            <button id="open-modal-btn" class="btn btn-primary">${translations.modalPage_openButton}</button>
            
            <!-- Example of the Modal component -->
            ${Modal({
                id: modalId,
                title: translations.modalPage_modalTitle,
                content: `<p>${translations.modalPage_modalContent}</p>`,
                onClose: () => alert(translations.modalPage_modalCloseAlert),
                onSave: () => alert(translations.modalPage_modalSaveAlert)
            })}

            <!-- Example Code Section (Image) -->
            <section class="mt-5">
                <h3 class="text-center">${translations.modalPage_implementationExample}</h3>
                ${Image({
                    url: '/img/examples/modal.png',   // Image URL
                    width: '100%',                         // Responsive width
                    height: 'auto',                        // Auto height
                    responsive: true                       // Responsive image
                })}
            </section>

            <!-- Table explaining Modal properties and functions -->
            <section class="mt-5 table-responsive">
                <h3 class="text-center">${translations.modalPage_propertiesAndFunctions}</h3>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>${translations.modalPage_property}</th>
                            <th>${translations.modalPage_description}</th>
                            <th>${translations.modalPage_type}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>id</code></td>
                            <td>${translations.modalPage_idDescription}</td>
                            <td><code>string</code></td>
                        </tr>
                        <tr>
                            <td><code>title</code></td>
                            <td>${translations.modalPage_titleDescription}</td>
                            <td><code>string</code></td>
                        </tr>
                        <tr>
                            <td><code>content</code></td>
                            <td>${translations.modalPage_contentDescription}</td>
                            <td><code>string (HTML)</code></td>
                        </tr>
                        <tr>
                            <td><code>onClose</code></td>
                            <td>${translations.modalPage_onCloseDescription}</td>
                            <td><code>function</code></td>
                        </tr>
                        <tr>
                            <td><code>onSave</code></td>
                            <td>${translations.modalPage_onSaveDescription}</td>
                            <td><code>function</code></td>
                        </tr>
                        <tr>
                            <td><code>showModal(id)</code></td>
                            <td>${translations.modalPage_showModalDescription}</td>
                            <td><code>function</code></td>
                        </tr>
                        <tr>
                            <td><code>handleModalEvents(id, onClose, onSave)</code></td>
                            <td>${translations.modalPage_handleModalEventsDescription}</td>
                            <td><code>function</code></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    `;

    const postRender = () => {
        document.getElementById('open-modal-btn').addEventListener('click', () => {
            showModal(modalId);  // Show the modal
        });

        handleModalEvents(modalId, () => console.log(translations.modalPage_modalCloseAlert), () => console.log(translations.modalPage_modalSaveAlert));
        basicLayoutPostRender();
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Example CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Example JS file
                ]
            })
        }),
        postRender
    };
}
