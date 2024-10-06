// File: js/components/card.js

export function Card({ title, content, buttonText1 = '', buttonId1 = '', buttonEvent1 = null, buttonText2 = '', buttonId2 = '', buttonEvent2 = null, style = "default" }) {
    // Logic to assign events to buttons after the DOM has been rendered
    setTimeout(() => {
        const button1 = document.getElementById(buttonId1);
        const button2 = document.getElementById(buttonId2);

        if (button1 && typeof buttonEvent1 === 'function') {
            button1.addEventListener('click', buttonEvent1);
        }
        if (button2 && typeof buttonEvent2 === 'function') {
            button2.addEventListener('click', buttonEvent2);
        }
    }, 0);

    // Dynamically generate buttons based on the style
    const renderButtons = () => {
        if (style === 'single-button' && buttonText1) {
            return `<button id="${buttonId1}" class="btn btn-primary">${buttonText1}</button>`;
        }
        if (style === 'double-button' && buttonText1 && buttonText2) {
            return `
                <button id="${buttonId1}" class="btn btn-primary mr-2">${buttonText1}</button>
                <button id="${buttonId2}" class="btn btn-secondary">${buttonText2}</button>
            `;
        }
        return ''; // No buttons by default
    };

    return `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                ${renderButtons()}
            </div>
        </div>
    `;
}
