// Display all products in admin table
function renderAdminProducts() {
    const tbody = document.getElementById('adminProductsList');
    if (!tbody) return;

    

    tbody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;"></td>
            <td>${product.name}</td>
            <td><span class="badge bg-info">${product.category.replace('-', ' ')}</span></td>
            <td>${formatPrice(product.price)}</td>
            
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}



// Open modal to add new product
function showAddProductModal() {
    document.getElementById('productModalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Open modal to edit existing product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Fill form with product data
    document.getElementById('productModalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;

    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Save new or edited product
function saveProduct() {
    
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim();

    
    if (!name || !price || !category || !image || !description) {
        alert('Please fill in all required fields');
        return;
    }

    const productData = { name, price, category, image, description };

    
    if (id) {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) products[index] = { ...products[index], ...productData };
    } else {
        const newId = Math.max(...products.map(p => p.id)) + 1;
        products.push({ id: newId, ...productData });
    }

    
    localStorage.setItem('products', JSON.stringify(products));
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    
    renderAdminProducts();
    renderProducts();
}

// Delete product 
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        
        
        
        
        renderAdminProducts();
        renderProducts();
    }
}

// Check if current user has admin rights
function isAdmin() {
    return currentUser && currentUser.isAdmin === true;
}