import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Accessibility, setupAccessibilityEvents } from '../components/core/accessibility.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations
import { Image } from '../components/core/image.js';  // Import the Image component

export function AccessibilityPage() {
    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    // Page content with translations and component description
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.accessibilityPage_heading}</h2>
            <p>${translations.accessibilityPage_description}</p>

            <!-- Accessibility Component -->
            <h3>${translations.accessibilityPage_componentTitle}</h3>
            ${Accessibility()}  <!-- Display the accessibility component -->

            <!-- Component Description -->
            <section class="mt-5">
                <h3>${translations.accessibilityPage_descriptionTitle}</h3>
                <p>${translations.accessibilityPage_descriptionContent}</p>
                
                <!-- Functions and Properties -->
                <h4>${translations.accessibilityPage_functionsTitle}</h4>
                <ul>
                    <li><strong>toggleAccessibilityFeatures:</strong> ${translations.accessibilityPage_toggleAccessibilityDescription}</li>
                    <li><strong>loadColorBlindStylesheet:</strong> ${translations.accessibilityPage_loadColorBlindDescription}</li>
                    <li><strong>adjustFontSize:</strong> ${translations.accessibilityPage_adjustFontDescription}</li>
                    <li><strong>toggleHighContrast:</strong> ${translations.accessibilityPage_toggleContrastDescription}</li>
                </ul>

                <!-- Implementation Example (As Image) -->
                <section class="mt-5">
                    <h4>${translations.accessibilityPage_exampleTitle}</h4>
                    ${Image({
                        url: '/img/examples/accessibility.png',  // Path to the example image
                        alt: 'Accessibility Code Example',
                        width: '100%',  // Max width to make it responsive
                        height: 'auto',  // Keep aspect ratio
                        responsive: true
                    })}
                </section>
            </section>
        </section>
    `;

    const handleActivateAccessibility = (isEnabled) => {
        if (isEnabled) {
            console.log("Accessible mode activated");
        } else {
            console.log("Accessible mode deactivated");
        }
    };

    const postRender = () => {
        setupAccessibilityEvents(handleActivateAccessibility);
        basicLayoutPostRender();  // Call the basic postRender if necessary
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Example stylesheet
                ],
                jsFiles: [
                    //'/js/utils.js', // Example JS file
                ]
            })
        }),
        postRender
    };
}
