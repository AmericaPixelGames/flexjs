// Archivo: js/components/link.js
export function HyperLinker({ href = '#', label = '', icon = '', onclick = null }) {
    // Si se proporciona un icono, lo añadimos antes del texto
    const iconHtml = icon ? `<i class="${icon}"></i> ` : '';

    // Creamos el enlace HTML con el icono (si lo hay) y el texto del label
    return `
        <a href="${href}" class="link-component" ${onclick ? `onclick="${onclick}"` : ''}>
            ${iconHtml}${label}
        </a>
    `;
}
