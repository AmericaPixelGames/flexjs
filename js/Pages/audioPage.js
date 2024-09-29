import { BasicLayout } from '../layouts/BasicLayout.js';
import { Audio, setupAudioEvents } from '../components/audio.js';

export function AudioPage() {
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente Audio</h2>
            <p>El componente de audio permite reproducir o grabar audio.</p>

            <h3>Reproducción de Audio</h3>
            ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}

            <h3 class="mt-5">Grabación de Audio</h3>
            ${Audio({ mode: 'record' })}
        </section>
    `;

    const postRender = () => {
        setupAudioEvents();
    };

    return {
        layout: BasicLayout(content, { title: 'Componente Audio', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
