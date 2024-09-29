// Archivo: js/components/card.js

export function Card(title, content, buttonText, buttonId , buttonEvent) {
    //const buttonId = `button-${Math.random().toString(36).substr(2, 9)}`; // Genera un ID único
    setTimeout(() => {
        const button = document.getElementById(buttonId);
        if (button && typeof buttonEvent === 'function') {
            button.addEventListener('click', buttonEvent);
        }
    }, 0);

    return `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                <button id="${buttonId}" class="btn btn-primary">${buttonText}</button>
            </div>
        </div>
    `;
}
