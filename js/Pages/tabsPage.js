import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Tabs, setupTabs } from '../components/core/tab.js';
import { Image } from '../components/core/image.js';  // Import the image component
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations

export function TabsPage() {
    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.tabsPage_heading}</h2>
            <p>${translations.tabsPage_intro}</p>
            <section class="mt-5">
                <!-- Horizontal Tabs Example -->
                <h3 class="mt-4">${translations.tabsPage_horizontalHeading}</h3>
                ${Tabs({
                    id: 'horizontal',
                    orientation: 'horizontal',
                    tabs: [
                        { title: translations.tabsPage_tab1, content: `<p>${translations.tabsPage_tab1Content}</p>` },
                        { title: translations.tabsPage_tab2, content: `<p>${translations.tabsPage_tab2Content}</p>` },
                        { title: translations.tabsPage_tab3, content: `<p>${translations.tabsPage_tab3Content}</p>` }
                    ]
                })}
                <!-- Example Image -->
    
                <h3 class="text-center">${translations.tabsPage_exampleImplementation}</h3>
                ${Image({
                    url: '/img/examples/tab1.png',   // Image path for the code example
                    width: '100%',                 // Responsive image
                    height: 'auto',                // Auto height
                    responsive: true               // Ensure adaptability
                })}
            </section>
            <section class="mt-5">
                <!-- Vertical Tabs Example -->
                <h3 class="mt-5">${translations.tabsPage_verticalHeading}</h3>
                ${Tabs({
                    id: 'vertical',
                    orientation: 'vertical',
                    position: 'left',
                    tabs: [
                        { title: translations.tabsPage_tabA, content: `<p>${translations.tabsPage_tabAContent}</p>` },
                        { title: translations.tabsPage_tabB, content: `<p>${translations.tabsPage_tabBContent}</p>` },
                        { title: translations.tabsPage_tabC, content: `<p>${translations.tabsPage_tabCContent}</p>` }
                    ]
                })}
            </section>
            <section class="mt-5">
                <h3 class="text-center">${translations.tabsPage_exampleImplementation}</h3>
                ${Image({
                    url: '/img/examples/tab2.png',   // Image path for the code example
                    width: '100%',                 // Responsive image
                    height: 'auto',                // Auto height
                    responsive: true               // Ensure adaptability
                })}
            </section>
            <!-- Table Explaining Tabs Component Properties and Functions -->
            <section class="mt-5">
                <h3 class="text-center">${translations.tabsPage_propertiesFunctions}</h3>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>${translations.tabsPage_property}</th>
                            <th>${translations.tabsPage_description}</th>
                            <th>${translations.tabsPage_type}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>id</code></td>
                            <td>${translations.tabsPage_idDescription}</td>
                            <td><code>string</code></td>
                        </tr>
                        <tr>
                            <td><code>orientation</code></td>
                            <td>${translations.tabsPage_orientationDescription}</td>
                            <td><code>string</code></td>
                        </tr>
                        <tr>
                            <td><code>position</code></td>
                            <td>${translations.tabsPage_positionDescription}</td>
                            <td><code>string</code></td>
                        </tr>
                        <tr>
                            <td><code>tabs</code></td>
                            <td>${translations.tabsPage_tabsDescription}</td>
                            <td><code>Array</code></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    `;

    const postRender = () => {
        basicLayoutPostRender();
        setupTabs('vertical');
        setupTabs('horizontal');
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
