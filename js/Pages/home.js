import { BasicLayout } from '../layouts/BasicLayout.js';
import { Card } from '../components/card.js';
import { Modal, showModal, handleModalEvents  } from '../components/modal.js';
import context from '../core/context.js';
import { Link } from '../components/link.js';
import { Tabs } from '../components/tab.js';
import { Image } from '../components/image.js';
import { Video, setupVideoEvents } from '../components/video.js';
import { Audio, setupAudioEvents } from '../components/audio.js';
import { ThemeSelector, setupThemeSelector } from '../components/themeSelector.js';
import { Accessibility, setupAccessibilityEvents } from '../components/accessibility.js';

// Página Home (Inicio)
export function HomePage() {
    const modalId = 'exampleModal';
    // Cargar el contexto progresivo al iniciar la aplicación
    context.loadProgressiveContext();
    // Obtener el contexto completo y algunos valores específicos
    const appContext = context.getContext();
    const theme = context.getContextValue('user.preferences.theme', 'progressive');  // Obtener el tema actual del contexto progresivo

    // Actualizar el tema en el contexto progresivo
    const updateTheme = (newTheme) => {
        context.updateContext('user.preferences.theme', newTheme);  // Actualiza el tema
        alert(`El tema ha sido cambiado a ${newTheme}`);
    };

    // Eliminar el nombre de usuario del contexto progresivo
    const removeUserName = () => {
        context.removeFromContext('user.name');
        alert('El nombre de usuario ha sido eliminado.');
    };

    // Definir el contenido de la página con una interfaz mejorada y más atractiva
    const content = `
        <section class="text-center mt-5">
            <h1 class="display-4">Bienvenido a ${appContext.appName}</h1>
            <p class="lead">Versión: ${appContext.version}</p>
            <p class="text-muted">Usuario: ${context.getContextValue('user.name', 'progressive') || 'Sin nombre'}</p>
            <p class="text-muted">Tema actual: ${theme}</p>
            <button id='changeTema' class="btn btn-dark mt-3">Cambiar a tema oscuro</button>
            <button id='removerName' class="btn btn-danger mt-3">Eliminar nombre de usuario</button>
        </section>
        
        <section class="container mt-5">
            <h2 class="text-center mb-4">Características del Framework</h2>
            <div class="row">
                <!-- Tarjetas de características del framework -->
                <div class="col-md-6">
                    ${Card('Componente Modal', 'Gestión de modales', 'Explora el componente modal.', "modal-card")}
                </div>
                <div class="col-md-6">
                    ${Card('Selector de Temas', 'Cambia entre temas oscuros y claros', 'Personaliza el tema de la aplicación.', "theme-card")}
                </div>
            </div>
        </section>

        <section class="container mt-5">
            <h3 class="text-center mb-4">Formulario Dinámico</h3>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <form id="dynamic-form" class="mt-4">
                        <div class="form-group">
                            <label for="nameInput">Nombre:</label>
                            <input type="text" class="form-control" id="nameInput" placeholder="Ingresa tu nombre">
                        </div>
                        <button type="submit" class="btn btn-success mt-3">Enviar</button>
                    </form>
                    <div id="greeting" class="mt-3"></div>
                </div>
            </div>
        </section>

        <section class="container mt-5">
            <h2 class="text-center">Componentes del Framework</h2>

            <div class="mt-5">
                <h3>Modal Component</h3>
                <p>El componente Modal permite crear ventanas emergentes personalizadas.</p>
                <button id="open-modal-btn" class="btn btn-primary">Abrir Modal</button>
                ${Modal({
                    id: modalId,
                    title: 'Título del Modal',
                    content: '<p>Este es el contenido del modal.</p>',
                    onClose: () => alert('Modal cerrado!'),
                    onSave: () => alert('Datos guardados!')
                })}
            </div>

            <div class="mt-5">
                <h3>Link Component</h3>
                <p>El componente Link permite crear enlaces interactivos con iconos.</p>
                <div>
                    ${Link({ href: '/about', label: 'Ir a Acerca de', icon: 'icon icon-check' })}
                    ${Link({ href: 'https://google.com', label: 'Google', icon: 'icon icon-plus' })}
                </div>
            </div>

            <div class="mt-5">
                <h3>Tab Component</h3>
                <p>El componente Tab permite crear pestañas horizontales y verticales.</p>
                ${Tabs({
                    id: 'horizontal',
                    orientation: 'horizontal',
                    tabs: [
                        { title: 'Pestaña 1', content: '<p>Contenido de la Pestaña 1.</p>' },
                        { title: 'Pestaña 2', content: '<p>Contenido de la Pestaña 2.</p>' },
                        { title: 'Pestaña 3', content: '<p>Contenido de la Pestaña 3.</p>' }
                    ]
                })}
            </div>

            <div class="mt-5">
                <h3>Image Component</h3>
                <p>El componente Image permite mostrar imágenes con diferentes adaptaciones y resoluciones.</p>
                ${Image({
                    url: 'https://via.placeholder.com/600',
                    width: '100%',
                    height: 'auto',
                    responsive: true
                })}
            </div>

            <div class="mt-5">
                <h3>Video Component</h3>
                <p>Este componente permite reproducir o grabar videos.</p>
                ${Video({ mode: 'play', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' })}
                ${Video({ mode: 'record', onBase64Ready: handleBase64Video })}
            </div>

            <div class="mt-5">
                <h3>Audio Component</h3>
                <p>El componente de audio permite reproducir o grabar audio.</p>
                ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}
                ${Audio({ mode: 'record', onBase64Ready: handleBase64Audio })}
            </div>

            <div class="mt-5">
                <h3>ThemeSelector Component</h3>
                <p>Permite cambiar entre diferentes temas visuales en la aplicación.</p>
                ${ThemeSelector()}
            </div>

            <div class="mt-5">
                <h3>Accessibility Component</h3>
                <p>Este componente permite habilitar funcionalidades de accesibilidad, como la lectura de contenido.</p>
                ${Accessibility()}
            </div>
        </section>
    `;

    // Lógica post-render para añadir interactividad
    const postRender = () => {
        document.getElementById('changeTema').addEventListener('click', () => {
            updateTheme('dark-theme');
        });

        document.getElementById('removerName').addEventListener('click', () => {
            removeUserName();
        });

        document.getElementById('open-modal-btn').addEventListener('click', () => {
            showModal(modalId);  // Mostrar el modal
        });

        handleModalEvents(modalId, 
            () => console.log('Modal cerrado'),  // Evento onClose
            () => console.log('Datos guardados')  // Evento onSave
        );

        setupVideoEvents(handleBase64Video);  // Pasar el callback para obtener el base64
        setupAudioEvents(handleBase64Audio);  // Configurar los eventos del componente Audio
        setupThemeSelector();  // Configurar los eventos del selector de temas
        setupAccessibilityEvents(handleActivateAccessibility);  // Pasar el callback personalizado

        // Manejo del formulario dinámico
        const form = document.getElementById('dynamic-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();  // Evita el refresco de la página
            const name = document.getElementById('nameInput').value;
            const greetingDiv = document.getElementById('greeting');
            if (name) {
                greetingDiv.innerHTML = `<h3>¡Hola, ${name}!</h3>`;
            } else {
                alert('Por favor ingresa tu nombre');
            }
        });
    };

    // Función para manejar el archivo Base64
    function handleBase64Video(base64) {
        console.log('Base64 del video grabado:', base64);
    }
    function handleBase64Audio(base64) {
        console.log('Base64 del video grabado:', base64);
    }
    // Callback para manejar cuando se active la accesibilidad
    function handleActivateAccessibility(isEnabled) {
        if (isEnabled) {
            console.log("Modo accesible activado");
        } else {
            console.log("Modo accesible desactivado");
        }
    }

    return { 
        layout: BasicLayout(content, { title: 'Inicio - Mi Aplicación', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
