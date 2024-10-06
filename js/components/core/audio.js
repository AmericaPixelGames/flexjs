import { loadTranslations, getUserLanguage } from '../../translations/index.js';  // Cargar las traducciones

let mediaRecorder = null;
let stream = null;  // Variable global para mantener el stream
let audioBlob = null;
let audioBase64 = null;
let selectedMic = null;  // Micrófono seleccionado
// Cargar las traducciones según el idioma del usuario
const userLanguage = getUserLanguage();
const translations = await loadTranslations(userLanguage);
// Función para manejar el conteo antes de iniciar la grabación
async function startCountdown() {
    return new Promise((resolve) => {
        let countdown = 3;
        const countdownElement = document.getElementById('countdown-audio');
        countdownElement.innerText = countdown;
        countdownElement.style.display = 'block';

        const interval = setInterval(() => {
            countdown--;
            countdownElement.innerText = countdown;
            if (countdown === 0) {
                clearInterval(interval);
                countdownElement.style.display = 'none';
                resolve();  // Conteo terminado
            }
        }, 1000);
    });
}

// Función para manejar la grabación de audio
async function handleAudioRecording(selectedMic, onBase64Ready) {
    try {
        // Configurar las restricciones de audio con el micrófono seleccionado
        const constraints = {
            audio: { deviceId: selectedMic ? { exact: selectedMic } : true }
        };

        // Obtener el stream de audio
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        // Esperar el conteo de 3 segundos antes de iniciar la grabación
        await startCountdown();

        // Iniciar la grabación
        mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];

        // Manejar los datos disponibles de la grabación
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // Cuando se detiene la grabación, crear un archivo de audio
        mediaRecorder.onstop = function () {
            audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
            const audioURL = URL.createObjectURL(audioBlob);

            // Mostrar el audio grabado en la vista previa
            const audioElement = document.getElementById('audio-preview');
            audioElement.srcObject = null;  // Desconectar el stream del micrófono
            audioElement.src = audioURL;    // Mostrar el audio grabado
            audioElement.controls = true;

            // Habilitar el botón de descarga
            const downloadBtn = document.getElementById('download-audio-btn');
            downloadBtn.href = audioURL;
            downloadBtn.download = 'grabacion_audio.webm';
            downloadBtn.style.display = 'inline-block';

            // Convertir el archivo grabado a Base64 y llamar al callback
            const reader = new FileReader();
            reader.onloadend = function () {
                audioBase64 = reader.result;
                if (onBase64Ready && typeof onBase64Ready === 'function') {
                    onBase64Ready(audioBase64);
                }
            };
            reader.readAsDataURL(audioBlob);
        };

        // Comenzar la grabación y mostrar los botones de pausa y detener
        mediaRecorder.start();
        document.getElementById('pause-audio-btn').style.display = 'inline-block';
        document.getElementById('stop-audio-btn').style.display = 'inline-block';

    } catch (error) {
        console.error('Error grabando audio:', error);
    }
}

// Cargar los dispositivos de entrada de audio (micrófonos)
export async function loadAudioDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

        // Popular las opciones en el select de micrófono
        const micSelect = document.getElementById('mic-select-audio');
        micSelect.innerHTML = '';  // Limpiar el select antes de llenarlo

        audioInputDevices.forEach(device => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Micrófono ${micSelect.length + 1}`;
            micSelect.appendChild(option);
        });

        // Manejar la selección de micrófono
        micSelect.addEventListener('change', (event) => {
            selectedMic = event.target.value;  // Almacena el ID del micrófono seleccionado
        });

        // Seleccionar el primer micrófono por defecto si existe
        if (audioInputDevices.length > 0) {
            selectedMic = audioInputDevices[0].deviceId;
        }
    } catch (error) {
        console.error('Error al cargar los dispositivos de audio:', error);
    }
}

// Componente de Audio
export function Audio({ mode = 'play', audioUrl = '', onBase64Ready = null }) {
    if (mode === 'play') {
        return `
            <div>
                <audio id="audio" controls src="${audioUrl}"></audio>
            </div>
        `;
    }
    return `
        <div>
            <div class="form-group">
                <label for="mic-select-audio">${translations.audio_selectMic}:</label>
                <select id="mic-select-audio" class="form-control"></select>
            </div>

            <div id="countdown-audio" style="font-size: 2rem; display: none; color: red; text-align: center;">${translations.audio_countdown} 3</div>

            <button id="start-audio-btn" class="btn btn-primary">${translations.audio_startRecording}</button>
            <button id="pause-audio-btn" class="btn btn-warning" style="display: none;">${translations.audio_pause}</button>
            <button id="stop-audio-btn" class="btn btn-danger" style="display: none;">${translations.audio_stop}</button>
            <a id="download-audio-btn" class="btn btn-success" style="display: none;">${translations.audio_download}</a>

            <audio id="audio-preview" controls></audio>
        </div>
    `;
}
// Pausar o reanudar la grabación de audio
function togglePauseRecording() {
    const pauseBtn = document.getElementById('pause-audio-btn');

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.innerText = 'Reanudar';
    } else if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        pauseBtn.innerText = 'Pausar';
    }
}

// Detener la grabación de audio
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();

        // Detener el stream del micrófono
        stream.getTracks().forEach(track => track.stop());

        document.getElementById('pause-audio-btn').style.display = 'none';
        document.getElementById('stop-audio-btn').style.display = 'none';
    }
}
// Lógica de eventos después de renderizar el componente Audio
export function setupAudioEvents(onBase64Ready) {
    // Cargar los dispositivos de audio para este componente
    loadAudioDevices();

    // Asegurarse de que los elementos existan antes de agregar los eventos
    const startAudioBtn = document.getElementById('start-audio-btn');
    const pauseAudioBtn = document.getElementById('pause-audio-btn');
    const stopAudioBtn = document.getElementById('stop-audio-btn');

    if (startAudioBtn) {
        startAudioBtn.addEventListener('click', () => {
            const selectedMic = document.getElementById('mic-select-audio').value;
            handleAudioRecording(selectedMic, onBase64Ready);
        });
    }

    if (pauseAudioBtn) {
        pauseAudioBtn.addEventListener('click', togglePauseRecording);
    }

    if (stopAudioBtn) {
        stopAudioBtn.addEventListener('click', stopRecording);
    }
}
