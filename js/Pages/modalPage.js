import { BasicLayout } from '../layouts/BasicLayout.js';
import { Modal, showModal, handleModalEvents } from '../components/modal.js';

export function ModalPage() {
    const modalId = 'modalExample';
    const content = `
        <section class="container mt-5">
            <h2 class="text-center">Componente Modal</h2>
            <p>El componente Modal permite crear ventanas emergentes personalizadas para mostrar contenido dinámico y recibir entradas del usuario.</p>
            <button id="open-modal-btn" class="btn btn-primary">Abrir Modal</button>
            
            ${Modal({
                id: modalId,
                title: 'Título del Modal',
                content: '<p>Este es un ejemplo de contenido en un modal.</p>',
                onClose: () => alert('Modal cerrado!'),
                onSave: () => alert('Datos guardados!')
            })}
        </section>
    `;

    const postRender = () => {
        document.getElementById('open-modal-btn').addEventListener('click', () => {
            showModal(modalId);
        });

        handleModalEvents(modalId, () => console.log('Modal cerrado'), () => console.log('Datos guardados'));
    };

    return {
        layout: BasicLayout(content, { title: 'Componente Modal', footerText: '© 2023 Mi Aplicación' }),
        postRender
    };
}
