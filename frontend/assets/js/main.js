/**
 * Initialize app when DOM is ready
 * Sets up theme, user session, products, and event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme preference
    loadTheme();
    
    // Restore user session if exists
    loadUser();
    
    // Render featured products on homepage
    renderFeaturedProducts();
    
    // Initialize cart display
    updateCart();
    
    // Set initial browser history state
    history.replaceState({ page: 'home' }, '', '#home');
    
    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully!');
            this.reset();
        });
    }
    
    // ============================================
    // CHECKOUT FORM HANDLER
    // ============================================
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In production, this would send order to backend
            showNotification('Order placed successfully! (Frontend demo)');
            cart = []; // Clear cart
            updateCart();
            navigateTo('home');
        });
    }
});