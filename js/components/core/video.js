import { loadTranslations, getUserLanguage } from '../../translations/index.js';

export function Video({ mode = 'play', videoUrl = '', onBase64Ready = null }) {
    // Get the user's language and load translations
    const userLanguage = getUserLanguage();
    const translations = loadTranslations(userLanguage);

    if (mode === 'play') {
        // Video playback
        return `
            <div>
                <video id="video" controls width="320" height="240" src="${videoUrl}"></video>
            </div>
        `;
    }
    // Video recording
    return `
        <div>
            <div class="form-group">
                <label for="camera-select">${translations.videoComponent_cameraSelectLabel}</label>
                <select id="camera-select" class="form-control"></select>
            </div>
            <div class="form-group">
                <label for="mic-select">${translations.videoComponent_micSelectLabel}</label>
                <select id="mic-select" class="form-control"></select>
            </div>

            <div id="countdown" style="font-size: 2rem; display: none; color: red; text-align: center;">${translations.videoComponent_countdown}</div>

            <button id="start-video-btn" class="btn btn-primary">${translations.videoComponent_startRecordingButton}</button>
            <button id="pause-btn" class="btn btn-warning" style="display: none;">${translations.videoComponent_pauseButton}</button>
            <button id="stop-btn" class="btn btn-danger" style="display: none;">${translations.videoComponent_stopButton}</button>
            <a id="download-btn" class="btn btn-success" style="display: none;">${translations.videoComponent_downloadButton}</a>

            <video id="video-preview" width="320" height="240" controls></video>
        </div>
    `;
}

// Function to handle the countdown before starting recording
async function startCountdown() {
    return new Promise((resolve) => {
        let countdown = 3;
        const countdownElement = document.getElementById('countdown');
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

let mediaRecorder = null;
let stream = null;

async function handleVideoRecording(selectedCamera, selectedMic, onBase64Ready) {
    try {
        // Configure the selected camera and microphone constraints
        const constraints = {
            video: { deviceId: selectedCamera ? { exact: selectedCamera } : true },
            audio: { deviceId: selectedMic ? { exact: selectedMic } : true }
        };

        // Get the video and audio stream
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        // Assign the stream to the video preview to show what is being recorded
        const videoElement = document.getElementById('video-preview');
        videoElement.srcObject = stream;

        // Wait for the 3-second countdown before starting the recording
        await startCountdown();  // Call a function to handle the countdown
        videoElement.play();  // Start video playback in the preview

        // Start the MediaRecorder with the captured stream after the countdown
        mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];

        // Handle available data from the recording
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // When the recording stops, create a video file
        mediaRecorder.onstop = function () {
            const blob = new Blob(recordedChunks, { type: 'video/mp4' });
            const videoURL = URL.createObjectURL(blob);

            // Display the recorded video in the preview
            videoElement.srcObject = null;  // Disconnect the camera stream
            videoElement.src = videoURL;    // Show the recorded video
            videoElement.controls = true;
            videoElement.play();

            // Enable the download button
            const downloadBtn = document.getElementById('download-btn');
            downloadBtn.href = videoURL;
            downloadBtn.download = 'recording.mp4';
            downloadBtn.style.display = 'inline-block';

            // Convert the recorded file to Base64 and call the callback
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64 = reader.result;
                if (onBase64Ready && typeof onBase64Ready === 'function') {
                    onBase64Ready(base64);
                }
            };
            reader.readAsDataURL(blob);
        };

        // Start recording after the countdown and show the pause and stop buttons
        mediaRecorder.start();
        document.getElementById('pause-btn').style.display = 'inline-block';
        document.getElementById('stop-btn').style.display = 'inline-block';

    } catch (error) {
        console.error('Error recording video:', error);
    }
}

// Pause or resume recording
function togglePauseRecording() {
    const pauseBtn = document.getElementById('pause-btn');
    const videoElement = document.getElementById('video-preview');

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.innerText = 'Resume';
        videoElement.pause();
    } else if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        pauseBtn.innerText = 'Pause';
        videoElement.play();
    }
}

// Stop recording
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();

        // Stop the camera stream
        stream.getTracks().forEach(track => track.stop());

        document.getElementById('pause-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = 'none';
        document.getElementById('download-btn').style.display = 'inline-block';
    }
}

// Load media devices (cameras and microphones)
export async function loadMediaDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
    const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

    // Populate the camera and microphone lists
    const cameraSelect = document.getElementById('camera-select');
    const micSelect = document.getElementById('mic-select');
    
    videoInputDevices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
    });

    audioInputDevices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Microphone ${micSelect.length + 1}`;
        micSelect.appendChild(option);
    });
}

// Event logic after rendering the Video component
export function setupVideoEvents(onBase64Ready) {
    // Load media devices
    loadMediaDevices();

    // Start video recording
    document.getElementById('start-video-btn').addEventListener('click', () => {
        const selectedCamera = document.getElementById('camera-select').value;
        const selectedMic = document.getElementById('mic-select').value;
        handleVideoRecording(selectedCamera, selectedMic, onBase64Ready);
    });

    // Pause/resume recording
    document.getElementById('pause-btn').addEventListener('click', togglePauseRecording);

    // Stop recording
    document.getElementById('stop-btn').addEventListener('click', stopRecording);
}
