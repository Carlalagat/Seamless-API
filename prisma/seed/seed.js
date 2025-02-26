const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker'); // Using faker.js for realistic data
const bcrypt = require('bcrypt'); // For password hashing

const prisma = new PrismaClient();

async function seed() {
    console.log('Seeding the database...');

// 1. Create Admin User
const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);
const adminUser = await prisma.user.create({
    data: {
        username: 'admin',
        email: 'admin@example.com', 
        password: hashedPassword,
        phoneNumber: faker.phone.number(),
        role: 'ADMIN',
        authToken: faker.datatype.uuid(),
    },
});
console.log('Created admin user:', adminUser.username);

  // 2. Create a few sample Fabrics
const fabrics = [];
for (let i = 0; i < 5; i++) {
    const fabric = await prisma.fabric.create({
        data: {
        fabricTypes: {
            create: [
            {  },
            {  },
            ],
        },
        },
    });
    fabrics.push(fabric);
}
console.log(`Created ${fabrics.length} fabrics.`);

//Create multiple Client and Tailor users.
const users = [];
for (let i = 0; i < 10; i++) {
    const role = i % 2 === 0 ? 'CLIENT' : 'TAILOR'; // Alternate between CLIENT and TAILOR
    const hashedPassword = await bcrypt.hash(`Password${i}!`, 10);  // Different password for each user

    const user = await prisma.user.create({
        data: {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: hashedPassword,
            phoneNumber: faker.phone.number(),
            role: role,
            authToken: faker.datatype.uuid(),
        },
    });
    users.push(user);
}
console.log(`Created ${users.length} users.`);

//Create Sample Products (associate with fabrics and users)
const products = [];
for (let i = 0; i < 15; i++) {
    const randomFabric = fabrics[Math.floor(Math.random() * fabrics.length)];
    const tailorUser = users.find(user => user.role === 'TAILOR'); // Find a tailor to associate with
    if (!tailorUser) {
        console.warn('No tailor found.  Skipping product creation.');
        continue; // Skip this product if no tailor exists
    }

const product = await prisma.product.create({
    data: {
        fabric_id: randomFabric.id,
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        location: faker.address.city(),
        tailorName: tailorUser.username,  // Or tailor's name or business name
        media: {
        create: [
            {
                user_id: tailorUser.id,
                url: faker.image.imageUrl(),
                type: 'IMAGE',
            },
        ],
        },
    },
    });
    products.push(product);
}
console.log(`Created ${products.length} products.`);

  //Create sample measurements
const measurements = [];
for (let i = 0; i < 5; i++) {
    const clientUser = users.find(user => user.role === 'CLIENT');
    if (!clientUser) {
        console.warn('No client user found to create measurements.');
        continue;
    }

    const measurement = await prisma.measurement.create({
        data: {
            user_id: clientUser.id,
            user: { connect: { id: clientUser.id } },  //Explicitly connect user
            neck: faker.datatype.float({ min: 10, max: 20, precision: 0.1 }),
            chest: faker.datatype.float({ min: 30, max: 50, precision: 0.1 }),
            waist: faker.datatype.float({ min: 25, max: 45, precision: 0.1 }),
            hips: faker.datatype.float({ min: 32, max: 52, precision: 0.1 }),
            inseam: faker.datatype.float({ min: 28, max: 36, precision: 0.1 }),
            sleeve: faker.datatype.float({ min: 20, max: 30, precision: 0.1 }),
        },
    });
    measurements.push(measurement);
}
console.log(`Created ${measurements.length} measurements`);

  //Create sample orders
const orders = [];
for (let i = 0; i < 5; i++) {
    const clientUser = users.find(user => user.role === 'CLIENT');
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomMeasurement = measurements[Math.floor(Math.random() * measurements.length)];

    if (!clientUser || !randomProduct || !randomMeasurement) {
        console.warn('Skipping order creation due to missing dependencies.');
        continue;
    }

    const order = await prisma.order.create({
        data: {
        user_id: clientUser.id,
        measurement_id: randomMeasurement.id,
        product_id: randomProduct.id,
        user: { connect: { id: clientUser.id } },
        measurement: { connect: { id: randomMeasurement.id } },
        product: { connect: { id: randomProduct.id } },
        status: faker.datatype.float({ min: 0, max: 100, precision: 0.1 }),
        deliveryPrice: parseFloat(faker.commerce.price()),
        totalPrice: parseFloat(faker.commerce.price()),
        deliveryAddress: parseFloat(faker.commerce.price()),
        deliveryDate: faker.date.future(),
        orderDate: faker.date.past(),
    },
    });
    orders.push(order);
}
console.log(`Created ${orders.length} orders.`);

//Create sample reviews
const reviews = [];
for (let i = 0; i < 10; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    if (!randomUser || !randomProduct) {
        console.warn('Skipping review creation due to missing dependencies.');
        continue;
    }

    const review = await prisma.review.create({
        data: {
            user_id: randomUser.id,
            product_id: randomProduct.id,
            user: { connect: { id: randomUser.id } },
            product: { connect: { id: randomProduct.id } },
            rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
            comment: faker.lorem.sentence(),
        },
    });
    reviews.push(review);
}
console.log(`Created ${reviews.length} reviews.`);

console.log('Database seeding completed.');
}

seed()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});