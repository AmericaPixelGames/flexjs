import { BasicLayout } from '../layouts/BasicLayout.js';
import { Card } from '../components/card.js';
import { navigateTo } from '../route.js';  // Importar la función de navegación

// Página About (Acerca de)
export function AboutPage() {
    const content = `
        <section class="container mt-5">
            <h1 class="text-center">Acerca del Framework</h1>
            <p class="lead text-center">Un framework moderno, modular y dinámico diseñado para facilitar la creación de aplicaciones web escalables.</p>
        </section>
        
        <section class="container mt-5">
            <h2>Características del Framework</h2>
            <div class="row">
                <div class="col-md-6">
                    ${Card('Componentes Modales', 'Modales personalizables con interactividad integrada para mostrar contenido dinámico y recibir entradas del usuario.', 'Ver más', 'modal-feature')}
                </div>
                <div class="col-md-6">
                    ${Card('Sistema de Enrutamiento', 'Nuestro framework soporta enrutamiento dinámico, incluyendo rutas con parámetros para aplicaciones de una sola página (SPA).', 'Explorar', 'routing-feature')}
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    ${Card('Sistema de Pestañas', 'Implementación de pestañas (tabs) horizontales y verticales, permitiendo cambiar entre vistas o secciones.', 'Ver ejemplos', 'tabs-feature')}
                </div>
                <div class="col-md-6">
                    ${Card('Gestión de Temas', 'Cambiar dinámicamente entre diferentes temas visuales como claro, oscuro y temas personalizados.', 'Cambiar tema', 'themes-feature')}
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    ${Card('Soporte Multimedia', 'Componentes que permiten grabar y reproducir audio y video, con opciones avanzadas de manipulación de archivos.', 'Probar multimedia', 'media-feature')}
                </div>
                <div class="col-md-6">
                    ${Card('Accesibilidad', 'Funciones de accesibilidad integradas para mejorar la experiencia de usuarios con discapacidades visuales.', 'Ver accesibilidad', 'accessibility-feature')}
                </div>
            </div>
        </section>

        <section class="container mt-5">
            <h2>Detalles del Framework</h2>
            <p>Este framework ha sido diseñado utilizando tecnologías web modernas como:</p>
            <ul>
                <li><strong>HTML5</strong>: Estructura y semántica del contenido.</li>
                <li><strong>JavaScript ES6</strong>: Manejo de lógica, interactividad y funcionalidades avanzadas del framework.</li>
                <li><strong>CSS3</strong>: Diseño y estilización del contenido, con soporte para temas personalizables.</li>
                <li><strong>Bootstrap</strong>: Sistema de rejillas responsivo para hacer que la interfaz sea amigable en dispositivos móviles.</li>
                <li><strong>jQuery</strong>: Para simplificar el manejo del DOM y eventos de una forma eficiente.</li>
            </ul>
            <p>El framework es modular, lo que facilita su escalabilidad. Cada componente, como modales, pestañas, o reproductores multimedia, es independiente y fácilmente integrable en diferentes proyectos.</p>
        </section>

        <section class="container mt-5">
            <h2>Sobre Marvin Calvo</h2>
            <div class="row">
                <div class="col-md-4 text-center">
                    <img src="https://via.placeholder.com/200" alt="Marvin Calvo" class="rounded-circle mb-4" />
                </div>
                <div class="col-md-8">
                    <p class="lead"><strong>Marvin Calvo</strong></p>
                    <p>Soy de <strong>Costa Rica</strong> y me apasiona programar y crear cosas geniales. Mi experiencia incluye desarrollo de videojuegos, aplicaciones web y herramientas interactivas. Me gusta ayudar a otros desarrolladores y compartir mis conocimientos en la comunidad.</p>
                    <p>Algunos de mis proyectos destacados incluyen:</p>
                    <ul>
                        <li><a href="https://americapixelgames.com" target="_blank">AmericaPixelGames</a> - Un sitio dedicado a mis videojuegos y proyectos interactivos.</li>
                        <li><a href="https://stackoverflow.com/users/19557324/marvin-calvo" target="_blank">StackOverflow</a> - Mi perfil de StackOverflow, donde ayudo a otros desarrolladores a resolver problemas.</li>
                    </ul>
                    <p>Cuando no estoy programando, me encanta <strong>jugar videojuegos</strong>, lo que también inspira muchas de mis creaciones.</p>
                </div>
            </div>
        </section>
    `;

    const postRender = () => {
        // Asignar eventos de navegación a los botones de las tarjetas de características
        document.getElementById('modal-feature').addEventListener('click', () => {
            navigateTo('/modal');
        });
        document.getElementById('routing-feature').addEventListener('click', () => {
            navigateTo('/about');  // Puedes actualizar esta ruta para el enrutador específico si lo prefieres
        });
        document.getElementById('tabs-feature').addEventListener('click', () => {
            navigateTo('/tabs');
        });
        document.getElementById('themes-feature').addEventListener('click', () => {
            navigateTo('/theme-selector');
        });

        // Actualización para Soporte Multimedia
        document.getElementById('media-feature').addEventListener('click', () => {
            // Navegar a una página de selección para video o audio
            navigateTo('/video');  // Puedes crear una página de multimedia general si lo prefieres
        });

        document.getElementById('accessibility-feature').addEventListener('click', () => {
            navigateTo('/accessibility');
        });
        document.getElementById('media-feature').addEventListener('click', () => {
            navigateTo('/soporte-multimedia');
        });
    };

    return { 
        layout: BasicLayout(content, { title: 'Acerca de - Mi Framework', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
