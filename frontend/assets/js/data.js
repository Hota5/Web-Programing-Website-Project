// Default products 
let products = [];
let currentProduct = null;
const defaultProducts = [
    {
        id: 1,
        name: 'Intel Core i9-13900K',
        category: 'pc-parts',
        price: 589.99,
        image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
        description: 'High-performance 24-core processor for gaming and content creation'
    },
    {
        id: 2,
        name: 'NVIDIA RTX 4080',
        category: 'pc-parts',
        price: 1199.99,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
        description: 'Next-gen graphics card with ray tracing and DLSS 3.0'
    },
    {
        id: 3,
        name: 'iPhone 15 Pro Max',
        category: 'phones',
        price: 1199.99,
        image: 'https://images.unsplash.com/photo-1709528922641-412eef5ddb48?w=500',
        description: 'Latest flagship iPhone with titanium design and A17 Pro chip'
    },
    {
        id: 4,
        name: 'Samsung Galaxy S24 Ultra',
        category: 'phones',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
        description: 'Premium Android phone with S Pen and advanced AI features'
    },
    {
        id: 5,
        name: 'MacBook Pro 16\'',
        category: 'laptops',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        description: 'Professional laptop with M3 Max chip and stunning display'
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        category: 'laptops',
        price: 1899.99,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
        description: 'Premium Windows laptop with 4K OLED display'
    },
    {
        id: 7,
        name: 'Sony WH-1000XM5',
        category: 'headphones',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
        description: 'Industry-leading noise cancellation with premium sound'
    },
    {
        id: 8,
        name: 'AirPods Max',
        category: 'headphones',
        price: 549.99,
        image: 'https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?w=500&',
        description: 'Premium over-ear headphones with spatial audio'
    },
    {
        id: 9,
        name: 'Sonos Era 300',
        category: 'speakers',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        description: 'Spatial audio speaker with Dolby Atmos support'
    },
    {
        id: 10,
        name: 'JBL Charge 5',
        category: 'speakers',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
        description: 'Portable Bluetooth speaker with powerful bass and waterproof design'
    }
];


// Load products from storage or use defaults
function initializeProducts() {
    const saved = localStorage.getItem('products');
    products = saved ? JSON.parse(saved) : [...defaultProducts];
}   