// Archivo: js/pages/details.js
import { BasicLayout } from '../layouts/BasicLayout.js';
export function DetailsPage(params) {
    const { id } = params;
    const content = `
        <section>
            <h2>Detalle del ítem ${id}</h2>
            <p>Mostrando información del ítem con ID: ${id}.</p>
        </section>
    `;

    const postRender = () => {
        // Asignar eventos a los botones de las tarjetas
        document.getElementById('button-3').addEventListener('click', () => {
            alert('Más información sobre nosotros.');
        });
    };
    //renderPage(pageContent, '#page-content', postRender);
    
    return { 
        layout: BasicLayout(content, { title: 'Details - Mi Aplicación ${id}', footerText: '© 2023 Mi Aplicación' }),
        postRender // Necesitamos ejecutar postRender para agregar eventos
    };
    
}
