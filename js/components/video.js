
let mediaRecorder = null;
let stream = null; // Variable global para mantener el stream

// Función para manejar el conteo antes de iniciar la grabación
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
                resolve();  // Conteo terminado
            }
        }, 1000);
    });
}

// Función para iniciar la grabación de video
async function handleVideoRecording(selectedCamera, selectedMic, onBase64Ready) {
    try {
        // Configurar las restricciones de cámara y micrófono
        const constraints = {
            video: { deviceId: selectedCamera ? { exact: selectedCamera } : true },
            audio: { deviceId: selectedMic ? { exact: selectedMic } : true }
        };

        // Obtener el stream de video y audio
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        // Asignar el stream al video preview para mostrar lo que se está grabando
        const videoElement = document.getElementById('video-preview');
        videoElement.srcObject = stream;


        // Esperar el conteo de 3 segundos antes de iniciar la grabación
        await startCountdown();  // Esperamos a que termine el conteo
        videoElement.play();  // Iniciar la reproducción del video en el preview
        // Iniciar el MediaRecorder con el stream capturado después del conteo
        mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];

        // Manejar los datos disponibles de la grabación
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // Cuando se detiene la grabación, crear un archivo de video
        mediaRecorder.onstop = function () {
            const blob = new Blob(recordedChunks, { type: 'video/mp4' });
            const videoURL = URL.createObjectURL(blob);

            // Mostrar el video grabado en la vista previa
            videoElement.srcObject = null;  // Desconectar el stream de la cámara
            videoElement.src = videoURL;    // Mostrar el video grabado
            videoElement.controls = true;
            videoElement.play();

            // Habilitar el botón de descarga
            const downloadBtn = document.getElementById('download-btn');
            downloadBtn.href = videoURL;
            downloadBtn.download = 'grabacion.mp4';
            downloadBtn.style.display = 'inline-block';

            // Convertir el archivo grabado a Base64 y llamar al callback
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64 = reader.result;
                if (onBase64Ready && typeof onBase64Ready === 'function') {
                    onBase64Ready(base64);
                }
            };
            reader.readAsDataURL(blob);
        };

        // Comenzar la grabación después del conteo y mostrar los botones de pausa y detener
        mediaRecorder.start();
        document.getElementById('pause-btn').style.display = 'inline-block';
        document.getElementById('stop-btn').style.display = 'inline-block';

    } catch (error) {
        console.error('Error grabando video:', error);
    }
}

// Pausar o reanudar la grabación
function togglePauseRecording() {
    const pauseBtn = document.getElementById('pause-btn');
    const videoElement = document.getElementById('video-preview');

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.innerText = 'Reanudar';
        videoElement.pause();
    } else if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        pauseBtn.innerText = 'Pausar';
        videoElement.play();
    }
}

// Detener la grabación
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();

        // Detener el stream de la cámara
        stream.getTracks().forEach(track => track.stop());

        document.getElementById('pause-btn').style.display = 'none';
        document.getElementById('stop-btn').style.display = 'none';
    }
}

// Cargar los dispositivos multimedia (cámaras y micrófonos)
export async function loadMediaDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
    const audioInputDevices = devices.filter(device => device.kind === 'audioinput');

    // Popular las listas de cámaras y micrófonos
    const cameraSelect = document.getElementById('camera-select');
    const micSelect = document.getElementById('mic-select');
    
    videoInputDevices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Cámara ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
    });

    audioInputDevices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Micrófono ${micSelect.length + 1}`;
        micSelect.appendChild(option);
    });
}

// Componente de Video
export function Video({ mode = 'play', videoUrl = '', onBase64Ready = null }) {
    if (mode === 'play') {
        //Reproducción de Video
        return `
            <div>
                <video id="video" controls width="320" height="240" src="${videoUrl}"></video>
            </div>
        `;
    }
    //Grabación de Video
    return `
        <div>
            <div class="form-group">
                <label for="camera-select">Seleccionar Cámara:</label>
                <select id="camera-select" class="form-control"></select>
            </div>
            <div class="form-group">
                <label for="mic-select">Seleccionar Micrófono:</label>
                <select id="mic-select" class="form-control"></select>
            </div>

            <div id="countdown" style="font-size: 2rem; display: none; color: red; text-align: center;">3</div>

            <button id="start-video-btn" class="btn btn-primary">Iniciar Grabación de Video</button>
            <button id="pause-btn" class="btn btn-warning" style="display: none;">Pausar</button>
            <button id="stop-btn" class="btn btn-danger" style="display: none;">Detener</button>
            <a id="download-btn" class="btn btn-success" style="display: none;">Descargar Video</a>

            <video id="video-preview" width="320" height="240" controls></video>
        </div>
    `;
}

// Lógica de eventos después de renderizar el componente Video
export function setupVideoEvents(onBase64Ready) {
    // Cargar los dispositivos multimedia
    loadMediaDevices();

    // Iniciar grabación de video
    document.getElementById('start-video-btn').addEventListener('click', () => {
        const selectedCamera = document.getElementById('camera-select').value;
        const selectedMic = document.getElementById('mic-select').value;
        handleVideoRecording(selectedCamera, selectedMic, onBase64Ready);
    });

    // Pausar/reanudar grabación
    document.getElementById('pause-btn').addEventListener('click', togglePauseRecording);

    // Detener grabación
    document.getElementById('stop-btn').addEventListener('click', stopRecording);
}
