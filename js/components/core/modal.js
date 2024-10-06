// File: js/components/modal.js

export function Modal({ id, title, content, footer = '', onClose = null, onSave = null, textBtnClose = 'Close', textBtnSave = 'Save' }) {
    // HTML for the Bootstrap modal
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
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">${textBtnClose}</button>
                            <button type="button" class="btn btn-primary" id="${id}-save-btn">${textBtnSave}</button>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to show the modal programmatically
export function showModal(id) {
    $(`#${id}`).modal('show');  // Using jQuery to show the modal
}

// Function to hide the modal programmatically
export function hideModal(id) {
    $(`#${id}`).modal('hide');  // Using jQuery to hide the modal
}

// Function to handle modal events (e.g., click on "Save")
export function handleModalEvents(id, onClose, onSave) {
    // Close modal
    if (onClose) {
        $(`#${id}`).on('hidden.bs.modal', onClose);
    }
    
    // Save changes
    if (onSave) {
        $(`#${id}-save-btn`).on('click', onSave);
    }
}
