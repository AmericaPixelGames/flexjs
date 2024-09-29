// Archivo: js/components/image.js

export function Image({
    url = '',
    width = 'auto',
    height = 'auto',
    responsive = false,
    adaptation = 'cover',  // Opciones: 'cover', 'contain', 'fill'
    highResolution = false  // Mejora de resolución
}) {
    // Clases básicas para la imagen
    let imgClass = '';
    let style = `width: ${width}; height: ${height}; object-fit: ${adaptation};`;

    // Si la imagen debe ser responsive, añadimos la clase correspondiente de Bootstrap
    if (responsive) {
        imgClass += ' img-fluid';  // Clase para imágenes responsive (de Bootstrap)
    }

    // Lógica para mejorar la resolución de la imagen
    if (highResolution) {
        const pixelRatio = window.devicePixelRatio || 1;
        style += ` width: ${parseFloat(width) * pixelRatio}px; height: ${parseFloat(height) * pixelRatio}px;`;
    }

    // Retornar el elemento img con las propiedades y estilos aplicados
    return `
        <img src="${url}" class="${imgClass}" style="${style}" alt="imagen" />
    `;
}
