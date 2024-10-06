// File: js/render.js

/**
 * Rendering function that inserts dynamic HTML content into the DOM
 * and executes any additional logic (events) after rendering.
 * 
 * @param {string} component - The HTML of the component or page to render.
 * @param {string} target - The selector of the container where the content will be rendered.
 * @param {Function} [postRender] - Optional function that runs after the content is rendered.
 */
export function renderPage(component, target = 'app', postRender = null) {
    const container = document.getElementById(target); 
    
    if (container && component !== undefined) {
        // Render the HTML content into the specified container
        container.innerHTML = component;

        // If a postRender function is passed, execute it after rendering
        if (typeof postRender === 'function') {
            postRender();
        }
    } else {
        //console.error(`Container ${target} not found in the DOM.`);
    }
}
