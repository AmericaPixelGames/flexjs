// Archivo: js/pages/details.js
import { BasicLayout } from '../layouts/BasicLayout.js';
import { Card } from '../components/card.js';

export function TodoPage(params) {
    const { id } = params;
    const content = `
        <section>
            <h2>Todo del ítem ${id}</h2>
            <p>Mostrando información del ítem con ID: ${id}.</p>
            ${Card('Tarjeta de Información', 'Esta es una tarjeta con más información sobre nosotros.', 'Más información', "button-3")}
        </section>
    `;

    const postRender = () => {
        // Asignar eventos a los botones de las tarjetas
        document.getElementById('button-3').addEventListener('click', () => {
            alert(`Tarea ${id} completada!`);
        });
    };
    //renderPage(pageContent, '#page-content', postRender);
    return { 
        layout: BasicLayout(content, { title: `Tarea ${id}`, footerText: '© 2023 Mi Aplicación' }),
        postRender // Necesitamos ejecutar postRender para agregar eventos
    };
}
