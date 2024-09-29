// Archivo: js/components/footer.js

export function Footer(footerText = '© 2023 Mi Aplicación') {
    return `
        <footer class="bg-light text-center py-4 mt-5">
            <p>${footerText}</p>
        </footer>
    `;
}
