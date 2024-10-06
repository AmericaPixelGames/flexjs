// File: js/components/tab.js 

export function Tabs({ id, tabs = [], orientation = 'horizontal', position = 'left' }) {
    if (!tabs.length) return '';  // If there are no tabs, return an empty string

    // Define Bootstrap classes based on the orientation
    const navClass = orientation === 'vertical' ? 'nav-pills flex-column' : 'nav-tabs';
    const contentClass = orientation === 'vertical' ? 'col-9' : ''; // If vertical, the content will have column width

    // Create the tab headers with a unique ID for each set
    const tabHeaders = tabs.map((tab, index) => `
        <li class="nav-item">
            <a class="nav-link ${index === 0 ? 'active' : ''}" id="${id}-tab-${index}" data-toggle="tab-${id}" href="#${id}-content-${index}" role="tab" aria-controls="${id}-content-${index}" aria-selected="${index === 0}">
                ${tab.title}
            </a>
        </li>
    `).join('');

    // Create the tab content with a unique ID for each set
    const tabContents = tabs.map((tab, index) => `
        <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="${id}-content-${index}" role="tabpanel" aria-labelledby="${id}-tab-${index}">
            ${tab.content}
        </div>
    `).join('');

    // If the orientation is vertical, decide if the tabs are on the left or right
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

    // If horizontal, just return the tab list and its content
    return `
        <ul class="nav ${navClass}" id="${id}-tablist" role="tablist">
            ${tabHeaders}
        </ul>
        <div class="tab-content" id="${id}-tabContent">
            ${tabContents}
        </div>
    `;
}

// Function to properly initialize Bootstrap tabs (version 4.5.2)
export function setupTabs(id) {
    // Use Bootstrap's 'shown.bs.tab' event to ensure tabs are activated correctly
    $(`#${id}-tablist a[data-toggle="tab-${id}"]`).on('click', function (e) {
     
        $(this).tab('show');  // Show the selected tab content
        $(`#${id}-tablist a[data-toggle="tab-${id}"]`).removeClass('active');
        $('#' + e.target.id).addClass('active'); 
        e.preventDefault();
    });
}
