


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

    newMainDataRow.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default context menu
        showContextMenu(event, newMainDataRow);
    });

    // Create a new cell for the button
    const newButtonCell = document.createElement('td');
    newButtonCell.className = 'button-cell'; // Add a class for styling
    newButtonCell.innerHTML = `
        <button onclick="createnormalrow_2(event)" class="data-1-1_btn" style="display: none;">
            <i class="bi bi-plus-lg"></i>
            <i class="bi bi-list"></i>
        </button>
    `;
    newMainDataRow.appendChild(newButtonCell);

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
        const placeholderText = `Data ${i + 1}.1`;

        if (i === 0) {
            newCell.className = 'data1-1';

            newCell.innerHTML = `
                <div class="cell-content">
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
        } else if (i === 1) {
            newCell.innerHTML = `
                <div class="button-counter">
                    <button class="decrement-btn">-</button>
                    <span class="count-value">0</span>
                    <button class="increment-btn">+</button>
                </div>
            `;

            // Add event listeners for increment and decrement buttons
            const decrementBtn = newCell.querySelector('.decrement-btn');
            const incrementBtn = newCell.querySelector('.increment-btn');
            const countValue = newCell.querySelector('.count-value');

            decrementBtn.addEventListener('click', () => {
                let count = parseInt(countValue.textContent);
                if (count > 0) {
                    countValue.textContent = count - 1;
                }
            });

            incrementBtn.addEventListener('click', () => {
                let count = parseInt(countValue.textContent);
                countValue.textContent = count + 1;
            });
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

    // Show button on row hover
    newMainDataRow.addEventListener('mouseenter', () => {
        const button = newButtonCell.querySelector('.data-1-1_btn');
        if (button) {
            button.style.display = 'block'; // Show the button
        }
    });

    newMainDataRow.addEventListener('mouseleave', () => {
        const button = newButtonCell.querySelector('.data-1-1_btn');
        if (button) {
            button.style.display = 'none'; // Hide the button
        }
    });
}

// Initially show 2 rows when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createMainDataRow();
    createMainDataRow();
});


// Hide context menu on click elsewhere
document.addEventListener('click', function() {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
});

// Ensure drag events apply to entire sections
document.querySelectorAll('.main-data-row').forEach(row => {
    row.addEventListener('dragstart', drag);
    row.addEventListener('dragover', allowDrop);
    row.addEventListener('drop', drop);
});


const maxLevel = 17;

let lastRowIndex = 1; // Starting index for the next row (assuming 4-2 is the first)

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

        createNormalRow(cell); // Create the first row (4-2)
    }
}
function createNormalRow(cell) {
    const currentRow = cell.parentElement;

    // Create a new normal row
    const normalRow = document.createElement('tr');
    normalRow.className = 'normal-row';
    normalRow.style.position = 'relative';
    normalRow.setAttribute('data-id', nextId++); // Assign a unique ID to the normal row
    normalRow.setAttribute('data-parent', currentRow.getAttribute('data-id')); // Link to the main data row

    normalRow.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default context menu
        showContextMenu(event, normalRow);
    });

    // Create a new cell for the small button
    const buttonCell = document.createElement('td');

    // Create the small "+" button inside the first cell
    const smallButton = document.createElement('button');
    smallButton.textContent = '+';
    smallButton.className = 'show-btn';
    smallButton.onclick = (event) => {
        event.stopPropagation();
        createSubRows(buttonCell, 1); // This will create sub-row 1.1

        // After creating sub-rows, toggle the icon to down
        const iconElement = buttonCell.querySelector('i');
        iconElement.classList.remove('bi-caret-right-fill');
        iconElement.classList.add('bi-caret-down-fill');
    };

    // Append the small button to the button cell
    buttonCell.appendChild(smallButton);
    normalRow.appendChild(buttonCell); // Add the button cell to the normal row

    // Create the rest of the cells
    for (let i = 0; i < 8; i++) { // Adjusted to create 7 more cells
        const newCell = document.createElement('td');
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = `Enter text for cell ${i + 2}`; // Adjust placeholder for new cells
        inputField.className = 'createrowinput'; // Set the class name for the input field

        if (i === 0) {
            // Create container for cell content and button
            const cellContent = document.createElement('div');
            cellContent.className = 'cell-content';

            // Create the icon element
            const iconElement = document.createElement('i');
            iconElement.className = 'bi bi-caret-right-fill';

            // Stop event propagation when clicking on the input field
            inputField.onclick = (event) => {
                event.stopPropagation();
            };

            // Append the icon and input field to the container
            cellContent.appendChild(iconElement);
            cellContent.appendChild(inputField);
            newCell.appendChild(cellContent);

            // Make the first cell clickable to toggle sub-rows
            newCell.onclick = () => toggleSubRows(newCell, 1);
        } else if (i === 1) {
            newCell.innerHTML = `
                <div class="button-counter">
                    <button class="decrement-btn">-</button>
                    <span class="count-value">0</span>
                    <button class="increment-btn">+</button>
                </div>
            `;

            // Add event listeners for increment and decrement buttons
            const decrementBtn = newCell.querySelector('.decrement-btn');
            const incrementBtn = newCell.querySelector('.increment-btn');
            const countValue = newCell.querySelector('.count-value');

            decrementBtn.addEventListener('click', () => {
                let count = parseInt(countValue.textContent);
                if (count > 0) {
                    countValue.textContent = count - 1;
                }
            });

            incrementBtn.addEventListener('click', () => {
                let count = parseInt(countValue.textContent);
                countValue.textContent = count + 1;
            });
        } else {
            // For other cells, just append the input field
            newCell.appendChild(inputField);
        }
        
        normalRow.appendChild(newCell);
    }

    // Insert the new row after the current row
    currentRow.insertAdjacentElement('afterend', normalRow);
    
    // Increment lastRowIndex to ensure the next row has the correct numbering
    lastRowIndex++;
}
function createnormalrow_2(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to other elements

    const targetCell = event.target.closest('td');
    if (!targetCell) return;

    createNormalRow(targetCell);
}




let nextId = 1; // A global variable to keep track of the next available ID
function toggleSubRows(cell, level) {
    console.log("click");
    const currentRow = cell.parentElement;
    const nextRows = [];
    const parentId = currentRow.getAttribute('data-id');

    let nextSibling = currentRow.nextElementSibling;
    while (nextSibling && nextSibling.classList.contains('sub-row')) {
        if (nextSibling.getAttribute('data-parent') === parentId) {
            nextRows.push(nextSibling);
        }
        nextSibling = nextSibling.nextElementSibling;
    }

    // Update the icon immediately when clicked
    const iconElement = cell.querySelector('i');
    const isCollapsed = nextRows.length > 0 && nextRows[0].classList.contains('hidden');

    // Toggle the icon based on the current state
    if (isCollapsed) {
        iconElement.classList.remove('bi-caret-right-fill');
        iconElement.classList.add('bi-caret-down-fill');

        // Show the child rows
        nextRows.forEach(row => {
            row.classList.remove('hidden');
            // Ensure the row's sub-rows are also shown
            toggleAllDescendantRows(row); // Show all descendants
        });
    } else {
        iconElement.classList.remove('bi-caret-down-fill');
        iconElement.classList.add('bi-caret-right-fill');

        // Hide the child rows
        nextRows.forEach(row => {
            row.classList.add('hidden');
            toggleAllDescendantRows(row); // Ensure all descendants are hidden
        });
    }
}

function toggleAllDescendantRows(row) {
    let nextRow = row.nextElementSibling;
    const parentId = row.getAttribute('data-id');

    while (nextRow && nextRow.classList.contains('sub-row')) {
        if (nextRow.getAttribute('data-parent') === parentId) {
            nextRow.classList.add('hidden'); // Hide the row
            toggleAllDescendantRows(nextRow); // Recursively hide all descendants
        }
        nextRow = nextRow.nextElementSibling;
    }
}

function createSubRows(cell, level) {
    if (level >= maxLevel) return;

    const currentRow = cell.parentElement;
    const newRow = document.createElement('tr');
    newRow.className = `sub-row level-${level}`;
    newRow.setAttribute('data-id', nextId++);
    newRow.setAttribute('data-parent', currentRow.getAttribute('data-id')); // Link to the normal row

    // Add right-click context menu event
    newRow.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default context menu
        showContextMenu(event, newRow);
    });

    // Create a new cell for the small button
    const buttonCell = document.createElement('td');

    // Create and add the small button
    const smallButton = document.createElement('button');
    smallButton.textContent = '+';
    smallButton.className = 'small-btnn';
    smallButton.onclick = (event) => {
        event.stopPropagation();
        createSubRows(buttonCell, level + 1); // Create sub-rows at the next level
    };

    // Append the small button to the button cell
    buttonCell.appendChild(smallButton);
    newRow.appendChild(buttonCell); // Add the button cell to the new row

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = `Enter text for sub-row ${level}.${i + 1}`;
        inputField.className = 'createrowinput'; // Set the class name for the input field

        if (i === 0) {
            // Create container for cell content and button
            const cellContent = document.createElement('div');
            cellContent.className = 'cell-content';

            // Create the icon element
            const iconElement = document.createElement('i');
            iconElement.className = 'bi bi-caret-right-fill';

            // Stop event propagation when clicking on the input field
            inputField.onclick = (event) => {
                event.stopPropagation();
            };

            // Append the icon and input field to the container
            cellContent.appendChild(iconElement);
            cellContent.appendChild(inputField);
            newCell.appendChild(cellContent);

            // Make the first cell clickable to toggle sub-rows
            newCell.onclick = () => toggleSubRows(newCell, level + 1);
        } else if (i === 1) {
            newCell.innerHTML = `
                <div class="button-counter">
                    <button class="decrement-btn">-</button>
                    <span class="count-value">0</span>
                    <button class="increment-btn">+</button>
                </div>
            `;

            // Add event listeners for increment and decrement buttons
            const decrementBtn = newCell.querySelector('.decrement-btn');
            const incrementBtn = newCell.querySelector('.increment-btn');
            const countValue = newCell.querySelector('.count-value');

            decrementBtn.addEventListener('click', () => {
                let count = parseInt(countValue.textContent);
                if (count > 0) {
                    countValue.textContent = count - 1;
                }
            });

            incrementBtn.addEventListener('click', () => {
                let count = parseInt(countValue.textContent);
                countValue.textContent = count + 1;
            });
        } else {
            // For other cells, just append the input field
            newCell.appendChild(inputField);
        }
        
        newRow.appendChild(newCell);
    }

    // Insert the new row after the current row
    currentRow.insertAdjacentElement('afterend', newRow);
}
smallButton.onclick = (event) => {
    event.stopPropagation();
    createSubRows(newCell, level + 1);
};




// freez optionsssssssssss
function showContextMenu(event, row) {
    const contextMenu = document.getElementById('contextMenu_1');
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;

    // Add event listeners for menu items
    document.getElementById('deleteRow').onclick = function() {
        deleteRowAndChildren(row); // Call the delete function
        contextMenu.style.display = 'none'; // Hide the context menu
    };

    document.getElementById('addClass').onclick = function() {
        row.classList.add('new-class'); // Add a new class to the row
        contextMenu.style.display = 'none'; // Hide the context menu
    };
}
function deleteRowAndChildren(row) {
    // Remove the row
    row.remove();

    // Find and remove all normal rows associated with this main row
    const normalRows = document.querySelectorAll(`tr[data-parent="${row.getAttribute('data-id')}"]`);
    normalRows.forEach(normalRow => {
        deleteRowAndChildren(normalRow); // Recursively delete each normal row
    });
}