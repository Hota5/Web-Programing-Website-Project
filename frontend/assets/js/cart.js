let cart = [];

// Load cart from localStorage 
function loadCart() {
    const token = localStorage.getItem('user_token');
    if (!token) {
        cart = [];
        updateCart();
        return;
    }
    const decoded = Utils.parseJwt(token);
    const userId = decoded.user.id;

    RestClient.get(`cart/${userId}`, 
        function(data) {
            cart = data; 
            updateCart();
        },
        function(error) {
            console.error("Load cart error:", error);
            cart = [];
            updateCart();
        }
    );
}


// Add product to cart 
function addToCart(productId){
    if (!currentUser) {
        showNotification('Please login to add to cart');
        return;
    }
    const token = localStorage.getItem('user_token');
    const decoded = Utils.parseJwt(token);
    const userId = decoded.user.id;

    RestClient.post('cart', { user_id: userId, product_id: productId }, 
        function(response) {
            loadCart();
        },
        function(error) {
            console.error("Add to cart error:", error);
            showNotification('Failed to add to cart');
        }
    );
}

// Remove product from cart 
function removeFromCart(cartItemId) {
    RestClient.delete(`cart/${cartItemId}`, null,
        function(response) {
            loadCart();
        },
        function(error) {
            console.error("Remove from cart error:", error);
            showNotification('Failed to remove from cart');
        }
    );
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
        <img src="${item.image || item.img_url}" class="cart-item-img" alt="${item.name}">
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
    const token = localStorage.getItem('user_token');
    if (!token) {
        cart = [];
        updateCart();
        return;
    }
    const decoded = Utils.parseJwt(token);
    const userId = decoded.user.id;
    RestClient.get(`cart/${userId}`, 
        function(cartData) {
            cartData.forEach(item => {
                RestClient.delete(`cart/${item.id}`, null, function(){}, function(){});
            });
            cart = [];
            updateCart();
        }
    );
}