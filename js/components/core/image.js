// File: js/components/image.js

export function Image({
    url = '',
    alt = 'image',  // Custom alternative text
    width = 'auto',
    height = 'auto',
    responsive = false,
    adaptation = 'cover',  // Options: 'cover', 'contain', 'fill'
    highResolution = false  // High resolution enhancement for high-density screens
}) {
    // Basic classes for the image
    let imgClass = '';
    let style = `width: ${validateUnit(width)}; height: ${validateUnit(height)}; object-fit: ${adaptation};`;

    // If the image should be responsive, add the corresponding Bootstrap class
    if (responsive) {
        imgClass += ' img-fluid';  // Class for responsive images (from Bootstrap)
    }

    // Logic to enhance image resolution using srcset
    let srcSet = '';
    if (highResolution) {
        const pixelRatio = window.devicePixelRatio || 1;
        const highResWidth = parseFloat(width) * pixelRatio;
        const highResHeight = parseFloat(height) * pixelRatio;
        
        // Generate srcset for high-resolution images
        srcSet = `srcset="${url} ${pixelRatio}x"`;

        // Apply style adjusted to the screen's resolution
        style += ` width: ${highResWidth}px; height: ${highResHeight}px;`;
    }

    // Function to validate the unit of measurement
    function validateUnit(value) {
        return isNaN(value) ? value : `${value}px`;
    }

    // Return the img element with the applied properties and styles
    return `
        <img src="${url}" ${srcSet} class="${imgClass}" style="${style}" alt="${alt}" />
    `;
}
