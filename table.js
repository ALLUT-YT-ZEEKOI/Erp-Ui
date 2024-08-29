


let draggedRow = null;
let draggedSection = [];
let dropIndicator = null;

function allowDrop(event) {
    event.preventDefault();
    const target = event.target.closest('tr');
    if (target && target !== draggedRow) {
        // Remove the existing drop indicator
        resetDropIndicator();
        // Create and insert a new drop indicator before the target row
        dropIndicator = document.createElement('tr');
        dropIndicator.className = 'drop-indicator';
        target.parentElement.insertBefore(dropIndicator, target);
    }
}



function drag(event) {
    draggedRow = event.target.closest('tr');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', null); // For Firefox
    draggedRow.classList.add('dragging');

    // Identify all rows that are part of the section to be dragged
    draggedSection = [draggedRow];
    let nextSibling = draggedRow.nextElementSibling;
    while (nextSibling && !nextSibling.classList.contains('main-data-row')) {
        draggedSection.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }
}

function drop(event) {
    event.preventDefault();
    if (dropIndicator) {
        const tableBody = document.querySelector('#myTable tbody');
        // Insert the dragged section before the drop indicator
        let insertAfterRow = dropIndicator.previousElementSibling;
        draggedSection.forEach(row => {
            tableBody.insertBefore(row, dropIndicator);
        });
        // Remove the drop indicator
        dropIndicator.remove();
    }
    resetDropIndicator();
    draggedRow.classList.remove('dragging');
}

function resetDropIndicator() {
    if (dropIndicator) {
        dropIndicator.remove();
        dropIndicator = null;
    }
}

document.addEventListener('dragend', resetDropIndicator);

function createMainDataRow() {
    const tableBody = document.querySelector('#myTable tbody');
    const newMainDataRow = document.createElement('tr');
    newMainDataRow.className = 'main-data-row';
    newMainDataRow.draggable = true;
    newMainDataRow.ondragstart = drag;
    newMainDataRow.ondragover = allowDrop;
    newMainDataRow.ondrop = drop;

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
        const placeholderText = `Data ${i + 1}.1`;

        if (i === 0) {
            newCell.className = 'data1-1';

            newCell.innerHTML = `
                <div class="cell-content">
                    <button onclick="createnormalrow_2(event)" class="data-1-1_btn">
                        <i class="bi bi-plus-lg"></i>
                    </button>
                    <div style="display: flex; align-items: center; margin-left:10px;">
                        <img src="assets/Vector (1).png" alt="" class="image_excel_1">
                        <img src="assets/orders_24dp_E8EAED_FILL0_wght300_GRAD-25_opsz24 1.png" alt="" class="image_excel">
                    </div>
                    <input type="text" placeholder="${placeholderText}" class="input-field cell-input-tag" />
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <div class="toggle-button" onclick="toggleButton(this)">
                            <div class="toggle-circle"></div>
                        </div>
                    </div>
                </div>
            `;

            // Attach the toggleRows event to the image
            const toggleImage = newCell.querySelector('.image_excel_1');
            if (toggleImage) {
                toggleImage.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent the click from bubbling up
                    toggleRows(newCell); // Ensure toggleRows function is defined
                });
            }
        } else {
            newCell.innerHTML = `
                <input type="text" placeholder="${placeholderText}" class="input-field cell-input-tag" />
            `;
        }

        const inputField = newCell.querySelector('input');
        if (inputField) {
            inputField.addEventListener('click', (event) => {
                event.stopPropagation(); // Stop the click event from propagating to the parent cell
            });
        }

        newMainDataRow.appendChild(newCell);
    }

    tableBody.appendChild(newMainDataRow);

    // Reattach event listeners to newly added rows
    newMainDataRow.addEventListener('dragstart', drag);
    newMainDataRow.addEventListener('dragover', allowDrop);
    newMainDataRow.addEventListener('drop', drop);
}

// Initially show 2 rows when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createMainDataRow();
    createMainDataRow();
});

// Ensure drag events apply to entire sections
document.querySelectorAll('.main-data-row').forEach(row => {
    row.addEventListener('dragstart', drag);
    row.addEventListener('dragover', allowDrop);
    row.addEventListener('drop', drop);
});


const maxLevel = 17;



function toggleRows(cell) {
    const currentRow = cell.parentElement;
    const nextRows = [];

    // Collect rows to toggle
    let nextSibling = currentRow.nextElementSibling;
    while (nextSibling && !nextSibling.classList.contains('main-data-row')) {
        nextRows.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }

    // Toggle visibility
    if (nextRows.length > 0) {
        if (nextRows[0].classList.contains('hidden')) {
            nextRows.forEach(row => row.classList.remove('hidden'));
            // Change icon to down when expanding
            cell.querySelector('i').classList.remove('bi-caret-right-fill');
            cell.querySelector('i').classList.add('bi-caret-down-fill');
        } else {
            nextRows.forEach(row => row.classList.add('hidden'));
            // Change icon to right when collapsing
            cell.querySelector('i').classList.remove('bi-caret-down-fill');
            cell.querySelector('i').classList.add('bi-caret-right-fill');
        }
    } else {
        if (cell.classList.contains('processed')) return;

        cell.classList.add('processed');
        const tableBody = document.querySelector('#myTable tbody');

        const normalRows = [];
        for (let rowIndex = 1; rowIndex <= 3; rowIndex++) {  // Now generating 3 rows
            const normalRow = document.createElement('tr');
            normalRow.className = 'normal-row';
            normalRow.style.position = 'relative'; // Create a positioning context for the button

            for (let i = 0; i < 8; i++) {
                const newCell = document.createElement('td');
                if (i === 0) {
                    // Create container for cell content and button
                    const cellContent = document.createElement('div');
                    cellContent.className = 'cell-content';

                    // Set innerHTML for the first cell to include the icon
                    cellContent.innerHTML = `<i class="bi bi-caret-right-fill"></i> Normal Row ${rowIndex} - ${i + 1}`;

                    // Create a small "+" button inside the first cell
                    const smallButton = document.createElement('button');
                    smallButton.textContent = '+';
                    smallButton.className = 'show-btn'; // Updated class name
                    smallButton.onclick = (event) => {
                        event.stopPropagation(); // Prevent triggering cell click event

                        // Find the first cell of the current row to use as the reference for creating sub-rows
                        const cell = event.target.closest('td');
                        createSubRows(cell, 1); // This will create sub-row 1.1
                    };

                    // Append the button to the container
                    cellContent.appendChild(smallButton);
                    newCell.appendChild(cellContent);

                    // Make the first cell clickable to toggle sub-rows
                    newCell.onclick = () => toggleSubRows(newCell, 1);
                } else {
                    newCell.textContent = `Normal Row ${rowIndex} - ${i + 1}`;
                }
                normalRow.appendChild(newCell);
            }
            normalRows.push(normalRow);
        }

        // Insert the three normal rows after the current row
        currentRow.insertAdjacentElement('afterend', normalRows[2]);
        currentRow.insertAdjacentElement('afterend', normalRows[1]);
        currentRow.insertAdjacentElement('afterend', normalRows[0]);

        // Adding the button to create more rows after the last normal row
        const addRowButtonRow = document.createElement('tr');
        const addRowButtonCell = document.createElement('td');
        addRowButtonCell.colSpan = 8;

        // Create the add row button
        // const addRowButton = document.createElement('button');
        // addRowButton.textContent = 'Add Row';
        // addRowButton.className = 'add-row-button';

        addRowButtonCell.appendChild(addRowButton);
        addRowButtonRow.appendChild(addRowButtonCell);
        normalRows[2].insertAdjacentElement('afterend', addRowButtonRow); // Adjusted to insert after the third normal row
    }
}






function createnormalrow_2(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the cell

    // Find the closest row to insert the new row after
    const currentRow = event.target.closest('td').parentElement;

    if (!currentRow) return;

    // Create a new normal row
    const normalRow = document.createElement('tr');
    normalRow.className = 'normal-row';

    for (let j = 0; j < 8; j++) {
        const newCell = document.createElement('td');
        newCell.textContent = `Normal Row - ${j + 1}`;

        if (j === 0) {
            // Set innerHTML for the first cell to include the icon
            newCell.innerHTML = `<i class="bi bi-caret-right-fill"></i> Normal Row - ${j + 1}`;

            // Create a small "+" button inside the first cell
            const smallButton = document.createElement('button');
            smallButton.textContent = '+';
            smallButton.className = 'small-btn';
            smallButton.onclick = (event) => {
                event.stopPropagation(); // Prevent triggering cell click event

                // Find the first cell of the current row to use as the reference for creating sub-rows
                const cell = event.target.closest('td');
                createSubRows(cell, 1); // This will create sub-row 1.1
            };

            // Append the button to the first cell
            newCell.appendChild(smallButton);

            // Make the first cell clickable to toggle sub-rows
            newCell.onclick = () => toggleSubRows(newCell, 1);
        }

        normalRow.appendChild(newCell);
    }

    // Insert the new row after the current row
    currentRow.insertAdjacentElement('afterend', normalRow);
}


function toggleSubRows(cell, level) {
    console.log("click");
    const currentRow = cell.parentElement;
    const nextRows = [];

    let nextSibling = currentRow.nextElementSibling;
    while (nextSibling && nextSibling.classList.contains('sub-row')) {
        nextRows.push(nextSibling);
        nextSibling = nextSibling.nextElementSibling;
    }

    // Update the icon immediately when clicked
    const iconElement = cell.querySelector('i');
    if (nextRows.length > 0 && nextRows[0].classList.contains('hidden')) {
        iconElement.classList.remove('bi-caret-right-fill');
        iconElement.classList.add('bi-caret-down-fill');
    } else {
        iconElement.classList.remove('bi-caret-down-fill');
        iconElement.classList.add('bi-caret-right-fill');
    }

    // Toggle rows visibility
    if (nextRows.length > 0) {
        nextRows.forEach(row => {
            row.classList.toggle('hidden');
        });
    } else {
        if (!cell.classList.contains('sub-row-processed')) {
            cell.classList.add('sub-row-processed');
            createSubRows(cell, level);

            // Ensure the icon is set correctly after creating new sub-rows
            iconElement.classList.remove('bi-caret-right-fill');
            iconElement.classList.add('bi-caret-down-fill');
        }
    }
}


function createSubRows(cell, level) {
    if (level >= maxLevel) return;

    const currentRow = cell.parentElement;
    const newRow = document.createElement('tr');
    newRow.className = `sub-row level-${level}`;

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
        if (i === 0) {
            // Create container for cell content and button
            const cellContent = document.createElement('div');
            cellContent.className = 'cell-content';

            // Set innerHTML for the first cell to include the icon
            cellContent.innerHTML = `
                <i class="bi bi-caret-right-fill"></i> Sub-row ${level}.${i + 1}
            `;

            // Create and add the small button
            const smallButton = document.createElement('button');
            smallButton.textContent = '+';
            smallButton.className = 'small-btnn';
            smallButton.onclick = (event) => {
                event.stopPropagation();
                createSubRows(newCell, level + 1);
            };
            cellContent.appendChild(smallButton);
            newCell.appendChild(cellContent);

            // Make the first cell clickable to toggle sub-rows
            newCell.onclick = () => toggleSubRows(newCell, level + 1);
        } else {
            newCell.textContent = `Sub-row ${level}.${i + 1}`;
        }
        newRow.appendChild(newCell);
    }

    currentRow.insertAdjacentElement('afterend', newRow);
    addOrReplaceButton(newRow, level);
}

smallButton.onclick = (event) => {
    event.stopPropagation();
    createSubRows(newCell, level + 1);
};


