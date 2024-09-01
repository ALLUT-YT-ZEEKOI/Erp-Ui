document.getElementById('searchBox').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        setTimeout(() => dropdownMenu.style.display = 'none', 500); // Wait for animation to finish
    } else {
        dropdownMenu.style.display = 'block';
        setTimeout(() => dropdownMenu.classList.add('show'), 0); // Allow display to register before animation
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchBox = document.getElementById('searchBox');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (!searchBox.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
        setTimeout(() => dropdownMenu.style.display = 'none', 500); // Wait for animation to finish
    }
});

// To close the dropdown when a menu item is clicked
document.querySelectorAll('#dropdownMenu div').forEach(item => {
    item.addEventListener('click', function () {
        const dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu.classList.remove('show');
        setTimeout(() => dropdownMenu.style.display = 'none', 500); // Wait for animation to finish
    });
});

//payment dropdown
document.getElementById('searchBox_1').addEventListener('click', function () {
    const dropdownMenu_1 = document.getElementById('dropdownMenu_1');
    if (dropdownMenu_1.classList.contains('show')) {
        dropdownMenu_1.classList.remove('show');
        setTimeout(() => dropdownMenu_1.style.display = 'none', 500); // Wait for animation to finish
    } else {
        dropdownMenu_1.style.display = 'block';
        setTimeout(() => dropdownMenu_1.classList.add('show'), 0); // Allow display to register before animation
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchBox_1 = document.getElementById('searchBox_1');
    const dropdownMenu_1 = document.getElementById('dropdownMenu_1');

    if (!searchBox_1.contains(event.target) && !dropdownMenu_1.contains(event.target)) {
        dropdownMenu_1.classList.remove('show');
        setTimeout(() => dropdownMenu_1.style.display = 'none', 500); // Wait for animation to finish
    }
});


// Invoice 
/* Box DropDown */
// Invoice 
/* Box DropDown */
document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle dropdown
    function toggleDropdown(event) {
        const container = event.currentTarget;
        const dropdownMenu = container.querySelector('.custom-dropdown-content');
        const dropdownArrow = container.querySelector('.custom-dropdown-arrow');

        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
            setTimeout(() => dropdownMenu.style.display = 'none', 500); // Wait for animation to finish
            dropdownArrow.classList.remove('up'); // Change arrow to down position
        } else {
            dropdownMenu.style.display = 'block';
            setTimeout(() => dropdownMenu.classList.add('show'), 0); // Allow display to register before animation
            dropdownArrow.classList.add('up'); // Rotate arrow to up position
        }
    }

    // Attach event listeners to each dropdown container
    document.querySelectorAll('.custom-search-container').forEach(container => {
        container.addEventListener('click', toggleDropdown);
    });

    // To hide the dropdown if clicked outside
    document.addEventListener('click', function (event) {
        document.querySelectorAll('.custom-search-container').forEach(container => {
            const dropdownMenu = container.querySelector('.custom-dropdown-content');
            const dropdownArrow = container.querySelector('.custom-dropdown-arrow');

            if (!container.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
                setTimeout(() => dropdownMenu.style.display = 'none', 500); // Wait for animation to finish
                dropdownArrow.classList.remove('up'); // Rotate arrow to down position
            }
        });
    });
});



function toggleButton(element) {
    event.stopPropagation(); // Prevent triggering cell click event
    const circle = element.querySelector('.toggle-circle');
    const isActive = circle.style.left === '22px';

    if (isActive) {
        circle.style.left = '1px';
        element.style.backgroundColor = '#ccc';
    } else {
        circle.style.left = '22px';
        element.style.backgroundColor = '#4CAF50';
    }
}


function show_address_details() {
    const addressDetails = document.getElementById('address-details-dt');
    
    
    if (addressDetails.classList.contains('show')) {
        addressDetails.classList.remove('show'); 
        setTimeout(() => {
            addressDetails.style.display = 'none'; 
        }, 500); 
    } else {
        addressDetails.style.display = 'block'; 
        setTimeout(() => {
            addressDetails.classList.add('show'); 
        }, 10); 
    }
}

document.getElementById("addColumnButton").addEventListener("click", function() {
    // Get the table header and body
    var table = document.getElementById("myTable");
    var headerRow = table.querySelector("thead tr");
    var bodyRows = table.querySelectorAll("tbody tr");

    // Create a new header cell
    var newHeaderCell = document.createElement("th");
    newHeaderCell.style.width = "180px"; // Set width as needed
    newHeaderCell.innerHTML = "<span class='table-head'>New Column</span><div class='resizer'></div>";
    headerRow.appendChild(newHeaderCell);

    // Add a new cell to each row in the body
    bodyRows.forEach(function(row) {
        var newBodyCell = document.createElement("td");
        newBodyCell.innerHTML = "New Data"; // Default content for new cells
        row.appendChild(newBodyCell);
    });
});



const MIN_WIDTH = 200; // Minimum width for the columns

document.querySelectorAll('.resizer').forEach(resizer => {
    resizer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        const th = resizer.parentElement;
        const startOffset = th.offsetWidth - e.pageX;

        function onMouseMove(e) {
            const newWidth = startOffset + e.pageX;
            // Set the column width, ensuring it does not go below MIN_WIDTH
            th.style.width = Math.max(newWidth, MIN_WIDTH) + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
const secondTh = document.querySelector('#myTable th:nth-child(2)');
const contextMenu = document.getElementById('contextMenu');

// Show context menu on right-click
secondTh.addEventListener('contextmenu', (event) => {
event.preventDefault(); // Prevent the default context menu
contextMenu.style.display = 'block';
contextMenu.style.left = `${event.pageX}px`;
contextMenu.style.top = `${event.pageY}px`;
});

// Hide context menu when clicking outside
document.addEventListener('click', () => {
contextMenu.style.display = 'none';
});
});

// let isFrozen = false; 

// function freezeColumn() {
//     const contextMenu = document.getElementById('contextMenu');
//     const table = document.getElementById('myTable');
//     const menuItem = document.getElementById('freezeUnfreezeMenuItem');

//     // Specify the number of columns to freeze (2 in this case)
//     const columnsToFreeze = 2;

//     // Freeze or unfreeze the specified columns
//     for (let i = 0; i < columnsToFreeze; i++) {
//         const th = table.getElementsByTagName('th')[i];
//         const isColumnFrozen = th.classList.contains('frozen');

//         if (isFrozen && isColumnFrozen) {
//             // Unfreeze the column
//             th.classList.remove('frozen');
//             th.style.position = '';
//             th.style.left = '';
//             th.style.zIndex = '';

//             // Remove sticky position from all td elements in the column
//             Array.from(table.querySelectorAll(`tr td:nth-child(${i + 1})`)).forEach(td => {
//                 td.classList.remove('frozen');
//                 td.style.position = '';
//                 td.style.left = '';
//                 td.style.zIndex = '';
//             });
//         } else {
//             // Freeze the column
//             th.classList.add('frozen');
//             th.style.position = 'sticky';
//             th.style.left = `${i * 70}px`; // Adjust left position based on column width
//             th.style.zIndex = '10';

//             // Apply sticky position to all td elements in the column
//             Array.from(table.querySelectorAll(`tr td:nth-child(${i + 1})`)).forEach(td => {
//                 td.classList.add('frozen');
//                 td.style.position = 'sticky';
//                 td.style.left = `${i * 70}px`; // Adjust left position based on column width
//                 td.style.zIndex = '1';
//             });
//         }
//     }



//     isFrozen = !isFrozen;


//     menuItem.textContent = isFrozen ? 'Unfreeze Column' : 'Freeze Column';


//     contextMenu.style.display = 'none';
// }