// ============================================
// PAGE NAVIGATION
// ============================================

/**
 * Navigate to a different page section
 * Handles page switching and browser history
 * @param {string} page - The page identifier to navigate to
 */
function navigateTo(page) {
    // Hide all page sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Map of page names to HTML element IDs
    const pageMap = {
        'home': 'homePage',
        'shop': 'shopPage',
        'contact': 'contactPage',
        'login': 'loginPage',
        'product': 'productDetailPage',
        'profile': 'profilePage',
        'checkout': 'checkoutPage',
        'about': 'aboutPage'
    };
    
    // Show the requested page
    const pageElement = document.getElementById(pageMap[page]);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Update browser URL and history
    history.pushState({ page: page }, '', `#${page}`);
    
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    // ============================================
    // PAGE-SPECIFIC INITIALIZATION
    // ============================================
    if (page === 'shop') {
        renderProducts();
        populateFilters();
    } else if (page === 'home') {
        renderFeaturedProducts();
    } else if (page === 'profile') {
        // Redirect to login if not authenticated
        if (!currentUser) {
            navigateTo('login');
            return;
        }
        renderProfile();
    } else if (page === 'checkout') {
        // Redirect to shop if cart is empty
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            navigateTo('shop');
            return;
        }
        renderCheckout();
    }
    
    // Close user dropdown when navigating
    document.getElementById('userDropdown').classList.remove('show');
}

// ============================================
// BROWSER BACK/FORWARD BUTTONS
// ============================================

/**
 * Handle browser back/forward button clicks
 * Restores the correct page when user uses browser navigation
 */
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        // Remove all active classes
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Map of page names to HTML element IDs
        const pageMap = {
            'home': 'homePage',
            'shop': 'shopPage',
            'contact': 'contactPage',
            'login': 'loginPage',
            'product': 'productDetailPage',
            'profile': 'profilePage',
            'checkout': 'checkoutPage',
            'about': 'aboutPage'
        };
        
        // Show the page from history
        const pageElement = document.getElementById(pageMap[event.state.page]);
        if (pageElement) {
            pageElement.classList.add('active');
        }
        
        window.scrollTo(0, 0);
    } else {
        // No state - default to home page
        document.getElementById('homePage').classList.add('active');
    }
});

// ============================================
// USER DROPDOWN TOGGLE
// ============================================

/**
 * Toggle visibility of user dropdown menu
 */
function toggleUserDropdown() {
    document.getElementById('userDropdown').classList.toggle('show');
}

// ============================================
// CLOSE DROPDOWN ON OUTSIDE CLICK
// ============================================

/**
 * Close user dropdown when clicking outside of it
 */
document.addEventListener('click', function(event) {
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown && !userDropdown.contains(event.target)) {
        document.getElementById('userDropdown').classList.remove('show');
    }
});