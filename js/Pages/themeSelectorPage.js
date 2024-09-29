import { BasicLayout } from '../layouts/BasicLayout.js';
import { ThemeSelector, setupThemeSelector } from '../components/themeSelector.js';

export function ThemeSelectorPage() {
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente Selector de Tema</h2>
            <p>El Selector de Tema permite cambiar entre temas visuales como claro y oscuro.</p>
            ${ThemeSelector()}
        </section>
    `;

    const postRender = () => {
        setupThemeSelector();
    };

    return {
        layout: BasicLayout(content, { title: 'Selector de Tema', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
