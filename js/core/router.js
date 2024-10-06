import { renderPage } from './render.js';
import { HomePage } from '../pages/home.js';
import { AboutPage } from '../pages/about.js';
import { DetailsPage } from '../pages/details.js';  // Example of a dynamic page

// Import the new pages
import { ModalPage } from '../pages/modalPage.js';
import { LinkPage } from '../pages/linkPage.js';
import { TabsPage } from '../pages/tabsPage.js';
import { ImagePage } from '../pages/imagePage.js';
import { ThemeSelectorPage } from '../pages/themeSelectorPage.js';
import { AccessibilityPage } from '../pages/accessibilityPage.js';
import { SoporteMultimediaPage } from '../pages/soporteMultimediaPage.js';

// Define the routes and the associated pages
const routes = {
    '/': HomePage,
    '/about': AboutPage,
    '/details/:id': DetailsPage,  // Dynamic route
    '/modal': ModalPage,  // Page for the Modal component
    '/link': LinkPage,  // Page for the Link component
    '/tabs': TabsPage,  // Page for the Tabs component
    '/image': ImagePage,  // Page for the Image component
    '/theme-selector': ThemeSelectorPage,  // Page for the theme selector
    '/accessibility': AccessibilityPage,  // Page for the accessibility component
    '/soporte-multimedia': SoporteMultimediaPage,  // New route for Multimedia Support

};

// Function to extract dynamic parameters from a route
function extractParams(route, url) {
    const routeParts = route.split('/');
    const urlParts = url.split('/');
    const params = {};

    routeParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1);  // Remove the ":"
            params[paramName] = urlParts[index];  // Extract the parameter value
        }
    });

    return params;
}

// Function that compares the route and the current URL
function matchRoute(route, url) {
    const routeParts = route.split('/');
    const urlParts = url.split('/');

    if (routeParts.length !== urlParts.length) {
        return false;  // Different number of parts, no match
    }

    return routeParts.every((part, index) => {
        return part.startsWith(':') || part === urlParts[index];
    });
}

// Function that gets the current path from the URL (without hash)
function getCurrentPath() {
    return window.location.pathname || '/';
}

// Function that manages the routing
function router() {
    const path = getCurrentPath();

    // Find route matches in the routes list
    const matchedRoute = Object.keys(routes).find(route => matchRoute(route, path));

    if (matchedRoute) {
        // Extract parameters if it's a dynamic route
        const params = extractParams(matchedRoute, path);
        const page = routes[matchedRoute];

        // Check if the page returns a layout and postRender
        const { layout, postRender } = page(params);  // Pass the parameters to the page

        if (layout) {
            renderPage(layout, 'app', postRender);  // Render with layout and postRender
        } else {
            renderPage(page(params));  // If there's no layout, render directly
        }
    } else {
        renderPage('Page not found');
    }
}

// Function to navigate to a new route
export function navigateTo(url) {
    window.history.pushState({}, '', url);  // Update the URL without reloading the page
    router();  // Call the router to load the new route
}

// Listen for the "popstate" event to handle the browser back/forward buttons
window.addEventListener('popstate', router);

// Call the router when the page loads for the first time
window.addEventListener('load', router);
