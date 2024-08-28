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