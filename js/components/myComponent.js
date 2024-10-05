// Archivo: js/components/myComponent.js

// Función para crear un componente sencillo con un título, contenido y un botón
export function MyComponent({ title = 'Título de Ejemplo', content = 'Este es el contenido de ejemplo.'}) {
    // Retornar el HTML del componente con los valores proporcionados
    return `
        <div class="card mb-4" style="max-width: 400px; margin: 0 auto;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
            </div>
        </div>
    `;
}
