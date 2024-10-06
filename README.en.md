

# FlexJS – The Modular, Customizable, and Scalable Web Framework

Welcome to **FlexJS**, a revolutionary framework for building modern and dynamic web user interfaces. Designed to be easy to use for both experienced and novice developers, **FlexJS** provides a powerful and modular environment that simplifies the creation of advanced web applications. **Each component, as well as the framework itself, is fully customizable and scalable at the code and implementation level**, allowing developers to adapt the framework to their specific needs.

In addition, **FlexJS** allows **the free integration of external libraries and plugins**, which means you can integrate additional tools to expand the framework's functionality without restrictions. You can also use **custom CSS stylesheets** to design a unique interface, tailored to the style and needs of your application.

## What is FlexJS?

**FlexJS** is a fast, modular framework fully focused on **JavaScript (99%)** and **HTML5 (1%)**. Its main feature is the creation of reusable and **fully customizable** components, enabling the construction of complex interfaces with flexibility, improving the security and efficiency of web development. Whether you're building a simple webpage or a complex application, **FlexJS** offers powerful, easy-to-integrate tools to accelerate your development, with the ability to **scale** your application without sacrificing performance or organization.

## Who is FlexJS for?

**FlexJS** is ideal for both beginner and advanced developers. Its modular structure allows you to quickly start with predefined components, while its flexibility and **customization capability** ensure that any aspect of the framework can be adjusted or extended to meet project needs.

## Key Features of FlexJS

### 1. **Complete Modularity and Customization**
Each **FlexJS** component is independent, reusable, and fully **customizable**. You can mix and match modules like cards, modals, tabs, responsive images, video, audio, and more. **FlexJS** is designed to maximize modularity, allowing projects to scale and customize the behavior of each component based on the application’s needs.

Additionally, **FlexJS** allows you to freely add **external libraries and plugins**, expanding the framework's functionality without interfering with its core architecture. You can integrate tools for graphics, advanced functionalities like animations, or validations.

### 2. **Optimized and Customizable HTML5**
Using only a single HTML5 file, all content is rendered and managed directly from JavaScript, simplifying the initial setup and enhancing site security. **This approach is customizable**, allowing developers to adjust the HTML structure and optimize security according to the project’s specific requirements.

### 3. **Custom CSS Styles**
**FlexJS** gives you the freedom to use **custom CSS stylesheets**, allowing developers to fully adapt the design and visual style of their application. Whether integrating **Bootstrap** for responsive design or applying your own **CSS**, the framework imposes no design restrictions, giving you full control over the visual appearance.

### 4. **Advanced and Scalable Multimedia Components**
**FlexJS** includes video and audio components with both playback and recording capabilities, enabling dynamic device selection (camera and microphone). **These components are scalable** to support more complex multimedia streams or third-party integrations and can be customized to handle different file formats and resolutions as needed.

### 5. **Enhanced and Configurable Accessibility**
**FlexJS** prioritizes accessibility by offering components designed for visually impaired users and colorblind individuals. **Each accessibility component is fully configurable**, allowing it to be adjusted to meet accessibility standards or specific project requirements. This includes a theme selector that can be customized to offer different color schemes and visual adjustments for users with different types of visual impairments.

### 6. **Customizable Progressive Context**
The core of **FlexJS** includes a progressive context system that uses **localStorage** to store and quickly access application data. **This system is scalable and highly customizable**, allowing developers to store user data, preferences, and more efficiently. Developers can adapt this context to suit the dynamic or persistent storage needs of any application.

## Core Components of FlexJS

Each **FlexJS** component is designed to be **customizable** in terms of appearance, behavior, and functionality. Developers can **scale** the use of these components for larger or more complex projects without sacrificing modularity or simplicity.

### 1. **Modal Component**
The modal component allows you to create customizable pop-up windows, where the close and save events can be tailored by the developer. You can **adjust the content, events, and design** of the modal according to your application’s needs.


 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js';
import { Modal, showModal, handleModalEvents } from '../components/core/modal.js';
import { Head } from '../components/core/head.js';
export function ModalPage() {
    const modalId = 'modalExample';
    const content = `
        <section class="container mt-5">
            <!-- Button to open the modal -->
            <button id="open-modal-btn" class="btn btn-primary">${translations.modalPage_openButton}</button>
            <!-- Example of the Modal component -->
            ${Modal({
                id: modalId,
                title: translations.modalPage_modalTitle,
                content: `<p>${translations.modalPage_modalContent}</p>`,
                onClose: () => alert('Hello world'),
                onSave: () => alert('Hello world')
            })}
        </section>
    `;
    const postRender = () => {
        document.getElementById('open-modal-btn').addEventListener('click', () => {
            showModal(modalId);  // Show the modal
        });

        handleModalEvents(modalId, () => console.log(translations.modalPage_modalCloseAlert), () => console.log(translations.modalPage_modalSaveAlert));
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            })
        }),
        postRender// Inject JavaScript events
    };
}
```

### 2. **Customizable Theme Selector**
The theme selector allows you to switch between multiple themes (light, dark, and custom). **Themes are fully configurable**, and you can create new themes based on your application's colors and style. Theme preferences are saved in the application context so that users always have a consistent experience.
 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { ThemeSelector, setupThemeSelector } from '../components/core/themeSelector.js';
import { Head } from '../components/core/head.js';
export function ThemeSelectorPage() {
    // Main content of the page, including the theme selector
    const content = `
        <section class="container mt-5">
            ${ThemeSelector()} <!-- Component to select the theme -->
        </section>
    `;
    const postRender = () => {
        setupThemeSelector(); // Initialize the theme selector
        basicLayoutPostRender(); // Call postRender of the basic layout if necessary
    };

    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            })
        }),
        postRender // Inject JavaScript events
    };
}
```

### 3. **Image Component**
The image component adapts to different screen resolutions and devices, with options to make the image **responsive** or adapt to different containers. **Developers can customize the adaptation options**, adjusting how images are rendered on the interface, improving the user experience across devices.
 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Image } from '../components/core/image.js';
import { Head } from '../components/core/head.js';
export function ImagePage() {
    const content = `
        <section class="container mt-5">
            ${Image({
                url: 'https://via.placeholder.com/600',
                width: '100%',
                height: 'auto',
                responsive: true
            })}
        </section>
    `;
    const postRender = () => {
        console.log('Image Page loaded');
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            })
        }),
        postRender// Inject JavaScript events
    };
}
```

### 4. **Video Component**
The video component allows both playback and recording. **You can customize the recording format, camera and microphone inputs**, and handle the data in formats like base64 or blobs. Additionally, different resolutions and formats can be integrated based on the application's requirements.
 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Video, setupVideoEvents } from '../components/core/video.js';
import { Head } from '../components/core/head.js';
export function MultimediaSupportPage() {
    const content = `
        <section class="container mt-5">
            <!--Video Example in play mode-->
            ${Video({ mode: 'play', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' })}
            <!--Video Example in record mode-->
            ${Video({ mode: 'record', onBase64Ready: handleBase64Video })}
            </section>
        </section>
    `;
    function handleBase64Video(base64) {
        console.log('Base64 of the recorded video:', base64);
    }
    const postRender = () => {
        setupVideoEvents(handleBase64Video);
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>',
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            })
        }),
        postRender// Inject JavaScript events
    };
}
```
### 5. **Audio Component**
Similar to the video component, the audio component allows playback and recording with dynamic device selection. **You can scale the functionality of the component to handle different input sources and customize the audio recording format**.
 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Audio, setupAudioEvents } from '../components/core/audio.js';
import { Head } from '../components/core/head.js';
export function MultimediaSupportPage() {
    const content = `
        <section class="container mt-5">
            <!--Audio example in play mode-->
            ${Audio({ mode: 'play', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' })}
            <!--Audio example in record mode-->
            ${Audio({ mode: 'record', onBase64Ready: handleBase64Audio })}
        </section>
    `;

    function handleBase64Audio(base64) {
        console.log('Base64 of the recorded audio:', base64);
    }
    const postRender = () => {
        setupAudioEvents(handleBase64Audio);
        basicLayoutPostRender();
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>`,
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            })
        }),
        postRender// Inject JavaScript events
    };
}
```
### 6. **Tabs Component**
Developers can customize the orientation (horizontal or vertical) and the position (left or right) of the tabs. **The tab system is scalable**, allowing you to load dynamic content or entire sections of the application in a modular way.
 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Tabs, setupTabs } from '../components/core/tab.js';
import { Head } from '../components/core/head.js';
export function TabsPage() {
    const content = `
        <section class="container mt-5">
            <section class="mt-5">
                <!-- Horizontal Tabs Example -->
                ${Tabs({
                    id: 'horizontal',
                    orientation: 'horizontal',
                    tabs: [
                        { title: translations.tabsPage_tab1, content: `<p>${translations.tabsPage_tab1Content}</p>` },
                        { title: translations.tabsPage_tab2, content: `<p>${translations.tabsPage_tab2Content}</p>` },
                        { title: translations.tabsPage_tab3, content: `<p>${translations.tabsPage_tab3Content}</p>` }
                    ]
                })}
               
            </section>
            <section class="mt-5">
                <!-- Vertical Tabs Example -->
                ${Tabs({
                    id: 'vertical',
                    orientation: 'vertical',
                    position: 'left',
                    tabs: [
                        { title: translations.tabsPage_tabA, content: `<p>${translations.tabsPage_tabAContent}</p>` },
                        { title: translations.tabsPage_tabB, content: `<p>${translations.tabsPage_tabBContent}</p>` },
                        { title: translations.tabsPage_tabC, content: `<p>${translations.tabsPage_tabCContent}</p>` }
                    ]
                })}
            </section>
        </section>
    `;
    const postRender = () => {
        basicLayoutPostRender();
        setupTabs('vertical');
        setupTabs('horizontal');
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>`,
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            }) 
        }),
        postRender// Inject JavaScript events
    };
}
```
### 7. **Accessibility Components**
With **FlexJS**, you can **configure and customize** accessibility modes, enabling screen reading or applying visual adjustments based on the type of disability. The accessibility components are fully customizable to meet global accessibility standards or specific user needs.
 **Example**
```javascript
import { BasicLayout, postRender as basicLayoutPostRender } from '../layouts/BasicLayout.js'; 
import { Accessibility, setupAccessibilityEvents } from '../components/core/accessibility.js';
import { Head } from '../components/core/head.js';
export function AccessibilityPage() {
    // Page content with translations and description of the component
    const content = `
        <section class="container mt-5">
            <!-- Accessibility Component -->
            ${Accessibility()}  <!-- Show the accessibility component -->
        </section>
    `;
    const handleActivateAccessibility = (isEnabled) => {
        if (isEnabled) {
            console.log("Accessible mode activated");
        } else {
            console.log("Accessible mode deactivated");
        }
    };
    const postRender = () => {
        setupAccessibilityEvents(handleActivateAccessibility);
        basicLayoutPostRender();  // Call the basic postRender if necessary
    };
    return {
        layout: BasicLayout(content, { 
            title: 'FlexJS', 
            footerText: '© 2024 FlexJS - Developed by <a href="https://americapixelgames.com" target="_blank">AmericaPixelGames.com</a>`,
            head: Head({
                cssFiles: [
                    //'/css/styles.css', // Inject CSS file
                ],
                jsFiles: [
                    //'/js/utils.js', // Inject JS file
                ]
            })
        }),
        postRender// Inject JavaScript events
    };
}
```

### FlexJS Framework Details

Learn how **FlexJS** works, its modular structure, and how it optimizes modern web development.
**FlexJS** is designed to optimize modern web development, offering flexibility and customization in every aspect of the application. Below are some of its key features:

### **Dynamic Routing and Rendering**
**FlexJS** uses a single index.html file to handle the rendering of all application content. Navigation is performed without reloading the page, thanks to a dynamic routing system managed by router.js and render.js. This system interprets the browser’s URL, extracts parameters, and renders the appropriate page without reloading the entire interface.

The process includes:

router.js: This file breaks down the URL and extracts the necessary parameters to determine which component or page should be loaded.
 **Router.js**
```javascript
import { renderPage } from './render.js';
import { HomePage } from '../pages/home.js';
import { AboutPage } from '../pages/about.js';
import { DetailsPage } from '../pages/details.js';  // Example of a dynamic page

// Define the routes and associated pages
const routes = {
    '/': HomePage,
    '/about': AboutPage,
    '/details/:id': DetailsPage,  // Dynamic route
};

// Function to extract dynamic parameters from a route
function extractParams(route, url) {
    const routeParts = route.split('/');
    const urlParts = url.split('/');
    const params = {};

    routeParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1);  // Remove ":"
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

// Function that gets the current path from the URL (without the hash)
function getCurrentPath() {
    return window.location.pathname || '/';
}

// Function that manages routing
function router() {
    const path = getCurrentPath();

    // Find route matches in the route list
    const matchedRoute = Object.keys(routes).find(route => matchRoute(route, path));

    if (matchedRoute) {
        // Extract parameters if it is a dynamic route
        const params = extractParams(matchedRoute, path);
        const page = routes[matchedRoute];

        // Check if the page returns a layout and postRender
        const { layout, postRender } = page(params);  // Pass parameters to the page

        if (layout) {
            renderPage(layout, 'app', postRender);  // Render with layout and postRender
        } else {
            renderPage(page(params));  // If no layout, render directly
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

// Listen to the "popstate" event to handle the browser's back/forward buttons
window.addEventListener('popstate', router);

// Call the router when the page loads for the first time
window.addEventListener('load', router);

```
render.js: This file dynamically injects content into the DOM, making navigation within the application smooth and visually uninterrupted.
 **Render.js**
```javascript
// File: js/render.js

/**
 * Render function that dynamically inserts HTML content into the DOM
 * and executes any additional logic (events) after rendering.
 * 
 * @param {string} component - The HTML of the component or page to render.
 * @param {string} target - The selector of the container where the content will be rendered.
 * @param {Function} [postRender] - Optional function to be executed after rendering the content.
 */
export function renderPage(component, target = 'app', postRender = null) {
    const container = document.getElementById(target); 
    
    if (container && component !== undefined) {
        // Render the HTML content in the specified container
        container.innerHTML = component;

        // If a postRender function is passed, execute it after rendering
        if (typeof postRender === 'function') {
            postRender();
        }
    } else {
        //console.error(`Container ${target} not found in the DOM.`);
    }
}
```


### **Progressive Context and Data Persistence**
To manage the application state, **FlexJS** implements a progressive context system, which stores data locally using localStorage. This allows user information to persist throughout the session, even if the page is reloaded or the browser is closed.

The persistence flow includes:

Initial Context: When the application starts, predefined information is loaded into the context to set up the initial state.
Progressive Context: As the user interacts with the application, the context is dynamically updated, efficiently storing key data.
context.js: This file directly interacts with contextStorage.js, facilitating the reading and writing of progressive context data, ensuring they are available in future sessions.
 **context.js**
```javascript
// context.js - Application context management
import contextStorage from './contextStorage.js';
const context = (() => {
    // The initial context loaded when the app starts
    const initialContext = {
        appName: "My Framework",
        version: "1.0",
        user: {
            name: "User",
        },
        selectedTheme: "blue",
        highContrast: 'false',
        fontSize:"1",
        colorBlindMode: "none"
    };
    // The progressive context where the user adds or modifies data
    let progressiveContext = {};

    // Load the initial context into memory and localStorage when the app starts
    function loadInitialContext() {
        contextStorage.setItem('appContext', initialContext);  // Save the initial context to localStorage
        progressiveContext = { ...initialContext };  // Load the initial context into memory
    }
    // Get the full context (progressive or initial) in real-time
    function getContext() {
        return progressiveContext;
    }
    // Get a specific value from the context by key for either initialContext or progressiveContext
    function getContextValue(key, contextType = 'progressive') {
        if (contextType === 'initial') {
            return getNestedValue(initialContext, key);
        } else {
            return getNestedValue(progressiveContext, key);
        }
    }
    // Update a specific value in the progressive context and store it in localStorage
    function updateContext(key, value) {
        setNestedValue(progressiveContext, key, value);
        contextStorage.setItem('appContext', progressiveContext);  // Save the updated context in localStorage
    }
    // Function to add new data to the progressive context
    function addToContext(key, value) {
        if (!getNestedValue(progressiveContext, key)) {
            // Only add if the key does not exist in the progressive context
            setNestedValue(progressiveContext, key, value);
            contextStorage.setItem('appContext', progressiveContext);  // Update the localStorage
        } else {
            console.warn(`The key ${key} already exists in the progressive context.`);
        }
    }
    // Remove a specific key from the progressive context
    function removeFromContext(key) {
        deleteNestedValue(progressiveContext, key);
        contextStorage.setItem('appContext', progressiveContext);  // Update localStorage
    }
    // Load the progressive context from localStorage (if it exists)
    function loadProgressiveContext() {
        const storedContext = contextStorage.getItem('appContext');
        if (storedContext) {
            progressiveContext = { ...storedContext };  // Load the stored context into memory
        } else {
            loadInitialContext();  // If no stored context, load the initial one
        }
    }
    // Utility function to get a nested value by key
    function getNestedValue(obj, key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
    }
    // Utility function to update a nested value by key
    function setNestedValue(obj, key, value) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1) {
                o[i] = value;
            } else {
                o[i] = o[i] || {};
            }
            return o[i];
        }, obj);
    }
    // Utility function to delete a nested value by key
    function deleteNestedValue(obj, key) {
        const keys = key.split('.');
        keys.reduce((o, i, idx) => {
            if (idx === keys.length - 1 && o) {
                delete o[i];
            }
            return o ? o[i] : undefined;
        }, obj);
    }
    // Export the context functions
    return {
        loadInitialContext,
        getContext,
        getContextValue,
        updateContext,
        addToContext,
        removeFromContext,
        loadProgressiveContext
    };

})();
export default context;
```
contextStorage.js: This file directly interacts with localStorage, facilitating the reading and writing of context data, ensuring they are available in future sessions.
 **contextStorage.js**
```javascript
// contextStorage.js - LocalStorage management
const contextStorage = (() => {
    // Save a JSON object to localStorage with a specific key
    function setItem(key, value) {
        try {
            const valueString = JSON.stringify(value);
            localStorage.setItem(key, valueString);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    // Get a JSON object from localStorage based on the key
    function getItem(key) {
        try {
            const valueString = localStorage.getItem(key);
            return valueString ? JSON.parse(valueString) : null;
        } catch (error) {
            console.error('Error retrieving from localStorage:', error);
            return null;
        }
    }
    // Remove an item from localStorage based on the key
    function removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
    // Clear all localStorage (optional if you want to reset the storage)
    function clearStorage() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
    // Export the functions that will be available externally
    return {
        setItem,
        getItem,
        removeItem,
        clearStorage
    };
})();
export default contextStorage;
```
### **Accessibility and Translation Features**
**FlexJS** is committed to accessibility and internationalization, ensuring an inclusive experience for all users. The key features include:

Dynamic Translation: The framework allows changing the application language in real-time, loading the necessary translations from specific files without affecting performance.
In translation, index.js is responsible for serving the constant variables in JSON format that contain the translations based on the selected language.
Enhanced Accessibility: **FlexJS** includes features designed to improve the experience for users with visual or color perception disabilities, such as screen reader support and high contrast modes.

**This file is subject to changes as the framework evolves**.

© 2024 FlexJS - Developed by [AmericaPixelGames.com](https://americapixelgames.com)
