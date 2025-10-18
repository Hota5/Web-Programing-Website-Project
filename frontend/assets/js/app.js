// Convert price to format
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Alert notification
function showNotification(message) {
    alert(message);
}

// Toggle user dropdown menu in header
function toggleUserDropdown() {
    document.getElementById('userDropdown').classList.toggle('show');
}

// Switch between light and dark theme
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    document.querySelector('.dark-mode-toggle i').className = 
        newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Load saved theme preference from storage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = document.querySelector('.dark-mode-toggle i');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}


// Close user dropdown when clicking outside
document.addEventListener('click', function(e) {
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown && !userDropdown.contains(e.target)) {
        document.getElementById('userDropdown').classList.remove('show');
    }
});

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();  
    loadTheme();           
    loadUser();            
    loadCart();            
    updateCart();         
    
    
    document.querySelectorAll('.dropdown-item-custom').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('userDropdown').classList.remove('show');
        });
    });
});



// Contact form 
function ContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        showNotification('Message sent successfully!');
        form.reset();
    };
}

// Login page 
function LoginPage() {
    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) loginForm.onsubmit = handleLogin;
    
    const signupForm = document.getElementById('signupFormElement');
    if (signupForm) signupForm.onsubmit = handleSignup;
}

// Profile page 
function ProfilePage() {
    if (!currentUser) {
        window.location.hash = 'login';
        return;
    }
    renderProfile();
}

// Checkout page 
function CheckoutPage() {
    if (cart.length === 0) {
        window.location.hash = 'shop';
        return;
    }
    
    renderCheckout();
    
    
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        showNotification('Order placed successfully!');
        clearCart();
        window.location.hash = 'home';
    };
}

// Admin page 
function AdminPage() {
    if (!isAdmin()) {
        window.location.hash = 'home';
        return;
    }
    renderAdminProducts();
}

// Product detail page 
function ProductDetail() {
    const productId = parseInt(localStorage.getItem('currentProductId'));
    if (!productId) {
        window.location.hash = 'shop';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        window.location.hash = 'shop';
        return;
    }
    
    currentProduct = product;
    
    
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailCategory').textContent = product.category.replace('-', ' ');
    document.getElementById('detailTitle').textContent = product.name;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `${formatPrice(product.price)}`;
    
    
    const specsHtml = Object.entries(product.specs).map(([key, value]) => `
        <tr>
            <td>${key}</td>
            <td>${value}</td>
        </tr>
    `).join('');
    document.getElementById('detailSpecs').innerHTML = specsHtml;
}

// Toggle mobile navigation menu
function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.nav-links')?.classList.remove('show');
        });
    });
});