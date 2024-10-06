// Archivo: js/components/tab.js 

export function Tabs({ id, tabs = [], orientation = 'horizontal', position = 'left' }) {
    if (!tabs.length) return '';  // Si no hay pestañas, devolver una cadena vacía

    // Definir clases de Bootstrap según la orientación
    const navClass = orientation === 'vertical' ? 'nav-pills flex-column' : 'nav-tabs';
    const contentClass = orientation === 'vertical' ? 'col-9' : ''; // Si es vertical, el contenido tendrá ancho de columna

    // Crear los encabezados de las pestañas con un ID único para cada conjunto
    const tabHeaders = tabs.map((tab, index) => `
        <li class="nav-item">
            <a  class="nav-link ${index === 0 ? 'active' : ''}" id="${id}-tab-${index}" data-toggle="tab-${id}" href="#${id}-content-${index}" role="tab" aria-controls="${id}-content-${index}" aria-selected="${index === 0}">
                ${tab.title}
            </a>
        </li>
    `).join('');

    // Crear el contenido de las pestañas con un ID único para cada conjunto
    const tabContents = tabs.map((tab, index) => `
        <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="${id}-content-${index}" role="tabpanel" aria-labelledby="${id}-tab-${index}">
            ${tab.content}
        </div>
    `).join('');

    // Si la orientación es vertical, decidir si las pestañas están a la izquierda o a la derecha
    if (orientation === 'vertical') {
        if (position === 'left') {
            return `
                <div class="row">
                    <div class="col-3">
                        <ul class="nav ${navClass}" id="${id}-tablist" role="tablist">
                            ${tabHeaders}
                        </ul>
                    </div>
                    <div class="${contentClass}">
                        <div class="tab-content" id="${id}-tabContent">
                            ${tabContents}
                        </div>
                    </div>
                </div>
            `;
        } else if (position === 'right') {
            return `
                <div class="row">
                    <div class="${contentClass}">
                        <div class="tab-content" id="${id}-tabContent">
                            ${tabContents}
                        </div>
                    </div>
                    <div class="col-3">
                        <ul class="nav ${navClass}" id="${id}-tablist" role="tablist">
                            ${tabHeaders}
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    // Si es horizontal, solo devolver la lista de pestañas y su contenido
    return `
        <ul class="nav ${navClass}" id="${id}-tablist" role="tablist">
            ${tabHeaders}
        </ul>
        <div class="tab-content" id="${id}-tabContent">
            ${tabContents}
        </div>
    `;
}

// Función para inicializar los tabs de Bootstrap correctamente (versión 4.5.2)
export function setupTabs(id) {
    // Usar el evento 'shown.bs.tab' de Bootstrap para asegurar que las pestañas se activen correctamente
    $(`#${id}-tablist a[data-toggle="tab-${id}"]`).on('click', function (e) {
     
        $(this).tab('show');  // Mostrar el contenido de la pestaña seleccionada
        $(`#${id}-tablist a[data-toggle="tab-${id}"]`).removeClass('active');
        $('#'+e.target.id).addClass('active'); 
        e.preventDefault();
    });
}
