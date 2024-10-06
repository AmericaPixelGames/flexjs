// Archivo: js/render.js

/**
 * Función de renderizado que inserta contenido HTML dinámicamente en el DOM
 * y ejecuta cualquier lógica adicional (eventos) después del renderizado.
 * 
 * @param {string} component - El HTML del componente o página a renderizar.
 * @param {string} target - El selector del contenedor donde se renderizará el contenido.
 * @param {Function} [postRender] - Función opcional que se ejecuta después de renderizar el contenido.
 */
export function renderPage(component, target = 'app', postRender = null) {
    const container = document.getElementById(target); 
    
    if (container&& component!=undefined) {
        // Renderiza el contenido HTML en el contenedor especificado
        container.innerHTML = component;

        // Si se pasa una función postRender, se ejecuta después del renderizado
        if (typeof postRender === 'function') {
            postRender();
        }
    } else {
        //console.error(`Contenedor ${target} no encontrado en el DOM.`);
    }
}