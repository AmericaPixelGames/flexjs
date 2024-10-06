// Archivo: js/components/image.js

export function Image({
    url = '',
    alt = 'imagen',  // Texto alternativo personalizado
    width = 'auto',
    height = 'auto',
    responsive = false,
    adaptation = 'cover',  // Opciones: 'cover', 'contain', 'fill'
    highResolution = false  // Mejora de resolución para pantallas de alta densidad
}) {
    // Clases básicas para la imagen
    let imgClass = '';
    let style = `width: ${validateUnit(width)}; height: ${validateUnit(height)}; object-fit: ${adaptation};`;

    // Si la imagen debe ser responsive, añadimos la clase correspondiente de Bootstrap
    if (responsive) {
        imgClass += ' img-fluid';  // Clase para imágenes responsive (de Bootstrap)
    }

    // Lógica para mejorar la resolución de la imagen usando srcset
    let srcSet = '';
    if (highResolution) {
        const pixelRatio = window.devicePixelRatio || 1;
        const highResWidth = parseFloat(width) * pixelRatio;
        const highResHeight = parseFloat(height) * pixelRatio;
        
        // Generar srcset para imágenes de alta resolución
        srcSet = `srcset="${url} ${pixelRatio}x"`;

        // Aplicar estilo ajustado a la resolución de la pantalla
        style += ` width: ${highResWidth}px; height: ${highResHeight}px;`;
    }

    // Función para validar la unidad de medida
    function validateUnit(value) {
        return isNaN(value) ? value : `${value}px`;
    }

    // Retornar el elemento img con las propiedades y estilos aplicados
    return `
        <img src="${url}" ${srcSet} class="${imgClass}" style="${style}" alt="${alt}" />
    `;
}
