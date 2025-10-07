/**
 * Toggle between dark and light mode
 * Saves preference to localStorage
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button icon
    document.querySelector('.dark-mode-toggle i').className = 
        newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/**
 * Load saved theme preference on page load
 * Defaults to light mode if no preference saved
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set correct icon based on theme
    const icon = document.querySelector('.dark-mode-toggle i');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}