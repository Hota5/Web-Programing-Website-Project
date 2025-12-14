// Display all products in admin table
function renderAdminProducts() {
    const tbody = document.getElementById('adminProductsList');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => {
        return `
        <tr>
            <td><img src="${product.img_url}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;"></td>
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
        `;
    }).join('');
}



// Open modal to add new product
function showAddProductModal() {
    document.getElementById('productModalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Edit existing product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productModalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').value = product.img_url;
    document.getElementById('productDescription').value = product.description;

    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Save new or edited product
function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const img_url = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim();

    if (!name || !price || !category || !img_url || !description) {
        alert('Please fill in all required fields');
        return;
    }

    const productData = { 
        name, 
        price, 
        category, 
        img_url,
        description 
    };

    if (id) {
        RestClient.put(`products/${id}`, productData,
            function(response) {
                bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
                
                RestClient.get("products", function(data) {
                    products = data;
                    renderAdminProducts();
                    showNotification('Product updated successfully!');
                }, function(error) {
                    console.error("Error reloading products:", error);
                });
            },
            function(error) {
                console.error('Update error:', error);
                showNotification('Failed to update product');
            }
        );
    } else {
        RestClient.post('products', productData,
            function(response) {
                bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
                
                RestClient.get("products", function(data) {
                    products = data;
                    renderAdminProducts();
                    showNotification('Product added successfully!');
                }, function(error) {
                    console.error("Error reloading products:", error);
                });
            },
            function(error) {
                console.error('Add error:', error);
                showNotification('Failed to add product');
            }
        );
    }
}

// Delete product 
function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    RestClient.delete(`products/${id}`, null,
        function(response) {
            RestClient.get("products", function(data) {
                products = data;
                renderAdminProducts();
                showNotification('Product deleted successfully!');
            }, function(error) {
                console.error("Error reloading products:", error);
            });
        },
        function(error) {
            console.error('Delete error:', error);
            showNotification('Failed to delete product');
        }
    );
}

// Check if current user has admin rights
function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}