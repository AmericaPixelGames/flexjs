// Archivo: js/components/head.js

export function Head({ cssFiles = [], jsFiles = [] }) {
    // Función para agregar archivos CSS al head
    const addCSS = (cssFiles) => {
        cssFiles.forEach(file => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file;
            document.head.appendChild(link);
        });
    };

    // Función para agregar archivos JS al head
    const addJS = (jsFiles) => {
        jsFiles.forEach(file => {
            const script = document.createElement('script');
            script.src = file;
            script.async = true; // Carga los scripts de manera asíncrona
            document.head.appendChild(script);
        });
    };

    // Insertar los archivos CSS y JS en el head
    addCSS(cssFiles);
    addJS(jsFiles);

    // El componente no necesita devolver ningún HTML, solo agregar al head
    return '';
}
