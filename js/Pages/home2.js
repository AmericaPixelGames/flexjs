// Archivo: js/pages/home.js
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
    // Definir el contenido de la página
    const content = `
        <section>
        <h1>Bienvenido a ${appContext.appName}</h1>
        <p>Versión: ${appContext.version}</p>
        <p>Usuario: ${context.getContextValue('user.name', 'progressive') || 'Sin nombre'}</p>
        <p>Tema actual: ${theme}</p>
        <button id='changeTema'>Cambiar a tema oscuro</button>
        <button id='removerName'>Eliminar nombre de usuario</button> con enrutamiento e interactividad.</p>
            <div id="cards-container"></div>
            <hr />
            <div id="form-container">
                <form id="dynamic-form" class="mt-4">
                    <div class="form-group">
                        <label for="nameInput">Nombre:</label>
                        <input type="text" class="form-control" id="nameInput" placeholder="Ingresa tu nombre">
                    </div>
                    <button type="submit" class="btn btn-success">Enviar</button>
                </form>
                <div id="greeting" class="mt-3"></div>
            </div>
        </section>
        <section>
            <h2>Modal Component</h2>
            <button id="open-modal-btn" class="btn btn-primary">Abrir Modal</button>
        </section>

        ${Modal({
            id: modalId,
            title: 'Título del Modal',
            content: '<p>Este es el contenido del modal.</p>',
            onClose: () => alert('Modal cerrado!'),
            onSave: () => alert('Datos guardados!')
        })}

        <section>
            <h2>Link Component</h2>
            <!-- Ejemplo de uso del componente Link -->
            <div class="mt-4">
                ${Link({ href: '/about', label: 'Ir a Acerca de', icon: 'icon icon-check', onclick: `()=>{alert('Hola mundo')}` })}
                ${Link({ href: 'https://google.com', label: 'Google', icon: 'icon icon-plus' })}
            </div>
        </section>
        <section>
            <h2>Tab Component</h2>

            <!-- Tabs horizontales con un ID único -->
            <h3>Tabs Horizontales</h3>
            ${Tabs({
                id: 'horizontal',  // ID único para el conjunto de pestañas horizontales
                orientation: 'horizontal',  // Orientación horizontal (por defecto)
                tabs: [
                    { title: 'Pestaña 1', content: '<p>Este es el contenido de la Pestaña 1.</p>' },
                    { title: 'Pestaña 2', content: '<p>Este es el contenido de la Pestaña 2.</p>' },
                    { title: 'Pestaña 3', content: '<p>Este es el contenido de la Pestaña 3.</p>' }
                ]
            })}

            <!-- Tabs verticales a la izquierda con un ID único -->
            <h3 class="mt-5">Tabs Verticales - Izquierda</h3>
            ${Tabs({
                id: 'vertical-left',  // ID único para las pestañas verticales a la izquierda
                orientation: 'vertical',  // Orientación vertical
                position: 'left',  // Pestañas a la izquierda (por defecto)
                tabs: [
                    { title: 'Pestaña A', content: '<p>Contenido de la Pestaña A.</p>' },
                    { title: 'Pestaña B', content: '<p>Contenido de la Pestaña B.</p>' },
                    { title: 'Pestaña C', content: '<p>Contenido de la Pestaña C.</p>' }
                ]
            })}

            <!-- Tabs verticales a la derecha con un ID único -->
            <h3 class="mt-5">Tabs Verticales - Derecha</h3>
            ${Tabs({
                id: 'vertical-right',  // ID único para las pestañas verticales a la derecha
                orientation: 'vertical',  // Orientación vertical
                position: 'right',  // Pestañas a la derecha
                tabs: [
                    { title: 'Pestaña X', content: '<p>Contenido de la Pestaña X.</p>' },
                    { title: 'Pestaña Y', content: '<p>Contenido de la Pestaña Y.</p>' },
                    { title: 'Pestaña Z', content: '<p>Contenido de la Pestaña Z.</p>' }
                ]
            })}
        </section>
        <section>
            <h2>Image Component</h2>

            <!-- Imagen estándar -->
            <h3>Imagen estándar</h3>
            ${Image({
                url: 'https://via.placeholder.com/300',
                width: '300px',
                height: '200px'
            })}

            <!-- Imagen responsive -->
            <h3 class="mt-5">Imagen Responsive</h3>
            ${Image({
                url: 'https://via.placeholder.com/600',
                width: '100%',
                height: 'auto',
                responsive: true
            })}

            <!-- Imagen adaptada al div usando "cover" -->
            <h3 class="mt-5">Imagen con adaptación "cover"</h3>
            <div style="width: 400px; height: 250px; border: 1px solid #ccc;">
                ${Image({
                    url: 'https://via.placeholder.com/800x600',
                    width: '100%',
                    height: '100%',
                    adaptation: 'cover'
                })}
            </div>

            <!-- Imagen con mejora de resolución (alta densidad de píxeles) -->
            <h3 class="mt-5">Imagen con alta resolución</h3>
            ${Image({
                url: 'https://via.placeholder.com/300',
                width: '300px',
                height: '200px',
                highResolution: true
            })}

            <!-- Imagen adaptada al div usando "contain" -->
            <h3 class="mt-5">Imagen con adaptación "contain"</h3>
            <div style="width: 400px; height: 250px; border: 1px solid #ccc;">
                ${Image({
                    url: 'https://via.placeholder.com/800x600',
                    width: '100%',
                    height: '100%',
                    adaptation: 'contain'
                })}
            </div>

            <!-- Imagen adaptada al div usando "fill" -->
            <h3 class="mt-5">Imagen con adaptación "fill"</h3>
            <div style="width: 400px; height: 250px; border: 1px solid #ccc;">
                ${Image({
                    url: 'https://via.placeholder.com/800x600',
                    width: '100%',
                    height: '100%',
                    adaptation: 'fill'
                })}
            </div>
        </section>

        <section>
            <h2>Video Component</h2>
            <!-- Modo de reproducción de video -->
            <h3>Reproducción de Video</h3>
            ${Video({ mode: 'play', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' })}

            <!-- Modo de grabación de video -->
            <h3 class="mt-5">Grabación de Video</h3>
            ${Video({ mode: 'record', onBase64Ready: handleBase64 })}

           
        </section>

        <section>
            <h2>Audio Component</h2>
            <!-- Modo de reproducción de audio -->
            <h3 class="mt-5">Reproducción de Audio</h3>
            ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}

            <!-- Modo de grabación de audio -->
            <h3 class="mt-5">Grabación de Audio</h3>
            ${Audio({ mode: 'record' })}
        </section>

        <section>
            <h2>ThemeSelector Component</h2>
            <!-- Selector de Tema -->
            ${ThemeSelector()}
        </section>

        <section>
            <h2>Accessibility Component</h2>
            ${Accessibility()}  <!-- Muestra el componente de accesibilidad -->
        </section>
    `;

    // Lógica post-render para añadir interactividad
    const postRender = () => {
        const cardsContainer = document.getElementById('cards-container');
        if (cardsContainer) {
            cardsContainer.innerHTML = `
                ${Card('Tarjeta 1', 'Contenido de la tarjeta 1', 'Click en Tarjeta 1', "button-2")}
                ${Card('Tarjeta 2', 'Contenido de la tarjeta 2', 'Click en Tarjeta 2', "button-1")}
            `;

            // Asignar eventos a los botones de las tarjetas
            document.getElementById('button-1').addEventListener('click', () => {
                alert('Botón 1 clicado: Acción específica de la tarjeta 1.');
            });

            document.getElementById('button-2').addEventListener('click', () => {
                alert('Botón 2 clicado: Acción específica de la tarjeta 2.');
            });
            document.getElementById('changeTema').addEventListener('click', () => {
                updateTheme('dark-theme');
            });
            document.getElementById('removerName').addEventListener('click', () => {
                removeUserName();
            });

            // Abrir el modal cuando se haga clic en el botón
            document.getElementById('open-modal-btn').addEventListener('click', () => {
                showModal(modalId);  // Mostrar el modal
            });

            // Manejar eventos del modal (cerrar y guardar)
            handleModalEvents(modalId, 
                () => console.log('Modal cerrado'),  // Evento onClose
                () => console.log('Datos guardados')  // Evento onSave
            );

            setupVideoEvents(handleBase64);  // Pasar el callback para obtener el base64
            setupAudioEvents();  // Configurar los eventos del componente Audio
            setupThemeSelector();  // Configurar los eventos del selector de temas
            setupAccessibilityEvents(handleActivateAccessibility);  // Pasar el callback personalizado

        }

        // Evento para manejar el formulario
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
    function handleBase64(base64) {
        console.log('Base64 del video grabado:', base64);
        // Aquí puedes hacer lo que quieras con el Base64 (enviarlo a un servidor, guardarlo, etc.)
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
