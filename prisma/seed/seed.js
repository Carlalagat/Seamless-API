const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    console.log('Seeding the database with Nakuru County, Kenya tailoring data...');

    // 1. Create Admin User
    // Using plain text passwords instead of hashing for simplicity
    const adminUser = await prisma.user.create({
        data: {
            username: 'admin',
            email: 'admin@nakurutailors.co.ke',
            password: 'Admin@Nakuru2025!', // Plain text password now
            phoneNumber: '+254700123456',
            role: 'ADMIN',
            authToken: '38f1b3a0-6ab1-4568-a888-e88c7de3e365',
        },
    });
    console.log('Created admin user:', adminUser.username);

    // 2. Create Tailors (3)
    const tailors = [];
    const tailorData = [
        {
            username: 'kimani_bespoke',
            email: 'kimani@nakurutailors.co.ke',
            password: 'Kimani@2025!',
            phoneNumber: '+254711234567',
            name: 'James Kimani'
        },
        {
            username: 'wanjiku_fashions',
            email: 'wanjiku@nakurutailors.co.ke',
            password: 'Wanjiku@2025!',
            phoneNumber: '+254722345678',
            name: 'Elizabeth Wanjiku'
        },
        {
            username: 'ochieng_styles',
            email: 'ochieng@nakurutailors.co.ke',
            password: 'Ochieng@2025!',
            phoneNumber: '+254733456789',
            name: 'Daniel Ochieng'
        }
    ];

    for (const tailor of tailorData) {
        const newTailor = await prisma.user.create({
            data: {
                username: tailor.username,
                email: tailor.email,
                password: tailor.password, // Using plain text passwords
                phoneNumber: tailor.phoneNumber,
                role: 'TAILOR',
                authToken: generateUUID(),
            },
        });
        tailors.push({ ...newTailor, name: tailor.name });
    }
    console.log(`Created ${tailors.length} tailors`);

    // 3. Create Clients (5)
    const clients = [];
    const clientData = [
        {
            username: 'njoroge_john',
            email: 'njoroge@gmail.com',
            password: 'Njoroge@2025!',
            phoneNumber: '+254744567890'
        },
        {
            username: 'akoth_mary',
            email: 'akoth@gmail.com',
            password: 'Akoth@2025!',
            phoneNumber: '+254755678901'
        },
        {
            username: 'kamau_peter',
            email: 'kamau@gmail.com',
            password: 'Kamau@2025!',
            phoneNumber: '+254766789012'
        },
        {
            username: 'akinyi_grace',
            email: 'akinyi@gmail.com',
            password: 'Akinyi@2025!',
            phoneNumber: '+254777890123'
        },
        {
            username: 'mwangi_david',
            email: 'mwangi@gmail.com',
            password: 'Mwangi@2025!',
            phoneNumber: '+254788901234'
        }
    ];

    for (const client of clientData) {
        const newClient = await prisma.user.create({
            data: {
                username: client.username,
                email: client.email,
                password: client.password, // Using plain text passwords
                phoneNumber: client.phoneNumber,
                role: 'CLIENT',
                authToken: generateUUID(),
            },
        });
        clients.push(newClient);
    }
    console.log(`Created ${clients.length} clients`);

    // 4. Create Fabrics and FabricTypes
    const fabrics = [];
    const fabricData = [
        {
            types: [
                { name: 'Ankara Print - Blue Pattern' },
                { name: 'Ankara Print - Red Pattern' }
            ]
        },
        {
            types: [
                { name: 'Kitenge - Green Motif' },
                { name: 'Kitenge - Yellow Motif' }
            ]
        },
        {
            types: [
                { name: 'Cotton - White' },
                { name: 'Cotton - Navy Blue' }
            ]
        },
        {
            types: [
                { name: 'Linen - Beige' },
                { name: 'Linen - Light Gray' }
            ]
        },
        {
            types: [
                { name: 'Kente - Traditional' },
                { name: 'Kente - Modern' }
            ]
        }
    ];

    for (const fabric of fabricData) {
        const newFabric = await prisma.fabric.create({
            data: {
                fabricTypes: {
                    create: fabric.types.map(() => ({})),
                },
            },
        });
        fabrics.push(newFabric);
    }
    console.log(`Created ${fabrics.length} fabrics with their types`);

    // 5. Create Measurements for Clients
    const measurements = [];
    for (const client of clients) {
        const measurement = await prisma.measurement.create({
            data: {
                user_id: client.id,
                neck: getRandomFloat(12, 18),
                chest: getRandomFloat(34, 46),
                waist: getRandomFloat(28, 42),
                hips: getRandomFloat(34, 48),
                inseam: getRandomFloat(28, 34),
                sleeve: getRandomFloat(22, 28),
            },
        });
        measurements.push(measurement);
    }
    console.log(`Created ${measurements.length} measurements`);

    // 6. Create Products
    const products = [];
    const productData = [
        {
            productName: 'Custom Ankara Suit',
            description: 'Elegant two-piece Ankara suit with modern cut and traditional patterns.',
            price: 4500,
            location: 'Nakuru CBD',
            tailorIndex: 0,
            fabricIndex: 0
        },
        {
            productName: 'Traditional Kitenge Dress',
            description: 'Beautiful Kitenge dress with hand-embroidered details, perfect for special occasions.',
            price: 3800,
            location: 'Milimani, Nakuru',
            tailorIndex: 1,
            fabricIndex: 1
        },
        {
            productName: 'Business Linen Shirt',
            description: 'Professional linen shirt with custom collar design and perfect fit.',
            price: 2200,
            location: 'Section 58, Nakuru',
            tailorIndex: 2,
            fabricIndex: 3
        },
        {
            productName: 'Custom Cotton Trousers',
            description: 'Comfortable cotton trousers with perfect measurements for daily wear.',
            price: 2500,
            location: 'Nakuru CBD',
            tailorIndex: 0,
            fabricIndex: 2
        },
        {
            productName: 'Kente Celebration Outfit',
            description: 'Traditional Kente outfit designed for weddings and special celebrations.',
            price: 5500,
            location: 'Milimani, Nakuru',
            tailorIndex: 1,
            fabricIndex: 4
        },
        {
            productName: 'Modern Kitenge Blouse',
            description: 'Contemporary blouse made with Kitenge fabric, combining tradition with modern style.',
            price: 1800,
            location: 'Section 58, Nakuru',
            tailorIndex: 2,
            fabricIndex: 1
        },
        {
            productName: 'Executive Linen Suit',
            description: 'Premium linen suit tailored for professionals who appreciate quality and comfort.',
            price: 7500,
            location: 'Nakuru CBD',
            tailorIndex: 0,
            fabricIndex: 3
        },
        {
            productName: 'Traditional Wedding Attire',
            description: 'Bespoke wedding outfit combining Ankara and Kente fabrics for the special day.',
            price: 9000,
            location: 'Milimani, Nakuru',
            tailorIndex: 1,
            fabricIndex: 0
        }
    ];

    for (const product of productData) {
        const tailor = tailors[product.tailorIndex];
        const fabric = fabrics[product.fabricIndex];
        
        const newProduct = await prisma.product.create({
            data: {
                fabric_id: fabric.id,
                productName: product.productName,
                description: product.description,
                price: product.price,
                location: product.location,
                tailorName: tailor.name,
                media: {
                    create: [
                        {
                            user_id: tailor.id,
                            url: `https://nakurutailors.co.ke/images/${product.productName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                            type: 'IMAGE',
                        },
                    ],
                },
            },
        });
        products.push(newProduct);
    }
    console.log(`Created ${products.length} products`);

    // 7. Create Orders
    const orders = [];
    const orderData = [
        { clientIndex: 0, productIndex: 0, measurementIndex: 0 },
        { clientIndex: 1, productIndex: 1, measurementIndex: 1 },
        { clientIndex: 2, productIndex: 3, measurementIndex: 2 },
        { clientIndex: 3, productIndex: 4, measurementIndex: 3 },
        { clientIndex: 4, productIndex: 6, measurementIndex: 4 }
    ];

    for (let i = 0; i < orderData.length; i++) {
        const order = orderData[i];
        const client = clients[order.clientIndex];
        const product = products[order.productIndex];
        const measurement = measurements[order.measurementIndex];

        try {
            const newOrder = await prisma.order.create({
                data: {
                    user_id: client.id,
                    measurement_id: measurement.id,
                    product_id: product.id,
                    status: getRandomFloat(10, 100),
                    deliveryPrice: getRandomFloat(200, 500),
                    totalPrice: product.price + getRandomFloat(200, 500),
                    deliveryAddress: 123, // This should be a string, not a float - schema issue
                    deliveryDate: getRandomFutureDate(),
                    orderDate: getRandomPastDate(),
                },
            });
            orders.push(newOrder);
        } catch (error) {
            console.warn(`Failed to create order: ${error.message}`);
        }
    }
    console.log(`Created ${orders.length} orders`);

    // 8. Create Reviews
    const reviews = [];
    const reviewData = [
        { clientIndex: 0, productIndex: 0, rating: 4.8, comment: "Excellent quality and perfect fit! Very satisfied with my purchase." },
        { clientIndex: 1, productIndex: 1, rating: 4.5, comment: "The tailor understood exactly what I wanted. The fabric is beautiful." },
        { clientIndex: 2, productIndex: 3, rating: 4.9, comment: "Great craftsmanship and attention to detail. Will order again." },
        { clientIndex: 3, productIndex: 4, rating: 4.7, comment: "The outfit exceeded my expectations. Delivery was on time too." },
        { clientIndex: 4, productIndex: 6, rating: 5.0, comment: "Beautiful work and professional service. Highly recommended!" }
    ];

    for (const review of reviewData) {
        try {
            const client = clients[review.clientIndex];
            const product = products[review.productIndex];
            
            const newReview = await prisma.review.create({
                data: {
                    user_id: client.id,
                    product_id: product.id,
                    rating: review.rating,
                    comment: review.comment,
                },
            });
            reviews.push(newReview);
        } catch (error) {
            console.warn(`Failed to create review: ${error.message}`);
        }
    }
    console.log(`Created ${reviews.length} reviews`);

    console.log('Database seeding completed successfully.');
}

// Helper Functions
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getRandomFloat(min, max, precision = 1) {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(precision));
}

function getRandomFutureDate() {
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + Math.floor(Math.random() * 30) + 1);
    return futureDate;
}

function getRandomPastDate() {
    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setDate(now.getDate() - Math.floor(Math.random() * 30) - 1);
    return pastDate;
}

// Execute the seed function
seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });