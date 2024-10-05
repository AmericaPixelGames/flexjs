// Archivo: js/components/footer.js 

export function Footer(footerText = '© 2024 Mi Aplicación', logoUrl = '') {
    // Si se proporciona una URL de logo, incluir la imagen en el footer
    const logoImage = logoUrl ? `<img src="${logoUrl}" alt="Logo" style="height: 40px; margin-right: 10px;">` : '';

    return `
        <footer class="bg-light text-center py-4 mt-5">
            <div class="d-flex justify-content-center align-items-center">
                ${logoImage}
                
            </div>
            <p class="mb-0">${footerText}</p>
        </footer>
    `;
}
