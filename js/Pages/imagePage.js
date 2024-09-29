import { BasicLayout } from '../layouts/BasicLayout.js';
import { Image } from '../components/image.js';

export function ImagePage() {
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente Imagen</h2>
            <p>El componente Image permite mostrar imágenes con diferentes adaptaciones y resoluciones.</p>

            <h3 class="mt-4">Imagen Estándar</h3>
            ${Image({
                url: 'https://via.placeholder.com/600',
                width: '100%',
                height: 'auto',
                responsive: true
            })}

            <h3 class="mt-5">Imagen Adaptada (Cover)</h3>
            <div style="width: 400px; height: 250px; border: 1px solid #ccc;">
                ${Image({
                    url: 'https://via.placeholder.com/800x600',
                    width: '100%',
                    height: '100%',
                    adaptation: 'cover'
                })}
            </div>
        </section>
    `;

    const postRender = () => {
        console.log('Página de Imagen cargada');
    };

    return {
        layout: BasicLayout(content, { title: 'Componente Imagen', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
