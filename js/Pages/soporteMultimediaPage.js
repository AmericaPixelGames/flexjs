import { BasicLayout } from '../layouts/BasicLayout.js';
import { Video, setupVideoEvents } from '../components/video.js';
import { Audio, setupAudioEvents } from '../components/audio.js';

export function SoporteMultimediaPage() {

    const content = `
        <section class="container mt-5">
            <h1 class="text-center">Soporte Multimedia</h1>
            <p class="lead text-center">Aquí puedes ver ejemplos de reproducción y grabación de Video y Audio.</p>

            <!-- Sección de Video -->
            <section class="mt-5">
                <h2 class="text-center">Componente Video</h2>
                <p>Este componente permite reproducir o grabar videos.</p>
                
                <h3>Reproducción de Video</h3>
                ${Video({ mode: 'play', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' })}

                <h3 class="mt-5">Grabación de Video</h3>
                ${Video({ mode: 'record', onBase64Ready: handleBase64Video })}
            </section>

            <!-- Sección de Audio -->
            <section class="mt-5">
                <h2 class="text-center">Componente Audio</h2>
                <p>El componente de audio permite reproducir o grabar audio.</p>

                <h3>Reproducción de Audio</h3>
                ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}

                <h3 class="mt-5">Grabación de Audio</h3>
                ${Audio({ mode: 'record', onBase64Ready: handleBase64Audio })}
            </section>
        </section>
    `;

    const postRender = () => {
        // Inicializar eventos para Video
        setupVideoEvents(handleBase64Video);

        // Inicializar eventos para Audio
        setupAudioEvents(handleBase64Audio);
        
    };
    
    function handleBase64Video(base64) {
        console.log('Base64 del video grabado:', base64);
    }
    function handleBase64Audio(base64) {
        console.log('Base64 del video grabado:', base64);
    }
    return {
        layout: BasicLayout(content, { title: 'Soporte Multimedia', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
