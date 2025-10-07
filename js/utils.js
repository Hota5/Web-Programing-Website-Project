/**
 * Show a temporary notification message
 * Displays toast-style notification that auto-dismisses
 * @param {string} message - Message to display
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'position-fixed top-0 end-0 m-3 alert alert-success';
    notification.style.zIndex = '9999';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove after 2 seconds
    setTimeout(() => notification.remove(), 2000);
}