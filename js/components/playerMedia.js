// Archivo: js/components/playerMedia.js

// Función para iniciar la grabación de video con dispositivos seleccionados
export async function videoMedia(constraints) {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];

    return new Promise((resolve, reject) => {
        mediaRecorder.ondataavailable = function (event) {
            chunks.push(event.data);
        };

        mediaRecorder.onstop = function () {
            const blob = new Blob(chunks, { type: 'video/mp4' });
            const videoURL = URL.createObjectURL(blob);
            
            // Convertir a Base64
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve({ base64: reader.result, blob, videoURL });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        };

        mediaRecorder.start();
    });
}

// Archivo: js/components/playerMedia.js

// Función para grabar audio y convertirlo en base64
export async function audioMedia(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const mediaRecorder = new MediaRecorder(stream);
        let chunks = [];

        return new Promise((resolve, reject) => {
            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function () {
                const blob = new Blob(chunks, { type: 'audio/webm' });

                // Convertir el blob a base64
                const reader = new FileReader();
                reader.onloadend = function () {
                    const base64Audio = reader.result;
                    resolve({ base64: base64Audio, blob, mediaRecorder });
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            };

            mediaRecorder.onerror = function (event) {
                reject(event.error);
            };

            mediaRecorder.start();
        });
    } catch (error) {
        console.error('Error accediendo al micrófono:', error);
        throw error;
    }
}


