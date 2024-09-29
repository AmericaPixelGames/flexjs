// Archivo: js/components/modal.js

export function Modal({ id, title, content, footer = '', onClose = null, onSave = null }) {
    // HTML para el modal de Bootstrap
    return `
        <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${id}Label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${id}Label">${title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        ${footer ? footer : `
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" id="${id}-save-btn">Guardar</button>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar el modal programáticamente
export function showModal(id) {
    $(`#${id}`).modal('show');  // Usamos jQuery para mostrar el modal
}

// Función para ocultar el modal programáticamente
export function hideModal(id) {
    $(`#${id}`).modal('hide');  // Usamos jQuery para ocultar el modal
}

// Función para manejar eventos del modal (por ejemplo, clic en "Guardar")
export function handleModalEvents(id, onClose, onSave) {
    // Cerrar modal
    if (onClose) {
        $(`#${id}`).on('hidden.bs.modal', onClose);
    }
    
    // Guardar cambios
    if (onSave) {
        $(`#${id}-save-btn`).on('click', onSave);
    }
}
