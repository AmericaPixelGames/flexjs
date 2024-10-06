import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Tabs, setupTabs } from '../components/core/tab.js';
import { Image } from '../components/core/image.js';  // Importar el componente de imagen
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Importar traducciones

export function TabsPage() {
    // Obtener el idioma del usuario y cargar las traducciones
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h2 class="text-center">${translations.tabsPage_heading}</h2>
            <p>${translations.tabsPage_intro}</p>
            <section class="mt-5">
                <!-- Ejemplo de Tabs Horizontales -->
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
                <!-- Ejemplo en Imagen -->
    
                <h3 class="text-center">${translations.tabsPage_exampleImplementation}</h3>
                ${Image({
                    url: '/img/examples/tab1.png',   // Ruta de la imagen del ejemplo de código
                    width: '100%',                 // Imagen responsive
                    height: 'auto',                // Altura automática
                    responsive: true               // Asegurar que sea adaptable
                })}
            </section>
            <section class="mt-5">
                <!-- Ejemplo de Tabs Verticales -->
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
                    url: '/img/examples/tab2.png',   // Ruta de la imagen del ejemplo de código
                    width: '100%',                 // Imagen responsive
                    height: 'auto',                // Altura automática
                    responsive: true               // Asegurar que sea adaptable
                })}
            </section>
            <!-- Tabla explicativa de las propiedades y funciones del componente Tabs -->
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
