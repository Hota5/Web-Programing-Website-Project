let cart = [];

// Load cart from localStorage 
function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch (e) {
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart 
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCart();
}

// Remove product from cart 
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

// Update cart 
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartCount) return;
    
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (!cartItems) return;
    
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = '$0,00';
        return;
    }
    
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
            <div class="flex-grow-1">
                <h6>${item.name}</h6>
                <p class="mb-0">${formatPrice(item.price)} x ${item.quantity}</p>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = `${formatPrice(total)}`;
}

// Open/close cart
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

// Redirect to checkout page 
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    toggleCart();
    window.location.hash = 'checkout';
}

// Display order summary 
function renderCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    if (!checkoutItems) return;
    
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        document.getElementById('checkoutSubtotal').textContent = '$0,00';
        document.getElementById('checkoutTax').textContent = '$0,00';
        document.getElementById('checkoutTotal').textContent = '$0,00';
        return;
    }
    
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;  // 10% tax
    const shipping = 10;
    const total = subtotal + tax + shipping;
    
   
    checkoutItems.innerHTML = cart.map(item => `
    <div class="order-item">
        <div>
            <strong>${item.name}</strong>
            <p class="mb-0">Qty: ${item.quantity}</p>
        </div>
        <span>${formatPrice(item.price * item.quantity)}</span>
    </div>
    `).join('');
    
    
    document.getElementById('checkoutSubtotal').textContent = `${formatPrice(subtotal)}`;
    document.getElementById('checkoutTax').textContent = `${formatPrice(tax)}`;
    document.getElementById('checkoutTotal').textContent = `${formatPrice(total)}`;
}

// Empty cart after ordering
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}