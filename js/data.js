/**
 * Product catalog array
 * Contains all available products with details and specs
 * In production, this would come from a backend API
 */
const products = [
    // ============================================
    // PC PARTS - CPUs
    // ============================================
    {
        id: 1,
        name: 'Intel Core i9-13900K',
        category: 'pc-parts',
        partType: 'cpu',
        brand: 'Intel',
        price: 589.99,
        image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
        description: 'High-performance 24-core processor for gaming and content creation',
        specs: {
            'Cores': '24 (8P + 16E)',
            'Base Clock': '3.0 GHz',
            'Boost Clock': '5.8 GHz',
            'Socket': 'LGA 1700',
            'TDP': '125W'
        }
    },
    // ============================================
    // PC PARTS - GPUs
    // ============================================
    {
        id: 2,
        name: 'NVIDIA RTX 4080',
        category: 'pc-parts',
        partType: 'gpu',
        brand: 'NVIDIA',
        price: 1199.99,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
        description: 'Next-gen graphics card with ray tracing and DLSS 3.0',
        specs: {
            'CUDA Cores': '9728',
            'Memory': '16GB GDDR6X',
            'Boost Clock': '2.51 GHz',
            'TDP': '320W',
            'Interface': 'PCIe 4.0'
        }
    },
    // ============================================
    // PHONES
    // ============================================
    {
        id: 3,
        name: 'iPhone 15 Pro Max',
        category: 'phones',
        brand: 'Apple',
        price: 1199.99,
        image: 'https://images.unsplash.com/photo-1709528922641-412eef5ddb48?w=500',
        description: 'Latest flagship iPhone with titanium design and A17 Pro chip',
        specs: {
            'Display': '6.7\' Super Retina XDR',
            'Processor': 'A17 Pro',
            'Storage': '256GB',
            'Camera': '48MP Main',
            'Battery': '4422 mAh'
        }
    },
    {
        id: 4,
        name: 'Samsung Galaxy S24 Ultra',
        category: 'phones',
        brand: 'Samsung',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
        description: 'Premium Android phone with S Pen and advanced AI features',
        specs: {
            'Display': '6.8\' Dynamic AMOLED',
            'Processor': 'Snapdragon 8 Gen 3',
            'Storage': '512GB',
            'Camera': '200MP Main',
            'Battery': '5000 mAh'
        }
    },
    // ============================================
    // LAPTOPS
    // ============================================
    {
        id: 5,
        name: 'MacBook Pro 16\'',
        category: 'laptops',
        brand: 'Apple',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        description: 'Professional laptop with M3 Max chip and stunning display',
        specs: {
            'Display': '16.2\' Liquid Retina XDR',
            'Processor': 'Apple M3 Max',
            'RAM': '32GB',
            'Storage': '1TB SSD',
            'Battery': 'Up to 22 hours'
        }
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        category: 'laptops',
        brand: 'Dell',
        price: 1899.99,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
        description: 'Premium Windows laptop with 4K OLED display',
        specs: {
            'Display': '15.6\' 4K OLED',
            'Processor': 'Intel i9-13900H',
            'RAM': '32GB DDR5',
            'Storage': '1TB SSD',
            'GPU': 'RTX 4070'
        }
    },
    // ============================================
    // HEADPHONES
    // ============================================
    {
        id: 7,
        name: 'Sony WH-1000XM5',
        category: 'headphones',
        brand: 'Sony',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
        description: 'Industry-leading noise cancellation with premium sound',
        specs: {
            'Type': 'Over-ear',
            'Connectivity': 'Bluetooth 5.2',
            'Battery': 'Up to 30 hours',
            'Noise Cancellation': 'Advanced ANC',
            'Weight': '250g'
        }
    },
    {
        id: 8,
        name: 'AirPods Max',
        category: 'headphones',
        brand: 'Apple',
        price: 549.99,
        image: 'https://images.unsplash.com/photo-1628329567705-f8f7150c3cff?w=500&',
        description: 'Premium over-ear headphones with spatial audio',
        specs: {
            'Type': 'Over-ear',
            'Connectivity': 'Bluetooth 5.0',
            'Battery': 'Up to 20 hours',
            'Chip': 'Apple H1',
            'Weight': '384g'
        }
    },
    // ============================================
    // SPEAKERS
    // ============================================
    {
        id: 9,
        name: 'Sonos Era 300',
        category: 'speakers',
        brand: 'Sonos',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        description: 'Spatial audio speaker with Dolby Atmos support',
        specs: {
            'Type': 'Smart Speaker',
            'Connectivity': 'WiFi, Bluetooth',
            'Drivers': '6 speakers',
            'Voice Control': 'Alexa, Google Assistant',
            'Dimensions': '260 x 160mm'
        }
    },
    {
        id: 10,
        name: 'JBL Charge 5',
        category: 'speakers',
        brand: 'JBL',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
        description: 'Portable Bluetooth speaker with powerful bass and waterproof design',
        specs: {
            'Type': 'Portable Speaker',
            'Connectivity': 'Bluetooth 5.1',
            'Battery': 'Up to 20 hours',
            'Waterproof': 'IP67 rated',
            'Weight': '960g'
        }
    }
];
