// ============================================
// GLOBAL STATE
// ============================================
let currentProduct = null; // Stores the product being viewed on detail page

// ============================================
// PRODUCT GRID RENDERING
// ============================================

/**
 * Render products in a grid layout
 * Can display all products or a filtered subset
 * @param {Array} filteredProducts - Array of products to display (defaults to all)
 */
function renderProducts(filteredProducts = products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = filteredProducts.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card" onclick="viewProduct(${product.id})">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-body">
                    <div class="product-category">${product.category.replace('-', ' ')}</div>
                    <h5 class="product-title">${product.name}</h5>
                    <div class="product-price">$${formatPrice(product.price)}</div>
                    <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FEATURED PRODUCTS (Homepage)
// ============================================

/**
 * Render featured products on the homepage
 * Shows first 6 products from the catalog
 */
function renderFeaturedProducts() {
    const featured = products.slice(0, 6);
    const grid = document.getElementById('featuredProducts');
    grid.innerHTML = featured.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="product-card" onclick="viewProduct(${product.id})">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-body">
                    <div class="product-category">${product.category.replace('-', ' ')}</div>
                    <h5 class="product-title">${product.name}</h5>
                    <div class="product-price">$${formatPrice(product.price)}</div>
                    <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTER POPULATION
// ============================================

/**
 * Populate filter dropdowns with available options
 * Extracts unique brands from product catalog
 */
function populateFilters() {
    const brands = [...new Set(products.map(p => p.brand))];
    const brandFilter = document.getElementById('brandFilter');
    brandFilter.innerHTML = '<option value="">All Brands</option>' + 
        brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
}

// ============================================
// FILTER APPLICATION
// ============================================

/**
 * Apply selected filters to product list
 * Filters by category, brand, part type, and maximum price
 */
function applyFilters() {
    const category = document.getElementById('categoryFilter').value;
    const brand = document.getElementById('brandFilter').value;
    const partType = document.getElementById('partTypeFilter').value;
    const maxPrice = document.getElementById('priceFilter').value;

    let filtered = products;

    // Apply category filter
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Apply brand filter
    if (brand) {
        filtered = filtered.filter(p => p.brand === brand);
    }
    
    // Apply PC part type filter
    if (partType) {
        filtered = filtered.filter(p => p.partType === partType);
    }
    
    // Apply price filter
    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }

    renderProducts(filtered);
}

// ============================================
// CATEGORY QUICK FILTER
// ============================================

/**
 * Navigate to shop page with category pre-selected
 * Used by category cards on homepage
 * @param {string} category - Category to filter by
 */
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    navigateTo('shop');
    setTimeout(() => applyFilters(), 100); // Small delay to ensure page is loaded
}

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

/**
 * Display detailed view of a single product
 * Shows full specs and larger image
 * @param {number} id - ID of product to display
 */
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    currentProduct = product;
    
    // Populate product information
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailCategory').textContent = product.category.replace('-', ' ');
    document.getElementById('detailTitle').textContent = product.name;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `$${formatPrice(product.price)}`;
    
    // Render specifications table
    const specsHtml = Object.entries(product.specs).map(([key, value]) => `
        <tr>
            <td>${key}</td>
            <td>${value}</td>
        </tr>
    `).join('');
    document.getElementById('detailSpecs').innerHTML = specsHtml;
    
    navigateTo('product');
}

// ============================================
// ADD TO CART FROM DETAIL PAGE
// ============================================

/**
 * Add currently viewed product to cart
 * Called from product detail page
 */
function addToCartFromDetail() {
    if (currentProduct) {
        addToCart(currentProduct.id);
    }
}
