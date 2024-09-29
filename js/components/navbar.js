// Archivo: js/components/navbar.js
import { navigateTo } from '../route2.js';

export function Navbar(title, links) {
    const navLinks = links.map(link => {
        const activeClass = window.location.pathname === link.url ? 'active' : '';
        return `
            <li class="nav-item">
                <a class="nav-link ${activeClass}" href="${link.url}" data-url="${link.url}">${link.name}</a>
            </li>
        `;
    }).join('');

    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">${title}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    ${navLinks}
                </ul>
            </div>
        </nav>
    `;
}

// Asignar eventos de clic a los enlaces de navegación dinámicamente
export function setupNavbarEvents() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const url = this.getAttribute('data-url');
            navigateTo(url);  // Llama a la función navigateTo cuando se hace clic
        });
    });
}
