import { loadTranslations, getUserLanguage } from '../../translations/index.js';  // Load translations

let mediaRecorder = null;
let stream = null;  // Global variable to hold the stream
let audioBlob = null;
let audioBase64 = null;
let selectedMic = null;  // Selected microphone
// Load translations based on the user's language
const userLanguage = getUserLanguage();
const translations = await loadTranslations(userLanguage);
// Function to handle the countdown before starting the recording
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
                resolve();  // Countdown finished
            }
        }, 1000);
    });
}

// Function to handle audio recording
async function handleAudioRecording(selectedMic, onBase64Ready) {
    try {
        // Set up audio constraints with the selected microphone
        const constraints = {
            audio: { deviceId: selectedMic ? { exact: selectedMic } : true }
        };

        // Get the audio stream
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        // Wait for the 3-second countdown before starting the recording
        await startCountdown();

        // Start recording
        mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];

        // Handle available data from the recording
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // When recording stops, create an audio file
        mediaRecorder.onstop = function () {
            audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
            const audioURL = URL.createObjectURL(audioBlob);

            // Display the recorded audio in the preview
            const audioElement = document.getElementById('audio-preview');
            audioElement.srcObject = null;  // Disconnect the microphone stream
            audioElement.src = audioURL;    // Show the recorded audio
            audioElement.controls = true;

            // Enable the download button
            const downloadBtn = document.getElementById('download-audio-btn');
            downloadBtn.href = audioURL;
            downloadBtn.download = 'audio_recording.webm';
            downloadBtn.style.display = 'inline-block';

            // Convert the recorded file to Base64 and call the callback
            const reader = new FileReader();
            reader.onloadend = function () {
                audioBase64 = reader.result;
                if (onBase64Ready && typeof onBase64Ready === 'function') {
                    onBase64Ready(audioBase64);
                }
            };
            reader.readAsDataURL(audioBlob);
        };

        // Start recording and show the pause and stop buttons
        mediaRecorder.start();
        document.getElementById('pause-audio-btn').style.display = 'inline-block';
        document.getElementById('stop-audio-btn').style.display = 'inline-block';

    } catch (error) {
        console.error('Error recording audio:', error);
    }
}

// Load audio input devices (microphones)
export async function loadAudioDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

        // Populate the microphone select options
        const micSelect = document.getElementById('mic-select-audio');
        micSelect.innerHTML = '';  // Clear the select before populating

        audioInputDevices.forEach(device => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Microphone ${micSelect.length + 1}`;
            micSelect.appendChild(option);
        });

        // Handle microphone selection
        micSelect.addEventListener('change', (event) => {
            selectedMic = event.target.value;  // Store the selected microphone ID
        });

        // Select the first microphone by default if available
        if (audioInputDevices.length > 0) {
            selectedMic = audioInputDevices[0].deviceId;
        }
    } catch (error) {
        console.error('Error loading audio devices:', error);
    }
}

// Audio Component
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
// Pause or resume audio recording
function togglePauseRecording() {
    const pauseBtn = document.getElementById('pause-audio-btn');

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.innerText = 'Resume';
    } else if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        pauseBtn.innerText = 'Pause';
    }
}

// Stop audio recording
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();

        // Stop the microphone stream
        stream.getTracks().forEach(track => track.stop());

        document.getElementById('pause-audio-btn').style.display = 'none';
        document.getElementById('stop-audio-btn').style.display = 'none';
    }
}
// Event logic after rendering the Audio component
export function setupAudioEvents(onBase64Ready) {
    // Load audio devices for this component
    loadAudioDevices();

    // Ensure the elements exist before adding the events
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
