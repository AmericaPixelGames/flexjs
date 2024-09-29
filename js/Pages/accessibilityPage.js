import { BasicLayout } from '../layouts/BasicLayout.js';
import { Accessibility, setupAccessibilityEvents } from '../components/accessibility.js';

export function AccessibilityPage() {
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente de Accesibilidad</h2>
            <p>Este componente permite habilitar funciones de accesibilidad como mejoras visuales y ayuda para usuarios con discapacidades.</p>
            ${Accessibility()}
        </section>
    `;

    const postRender = () => {
        setupAccessibilityEvents(handleActivateAccessibility);
    };

    const handleActivateAccessibility = (isEnabled) => {
        if (isEnabled) {
            console.log("Modo accesible activado");
        } else {
            console.log("Modo accesible desactivado");
        }
    };

    return {
        layout: BasicLayout(content, { title: 'Componente de Accesibilidad', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
