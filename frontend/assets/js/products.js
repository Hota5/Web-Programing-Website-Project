// Display products in grid 
function renderProducts(filteredProducts = products) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card" onclick="viewProduct(${product.id})">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-body">
                    <div class="product-category">${product.category.replace('-', ' ')}</div>
                    <h5 class="product-title">${product.name}</h5>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}





// Product filter
function applyFilters() {
    const category = document.getElementById('categoryFilter')?.value;
    const maxPrice = document.getElementById('priceFilter')?.value;

    let filtered = products;

    if (category) filtered = filtered.filter(p => p.category === category);
    if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

    renderProducts(filtered);
}

// Navigate to shop with  filter
function filterByCategory(category = '') {
    window.location.hash = 'home';
    setTimeout(() => {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter && category) {
            categoryFilter.value = category;
            applyFilters();
        }
            
        const section = document.getElementById('shopSection');
        if (section) {
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}





// Navigate to product detail page
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        showNotification('Product not found');
        window.location.hash = 'shop';
        return;
    }
    
    currentProduct = product;
    localStorage.setItem('currentProductId', id);
    window.location.hash = 'product-detail';
}

// Add product to cart 
function addToCartFromDetail() {
    if (currentProduct) {
        addToCart(currentProduct.id);
    } else {
        const productId = localStorage.getItem('currentProductId');
        if (productId) addToCart(parseInt(productId));
    }
}