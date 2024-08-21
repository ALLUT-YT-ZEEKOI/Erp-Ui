document.getElementById('searchBox').addEventListener('click', function() {
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
document.addEventListener('click', function(event) {
    const searchBox = document.getElementById('searchBox');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (!searchBox.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
        setTimeout(() => dropdownMenu.style.display = 'none', 500); // Wait for animation to finish
    }
});



//payment dropdown
document.getElementById('searchBox_1').addEventListener('click', function() {
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
document.addEventListener('click', function(event) {
    const searchBox_1 = document.getElementById('searchBox_1');
    const dropdownMenu_1 = document.getElementById('dropdownMenu_1');
    
    if (!searchBox_1.contains(event.target) && !dropdownMenu_1.contains(event.target)) {
        dropdownMenu_1.classList.remove('show');
        setTimeout(() => dropdownMenu_1.style.display = 'none', 500); // Wait for animation to finish
    }
});