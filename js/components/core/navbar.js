// File: js/components/navbar.js
import { navigateTo } from '../../core/router.js';
import { Image } from './image.js';  // Importing the Image component
import { LanguageSwitcher, setupLanguageSwitcher } from './languageSwitcher.js'; // Import the switcher
export function Navbar(title, links, logoUrl = '') {  // Add logoUrl as an optional parameter

    const navLinks = links.map(link => {
        const activeClass = window.location.pathname === link.url ? 'active' : '';
        return `
            <li class="nav-item">
                <a class="nav-link ${activeClass}" href="${link.url}" data-url="${link.url}">${link.name}</a>
            </li>
        `;
    }).join('');

    // If logoUrl is provided, use the Image component, otherwise just display the title
    const brandContent = logoUrl 
        ? `${Image({
              url: logoUrl,
              width: '40px',  // Width for the logo
              height: 'auto', // Maintain aspect ratio
              responsive: false,  // No need for responsive behavior here
              adaptation: 'contain',  // Make sure the image fits nicely in its container
              highResolution: true // Render in high resolution
          })} ${title}` 
        : title;

    return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">${brandContent}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav" style='justify-content: space-between;'>
                <ul class="navbar-nav">
                    ${navLinks}
                </ul>
                <!-- Here we add the language switcher as a dropdown -->
                ${LanguageSwitcher()}
            </div>
        </nav>
    `;
}

// Dynamically assign click events to navigation links
export function setupNavbarEvents() {
    setupLanguageSwitcher();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const url = this.getAttribute('data-url');
            navigateTo(url);  // Call navigateTo function when clicked
        });
    });
}
