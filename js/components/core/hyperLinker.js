// File: js/components/link.js
export function HyperLinker({ href = '#', label = '', icon = '', onclick = null }) {
    // If an icon is provided, add it before the text
    const iconHtml = icon ? `<i class="${icon}"></i> ` : '';

    // Create the HTML link with the icon (if present) and the label text
    return `
        <a href="${href}" class="link-component" ${onclick ? `onclick="${onclick}"` : ''}>
            ${iconHtml}${label}
        </a>
    `;
}
