/**
 * Format price to European format (1.000,00)
 * Converts decimal point to comma and adds thousand separators
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
function formatPrice(price) {
    return price.toFixed(2)
        .replace('.', ',')                      // Decimal point becomes comma
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add dots as thousand separators
}