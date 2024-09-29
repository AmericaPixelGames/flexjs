import { BasicLayout } from '../layouts/BasicLayout.js';
import { Link } from '../components/link.js';

export function LinkPage() {
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente Link</h2>
            <p>El componente Link permite crear enlaces interactivos con iconos personalizados.</p>
            <div>
                ${Link({ href: '/about', label: 'Ir a Acerca de', icon: 'icon icon-check' })}
                ${Link({ href: 'https://google.com', label: 'Google', icon: 'icon icon-plus' })}
            </div>
        </section>
    `;

    const postRender = () => {
        console.log('Página de Link cargada');
    };

    return {
        layout: BasicLayout(content, { title: 'Componente Link', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
