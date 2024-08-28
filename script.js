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
document.querySelector('.custom-search-container').addEventListener('click', function () {
    const dropdownMenu_3 = document.getElementById('customDropdownMenu');
    const dropdownArrow_3 = document.getElementById('customDropdownArrow');

    if (dropdownMenu_3.classList.contains('show')) {
        dropdownMenu_3.classList.remove('show');
        setTimeout(() => dropdownMenu_3.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3.style.display = 'block';
        setTimeout(() => dropdownMenu_3.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_3 = document.querySelector('.custom-search-container');
    const dropdownMenu_3 = document.getElementById('customDropdownMenu');

    if (!searchContainer_3.contains(event.target) && !dropdownMenu_3.contains(event.target)) {
        dropdownMenu_3.classList.remove('show');
        setTimeout(() => dropdownMenu_3.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow').classList.remove('up'); // Rotate arrow to down position
    }
});


// Invoice 
/* Box DropDown _4 */
document.querySelector('.custom-search-container_4').addEventListener('click', function () {
    const dropdownMenu_3_4 = document.getElementById('customDropdownMenu_4');
    const dropdownArrow_3_4 = document.getElementById('customDropdownArrow_4');

    if (dropdownMenu_3_4.classList.contains('show')) {
        dropdownMenu_3_4.classList.remove('show');
        setTimeout(() => dropdownMenu_3_4.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3_4.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3_4.style.display = 'block';
        setTimeout(() => dropdownMenu_3_4.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3_4.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_3_4 = document.querySelector('.custom-search-container_4');
    const dropdownMenu_3_4 = document.getElementById('customDropdownMenu_4');

    if (!searchContainer_3_4.contains(event.target) && !dropdownMenu_3_4.contains(event.target)) {
        dropdownMenu_3_4.classList.remove('show');
        setTimeout(() => dropdownMenu_3_4.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow_4').classList.remove('up'); // Rotate arrow to down position
    }
});


function show_address_details() {
    var detailsContainer = document.getElementById('customer-details-main-container_2');
    if (detailsContainer.classList.contains('show')) {
        detailsContainer.classList.remove('show');
    } else {
        // Set max-height to auto for proper calculation
        detailsContainer.style.maxHeight = detailsContainer.scrollHeight + 'px';
        detailsContainer.classList.add('show');

        // Reset max-height after transition ends to keep the container's height auto-adjusted
        detailsContainer.addEventListener('transitionend', function () {
            detailsContainer.style.maxHeight = 'none';
        }, { once: true });
    }
}

// Other details
// Invoice 
/* Box DropDown */
document.querySelector('.custom-search-container_9').addEventListener('click', function () {
    const dropdownMenu_3_9 = document.getElementById('customDropdownMenu_9');
    const dropdownArrow_3_9 = document.getElementById('customDropdownArrow_9');

    if (dropdownMenu_3_9.classList.contains('show')) {
        dropdownMenu_3_9.classList.remove('show');
        setTimeout(() => dropdownMenu_3_9.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3_9.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3_9.style.display = 'block';
        setTimeout(() => dropdownMenu_3_9.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3_9.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_3_9 = document.querySelector('.custom-search-container_9');
    const dropdownMenu_3_9 = document.getElementById('customDropdownMenu_9');

    if (!searchContainer_3_9.contains(event.target) && !dropdownMenu_3_9.contains(event.target)) {
        dropdownMenu_3_9.classList.remove('show');
        setTimeout(() => dropdownMenu_3_9.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow_9').classList.remove('up'); // Rotate arrow to down position
    }
});

// Second dropdown
// other details
// invoice 
/* Box DropDown */
document.querySelector('.custom-search-container_8').addEventListener('click', function () {
    const dropdownMenu_3_8 = document.getElementById('customDropdownMenu_8');
    const dropdownArrow_3_8 = document.getElementById('customDropdownArrow_8');

    if (dropdownMenu_3_8.classList.contains('show')) {
        dropdownMenu_3_8.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3_8.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3_8.style.display = 'block';
        setTimeout(() => dropdownMenu_3_8.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3_8.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_3_8 = document.querySelector('.custom-search-container_8');
    const dropdownMenu_3_8 = document.getElementById('customDropdownMenu_8');

    if (!searchContainer_3_8.contains(event.target) && !dropdownMenu_3_8.contains(event.target)) {
        dropdownMenu_3_8.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow_8').classList.remove('up'); // Rotate arrow to down position
    }
});

// Third dropdown
// other details
// invoice 
/* Box DropDown */
document.querySelector('.custom-search-container_8_7').addEventListener('click', function () {
    const dropdownMenu_3_8_7 = document.getElementById('customDropdownMenu_8_7');
    const dropdownArrow_3_8_7 = document.getElementById('customDropdownArrow_8_7');

    if (dropdownMenu_3_8_7.classList.contains('show')) {
        dropdownMenu_3_8_7.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8_7.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3_8_7.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3_8_7.style.display = 'block';
        setTimeout(() => dropdownMenu_3_8_7.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3_8_7.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_8_7 = document.querySelector('.custom-search-container_8_7');
    const dropdownMenu_3_8_7 = document.getElementById('customDropdownMenu_8_7');

    if (!searchContainer_8_7.contains(event.target) && !dropdownMenu_3_8_7.contains(event.target)) {
        dropdownMenu_3_8_7.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8_7.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow_8_7').classList.remove('up'); // Rotate arrow to down position
    }
});

// Fourth dropdown
// other details
// invoice 
/* Box DropDown */
document.querySelector('.custom-search-container_8_7_7').addEventListener('click', function () {
    const dropdownMenu_3_8_7_7 = document.getElementById('customDropdownMenu_8_7_7');
    const dropdownArrow_3_8_7_7 = document.getElementById('customDropdownArrow_8_7_7');

    if (dropdownMenu_3_8_7_7.classList.contains('show')) {
        dropdownMenu_3_8_7_7.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8_7_7.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3_8_7_7.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3_8_7_7.style.display = 'block';
        setTimeout(() => dropdownMenu_3_8_7_7.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3_8_7_7.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_8_7_7 = document.querySelector('.custom-search-container_8_7_7');
    const dropdownMenu_3_8_7_7 = document.getElementById('customDropdownMenu_8_7_7');

    if (!searchContainer_8_7_7.contains(event.target) && !dropdownMenu_3_8_7_7.contains(event.target)) {
        dropdownMenu_3_8_7_7.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8_7_7.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow_8_7_7').classList.remove('up'); // Rotate arrow to down position
    }
});


// invoice drop
// Third dropdown
// other details
// invoice 
/* Box DropDown */
document.querySelector('.custom-search-container_8_7_1').addEventListener('click', function () {
    const dropdownMenu_3_8_7_1 = document.getElementById('customDropdownMenu_8_7_1');
    const dropdownArrow_3_8_7_1 = document.getElementById('customDropdownArrow_8_7_1');

    if (dropdownMenu_3_8_7_1.classList.contains('show')) {
        dropdownMenu_3_8_7_1.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8_7_1.style.display = 'none', 500); // Wait for animation to finish
        dropdownArrow_3_8_7_1.classList.remove('up'); // Change arrow to down position
    } else {
        dropdownMenu_3_8_7_1.style.display = 'block';
        setTimeout(() => dropdownMenu_3_8_7_1.classList.add('show'), 0); // Allow display to register before animation
        dropdownArrow_3_8_7_1.classList.add('up'); // Rotate arrow to up position
    }
});

// To hide the dropdown if clicked outside
document.addEventListener('click', function (event) {
    const searchContainer_8_7_1 = document.querySelector('.custom-search-container_8_7_1');
    const dropdownMenu_3_8_7_1 = document.getElementById('customDropdownMenu_8_7_1');

    if (!searchContainer_8_7_1.contains(event.target) && !dropdownMenu_3_8_7_1.contains(event.target)) {
        dropdownMenu_3_8_7_1.classList.remove('show');
        setTimeout(() => dropdownMenu_3_8_7_1.style.display = 'none', 500); // Wait for animation to finish
        document.getElementById('customDropdownArrow_8_7_1').classList.remove('up'); // Rotate arrow to down position
    }
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