// File: js/components/head.js

export function Head({ cssFiles = [], jsFiles = [] }) {
    // Function to add CSS files to the head
    const addCSS = (cssFiles) => {
        cssFiles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file;
            document.head.appendChild(link);
        });
    };

    // Function to add JS files to the head
    const addJS = (jsFiles) => {
        jsFiles.forEach(file => {
            const script = document.createElement('script');
            script.src = file;
            script.async = true; // Load scripts asynchronously
            document.head.appendChild(script);
        });
    };

    // Insert the CSS and JS files into the head
    addCSS(cssFiles);
    addJS(jsFiles);

    // The component doesn't need to return any HTML, just add to the head
    return '';
}
