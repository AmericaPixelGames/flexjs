import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Video, setupVideoEvents } from '../components/core/video.js';
import { Audio, setupAudioEvents } from '../components/core/audio.js';
import { Head } from '../components/core/head.js';
import { loadTranslations, getUserLanguage } from '../translations/index.js';  // Import translations

export function SoporteMultimediaPage() {
    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    const content = `
        <section class="container mt-5">
            <h1 class="text-center">${translations.multimediaPage_heading}</h1>
            <p class="lead text-center">${translations.multimediaPage_intro}</p>

            <!-- Video Section -->
            <section class="mt-5">
                <h2 class="text-center">${translations.multimediaPage_video_heading}</h2>
                <p>${translations.multimediaPage_video_description}</p>
                
                <h3>${translations.multimediaPage_video_play}</h3>
                ${Video({ mode: 'play', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' })}

                <h3 class="mt-5">${translations.multimediaPage_video_record}</h3>
                ${Video({ mode: 'record', onBase64Ready: handleBase64Video })}

                <!-- Code Example -->
                <section class="mt-5">
                    <h3 class="text-center">${translations.multimediaPage_example_heading} (Video)</h3>
                    <pre><code class="language-javascript">
import { Video } from './components/video.js';

const videoComponent = Video({
    mode: 'record',
    onBase64Ready: (base64) => {
        console.log("Video in Base64:", base64);
    }
});
                    </code></pre>
                </section>

                <!-- Video Component Properties and Functions Table -->
                <section class="mt-5">
                    <h3 class="text-center">${translations.multimediaPage_properties_heading} (Video)</h3>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>${translations.multimediaPage_property}</th>
                                <th>${translations.multimediaPage_description}</th>
                                <th>${translations.multimediaPage_type}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>mode</code></td>
                                <td>${translations.multimediaPage_mode}</td>
                                <td><code>string</code></td>
                            </tr>
                            <tr>
                                <td><code>videoUrl</code></td>
                                <td>${translations.multimediaPage_videoUrl}</td>
                                <td><code>string</code></td>
                            </tr>
                            <tr>
                                <td><code>onBase64Ready</code></td>
                                <td>${translations.multimediaPage_onBase64Ready}</td>
                                <td><code>function</code></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>

            <!-- Audio Section -->
            <section class="mt-5">
                <h2 class="text-center">${translations.multimediaPage_audio_heading}</h2>
                <p>${translations.multimediaPage_audio_description}</p>

                <h3>${translations.multimediaPage_audio_play}</h3>
                ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}

                <h3 class="mt-5">${translations.multimediaPage_audio_record}</h3>
                ${Audio({ mode: 'record', onBase64Ready: handleBase64Audio })}

                <!-- Code Example -->
                <section class="mt-5">
                    <h3 class="text-center">${translations.multimediaPage_example_heading} (Audio)</h3>
                    <pre><code class="language-javascript">
import { Audio } from './components/audio.js';

const audioComponent = Audio({
    mode: 'record',
    onBase64Ready: (base64) => {
        console.log("Audio in Base64:", base64);
    }
});
                    </code></pre>
                </section>

                <!-- Audio Component Properties and Functions Table -->
                <section class="mt-5 table-responsive">
                    <h3 class="text-center">${translations.multimediaPage_properties_heading} (Audio)</h3>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>${translations.multimediaPage_property}</th>
                                <th>${translations.multimediaPage_description}</th>
                                <th>${translations.multimediaPage_type}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>mode</code></td>
                                <td>${translations.multimediaPage_mode}</td>
                                <td><code>string</code></td>
                            </tr>
                            <tr>
                                <td><code>audioUrl</code></td>
                                <td>${translations.multimediaPage_audioUrl}</td>
                                <td><code>string</code></td>
                            </tr>
                            <tr>
                                <td><code>onBase64Ready</code></td>
                                <td>${translations.multimediaPage_onBase64Ready}</td>
                                <td><code>function</code></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
        </section>
    `;



    function handleBase64Video(base64) {
        console.log('Recorded video Base64:', base64);
    }

    function handleBase64Audio(base64) {
        console.log('Recorded audio Base64:', base64);
    }
    const postRender = () => {
        setupVideoEvents(handleBase64Video);
        setupAudioEvents(handleBase64Audio);
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
