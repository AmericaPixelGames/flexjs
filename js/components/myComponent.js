// File: js/components/myComponent.js

// Function to create a simple component with a title, content, and a button
export function MyComponent({ title = 'Example Title', content = 'This is example content.' }) {
    // Return the component's HTML with the provided values
    return `
        <div class="card mb-4" style="max-width: 400px; margin: 0 auto;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
            </div>
        </div>
    `;
}
