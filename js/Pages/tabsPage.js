import { BasicLayout } from '../layouts/BasicLayout.js';
import { Tabs } from '../components/tab.js';

export function TabsPage() {
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente Tabs</h2>
            <p>El componente Tabs permite cambiar entre diferentes vistas usando pestañas horizontales o verticales.</p>
            
            <h3 class="mt-4">Tabs Horizontales</h3>
            ${Tabs({
                id: 'horizontal',
                orientation: 'horizontal',
                tabs: [
                    { title: 'Pestaña 1', content: '<p>Contenido de la Pestaña 1.</p>' },
                    { title: 'Pestaña 2', content: '<p>Contenido de la Pestaña 2.</p>' },
                    { title: 'Pestaña 3', content: '<p>Contenido de la Pestaña 3.</p>' }
                ]
            })}

            <h3 class="mt-5">Tabs Verticales</h3>
            ${Tabs({
                id: 'vertical',
                orientation: 'vertical',
                position: 'left',
                tabs: [
                    { title: 'Pestaña A', content: '<p>Contenido de la Pestaña A.</p>' },
                    { title: 'Pestaña B', content: '<p>Contenido de la Pestaña B.</p>' },
                    { title: 'Pestaña C', content: '<p>Contenido de la Pestaña C.</p>' }
                ]
            })}
        </section>
    `;

    const postRender = () => {
        console.log('Página de Tabs cargada');
    };

    return {
        layout: BasicLayout(content, { title: 'Componente Tabs', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
