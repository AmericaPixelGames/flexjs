// Archivo: js/layouts/BasicLayout.js

import { Navbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';
export function BasicLayout(content, options = {}) {
    const { title = 'Mi Aplicación', footerText = '© 2023 Mi Aplicación' } = options;
    const links = [
        { name: 'Inicio', url: '/' },
        { name: 'Acerca de', url: '/about' },
        { name: 'Detalles', url: '/details/1' },
        { name: 'Todo', url: '/todo/9' }
    ];
    return `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${title}</title>
            </head>
            <body>
                <header>
                    ${Navbar('Mi Framework', links)}
                </header>

                <main class="container mt-4">
                    ${content}  <!-- Aquí se inserta el contenido específico de la página -->
                </main>

                ${Footer(footerText)} <!-- Usamos el Footer aquí -->
            </body>
        </html>
    `;
}
