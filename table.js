


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
        const placeholderText = `Data ${i + 1}.1`; // Placeholder text for each cell

        if (i === 0) {
            newCell.innerHTML = `
                <div style="display: flex; justify-content: space-between;">
                    <div style="display: flex; align-items: center;">
                        <img src="assets/orders_24dp_E8EAED_FILL0_wght300_GRAD-25_opsz24 1.png" alt="" class="image_excel">
                    </div>
                    <input type="text" placeholder="${placeholderText}" class="input-field cell-input-tag" />
                    <div style="display: flex; justify-content: space-around; align-items: center;">
                        <button onclick="createnormalrow_2(event)" class="data-1-1_btn">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                        <div class="toggle-button" onclick="toggleButton(this)">
                            <div class="toggle-circle"></div>
                        </div>
                    </div>
                </div>
            `;
            newCell.onclick = () => toggleRows(newCell); // Attach the toggleRows event only for the first cell
        } else {
            newCell.innerHTML = `
                <input type="text" placeholder="${placeholderText}" class="input-field cell-input-tag" />
            `;
        }

        // Prevent propagation when clicking the input field
        const inputField = newCell.querySelector('input');
        inputField.addEventListener('click', (event) => {
            event.stopPropagation(); // Stop the click event from propagating to the parent cell
        });

        newMainDataRow.appendChild(newCell);
    }

    tableBody.appendChild(newMainDataRow);

    // Reattach event listeners to newly added rows
    newMainDataRow.addEventListener('dragstart', drag);
    newMainDataRow.addEventListener('dragover', allowDrop);
    newMainDataRow.addEventListener('drop', drop);
}


// function createMainDataRow() {
//     const tableBody = document.querySelector('#myTable tbody');
//     const newMainDataRow = document.createElement('tr');
//     newMainDataRow.className = 'main-data-row';
//     newMainDataRow.draggable = true;
//     newMainDataRow.ondragstart = drag;
//     newMainDataRow.ondragover = allowDrop;
//     newMainDataRow.ondrop = drop;

//     for (let i = 0; i < 8; i++) {
//         const newCell = document.createElement('td');

//         if (i === 0) {
//             newCell.className = 'data1-1';
//             newCell.innerHTML = `
//                 <div style="display: flex; align-items: center; justify-content: space-between;">
//                     <div>
//                         <img src="assets/orders_24dp_E8EAED_FILL0_wght300_GRAD-25_opsz24 1.png" alt="" class="image_excel">
//                         Data 1.1
//                     </div>
//                     <div style="display: flex; justify-content: space-around; align-items: center;">
//                         <button onclick="createnormalrow_2(event)" class="data-1-1_btn">
//                             <i class="bi bi-plus-lg"></i>
//                         </button>
//                         <div class="toggle-button" onclick="toggleButton(this)">
//                             <div class="toggle-circle"></div>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             newCell.onclick = () => toggleRows(newCell); // Attach the toggleRows event only for the first cell
//         } else {
//             newCell.textContent = `New Data ${i + 1}`;
//         }

//         newMainDataRow.appendChild(newCell);
//     }

//     tableBody.appendChild(newMainDataRow);

//     // Reattach event listeners to newly added rows
//     newMainDataRow.addEventListener('dragstart', drag);
//     newMainDataRow.addEventListener('dragover', allowDrop);
//     newMainDataRow.addEventListener('drop', drop);
// }


// Ensure drag events apply to entire sections
document.querySelectorAll('.main-data-row').forEach(row => {
    row.addEventListener('dragstart', drag);
    row.addEventListener('dragover', allowDrop);
    row.addEventListener('drop', drop);
});


const maxLevel = 17;



function createnormalrow() {
    createNormalRow3(normalRows[1]);
}

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
        for (let rowIndex = 1; rowIndex <= 2; rowIndex++) {
            const normalRow = document.createElement('tr');
            normalRow.className = 'normal-row';
            for (let i = 0; i < 8; i++) {
                const newCell = document.createElement('td');
                if (i === 0) {
                    // Set innerHTML for the first cell to include the icon
                    newCell.innerHTML = `<i class="bi bi-caret-right-fill"></i>   Normal Row ${rowIndex} - ${i + 1}`;

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
                } else {
                    newCell.textContent = `Normal Row ${rowIndex} - ${i + 1}`;
                }
                normalRow.appendChild(newCell);
            }
            normalRows.push(normalRow);
        }

        currentRow.insertAdjacentElement('afterend', normalRows[1]);
        currentRow.insertAdjacentElement('afterend', normalRows[0]);

        const addRowButtonRow = document.createElement('tr');
        const addRowButtonCell = document.createElement('td');
        addRowButtonCell.colSpan = 8;

        // const addRowButton = document.createElement('button');
        // addRowButton.textContent = 'Add New Normal Row';
        // addRowButton.onclick = () => createNormalRow3(normalRows[1]);

        addRowButtonCell.appendChild(addRowButton);
        addRowButtonRow.appendChild(addRowButtonCell);
        normalRows[1].insertAdjacentElement('afterend', addRowButtonRow);
    }
}





function createNormalRow3(afterRow) {
    const normalRow3 = document.createElement('tr');
    normalRow3.className = 'normal-row';

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
        newCell.textContent = `Normal Row 3.1 - ${i + 1}`;

        if (i === 0) {
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

            // Append the small button to the first cell
            newCell.appendChild(smallButton);

            // Make the first cell clickable to toggle sub-rows
            newCell.onclick = () => toggleSubRows(newCell, 1);
        }

        normalRow3.appendChild(newCell);
    }

    // Insert the new "Normal Row 3.1" after the specified row
    afterRow.insertAdjacentElement('afterend', normalRow3);
}


function createnormalrow_2(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the cell

    // Find the closest row to insert the new rows after
    const currentRow = event.target.closest('td').parentElement;

    if (!currentRow) return;

    // Create new normal rows
    const normalRows = [];
    for (let i = 1; i <= 1; i++) {
        const normalRow = document.createElement('tr');
        normalRow.className = 'normal-row';
        for (let j = 0; j < 8; j++) {
            const newCell = document.createElement('td');
            newCell.textContent = `Normal Row ${i}.1 - ${j + 1}`;

            if (j === 0) {
                // Create a small "+" button inside the first cell
                const smallButton = document.createElement('button');
                smallButton.textContent = '+';
                smallButton.className = 'small-btn';
                smallButton.onclick = (event) => {
                    event.stopPropagation(); // Prevent triggering cell click event
                    createSubRows(newCell, 1); // This will create sub-row 1.1
                };

                newCell.appendChild(smallButton);
                newCell.onclick = () => toggleSubRows(newCell, 1);
            }

            normalRow.appendChild(newCell);
        }
        normalRows.push(normalRow);
    }

    // Insert the new rows after the current row
    currentRow.insertAdjacentElement('afterend', normalRows[0]);
    currentRow.insertAdjacentElement('afterend', normalRows[1]);

    // Create and add the button for creating a new normal row
    const addRowButtonRow = document.createElement('tr');
    const addRowButtonCell = document.createElement('td');
    addRowButtonCell.colSpan = 8;

    // const addRowButton = document.createElement('button');
    // addRowButton.textContent = 'Add New Normal Row';
    // addRowButton.onclick = () => createNormalRow3(normalRows[1]);

    addRowButtonCell.appendChild(addRowButton);
    addRowButtonRow.appendChild(addRowButtonCell);

    // Insert the button row immediately after the last of the new rows
    normalRows[1].insertAdjacentElement('afterend', addRowButtonRow);
}

// function createnormalrow_2(event) {
//     event.stopPropagation(); // Prevent the click event from bubbling up to the cell

//     // Find the closest row to insert the new row after
//     const currentRow = event.target.closest('td').parentElement;

//     if (!currentRow) return;

//     // Create the new normal row
//     const normalRow2 = document.createElement('tr');
//     normalRow2.className = 'normal-row';

//     for (let i = 0; i < 8; i++) {
//         const newCell = document.createElement('td');
//         newCell.textContent = `Normal Row 2.1 - ${i + 1}`;

//         if (i === 0) {
//             // Create a small "+" button inside the first cell
//             const smallButton = document.createElement('button');
//             smallButton.textContent = '+';
//             smallButton.className = 'small-btn';
//             smallButton.onclick = (event) => {
//                 event.stopPropagation(); // Prevent triggering cell click event

//                 // Find the first cell of the current row to use as the reference for creating sub-rows
//                 const cell = event.target.closest('td');
//                 createSubRows(cell, 1); // This will create sub-row 1.1
//             };

//             // Append the button to the first cell
//             newCell.appendChild(smallButton);

//             // Make the first cell clickable to toggle sub-rows
//             newCell.onclick = () => toggleSubRows(newCell, 1);
//         }

//         normalRow2.appendChild(newCell);
//     }

//     // Insert the new "Normal Row 2.1" after the current row
//     currentRow.insertAdjacentElement('afterend', normalRow2);

//     // Optional: Add the button for creating a new normal row if needed
//     const addRowButtonRow = document.createElement('tr');
//     const addRowButtonCell = document.createElement('td');
//     addRowButtonCell.colSpan = 8;

//     const addRowButton = document.createElement('button');
//     addRowButton.textContent = 'Add New Normal Row';
//     addRowButton.onclick = () => createNormalRow3(normalRow2);

//     addRowButtonCell.appendChild(addRowButton);
//     addRowButtonRow.appendChild(addRowButtonCell);
//     normalRow2.insertAdjacentElement('afterend', addRowButtonRow);
// }

// ...addOrReplaceButton.apply.apply.apply.apply.apply.apply.apply.apply.apply.apply.apply.apply.apply.apply.apply.

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
            // Set innerHTML for the first cell to include the icon
            newCell.innerHTML = `<i class="bi bi-caret-right-fill"></i> Sub-row ${level}.${i + 1}`;

            // Create and add the small button
            const smallButton = document.createElement('button');
            smallButton.textContent = '+';
            smallButton.className = 'small-btn';
            smallButton.onclick = (event) => {
                event.stopPropagation();
                createSubRows(newCell, level + 1);
            };
            newCell.appendChild(smallButton);

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


function addOrReplaceButton(afterRow, level) {
    // Check if a button already exists at this level
    const existingButtonRow = afterRow.nextElementSibling;
    const existingButton = existingButtonRow && existingButtonRow.querySelector(`button.level-${level}`);

    // If the button already exists, do not add a duplicate
    if (existingButton) {
        return;
    }

    // Create a new row for the button if it doesn't exist
    const addRowButtonRow = document.createElement('tr');
    const addRowButtonCell = document.createElement('td');
    addRowButtonCell.colSpan = 8;

    // Determine the correct label for the button based on the level
    // const buttonLabel = `Add New Sub Row ${level}.1`;
    // const addRowButton = document.createElement('button');
    addRowButton.textContent = buttonLabel;
    addRowButton.className = `add-row-button level-${level}`; // Add level class
    addRowButton.onclick = () => createSubRowsButtonClick(afterRow, level);

    addRowButtonCell.appendChild(addRowButton);
    addRowButtonRow.appendChild(addRowButtonCell);
    afterRow.insertAdjacentElement('afterend', addRowButtonRow);
}
function addOrReplaceButton(afterRow, level) {
    // Check if the button already exists for this row level
    const existingButton = afterRow.parentElement.querySelector(`.add-row-button.level-${level}`);

    // If a button already exists, do not create a new one
    if (existingButton) {
        return;
    }

    // Create a new row for the button
    const addRowButtonRow = document.createElement('tr');
    const addRowButtonCell = document.createElement('td');
    addRowButtonCell.colSpan = 8;

    // Create the button with appropriate text for the level
    // const addRowButton = document.createElement('button');
    // addRowButton.textContent = `Add New Sub Row ${level}.1`;
    addRowButton.className = `add-row-button level-${level}`; // Add level class
    addRowButton.onclick = () => createSubRowsButtonClick(afterRow, level);

    // Append the button to the cell and the cell to the row
    addRowButtonCell.appendChild(addRowButton);
    addRowButtonRow.appendChild(addRowButtonCell);

    // Insert the new row with the button after the specified row
    afterRow.insertAdjacentElement('afterend', addRowButtonRow);
}

function createSubRowsButtonClick(row, level) {
    createSubRows(row.querySelector('td:first-child'), level);
}


function createSubRowsButtonClick(row, level) {
    createSubRows(row.querySelector('td:first-child'), level);
}

// read this i ll give you promt