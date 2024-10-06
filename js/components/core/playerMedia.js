// File: js/components/playerMedia.js

// Function to start video recording with selected devices
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
            
            // Convert to Base64
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

// File: js/components/playerMedia.js

// Function to record audio and convert it to base64
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

                // Convert the blob to base64
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
        console.error('Error accessing microphone:', error);
        throw error;
    }
}
