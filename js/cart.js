// ============================================
// GLOBAL STATE
// ============================================
let cart = []; // Array storing all cart items with quantities

// ============================================
// ADD TO CART
// ============================================

/**
 * Add a product to the shopping cart
 * Increments quantity if already in cart, otherwise adds new item
 * @param {number} productId - The ID of the product to add
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        // Product already in cart - increase quantity
        existing.quantity++;
    } else {
        // New product - add to cart with quantity 1
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification('Added to cart!');
}

// ============================================
// REMOVE FROM CART
// ============================================

/**
 * Remove a product completely from the cart
 * @param {number} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// ============================================
// UPDATE CART DISPLAY
// ============================================

/**
 * Update all cart UI elements
 * Refreshes cart sidebar, badge count, and total price
 */
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart badge (shows total item count)
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Handle empty cart state
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        cartTotal.textContent = '$0,00';
        return;
    }
    
    // Render each cart item
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
            <div class="flex-grow-1">
                <h6>${item.name}</h6>
                <p class="mb-0">$${formatPrice(item.price)} x ${item.quantity}</p>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Calculate and display total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${formatPrice(total)}`;
}

// ============================================
// CART SIDEBAR TOGGLE
// ============================================

/**
 * Toggle visibility of the cart sidebar
 * Opens/closes the sliding cart panel
 */
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

// ============================================
// CHECKOUT NAVIGATION
// ============================================

/**
 * Navigate to checkout page
 * Closes cart sidebar and shows checkout form
 */
function proceedToCheckout() {
    toggleCart();
    navigateTo('checkout');
}

// ============================================
// CHECKOUT PAGE RENDERING
// ============================================

/**
 * Render checkout page with order summary
 * Calculates subtotal, tax, shipping, and final total
 */
function renderCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = 10; // Flat $10 shipping
    const total = subtotal + tax + shipping;
    
    // Render order items list
    checkoutItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <strong>${item.name}</strong>
                <p class="mb-0 text-muted">Qty: ${item.quantity}</p>
            </div>
            <span>$${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    // Update price breakdown
    document.getElementById('checkoutSubtotal').textContent = `$${formatPrice(subtotal)}`;
    document.getElementById('checkoutTax').textContent = `$${formatPrice(tax)}`;
    document.getElementById('checkoutTotal').textContent = `$${formatPrice(total)}`;
}