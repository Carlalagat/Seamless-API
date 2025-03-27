const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  console.log("Clearing existing data...");

  await prisma.media.deleteMany(); // Delete media first since it references Product
  await prisma.review.deleteMany(); // Delete reviews before products
  await prisma.order.deleteMany(); // Delete orders before products & measurements
  await prisma.measurement.deleteMany(); // Delete measurements before users
  await prisma.product.deleteMany(); // Now it's safe to delete products
  await prisma.fabricType.deleteMany(); // Delete fabric types before fabrics
  await prisma.fabric.deleteMany(); // Now it's safe to delete fabrics
  await prisma.user.deleteMany(); // Finally, delete users

  console.log("Database cleared successfully.");

  console.log("Seeding data...");

  // 1. Create Admin User (single record, use create)
  const adminPlainPassword = "Admin@Nakuru2025!";
  const adminHashedPassword = await bcrypt.hash(adminPlainPassword, 10);
  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@nakurutailors.co.ke",
      password: adminHashedPassword,
      phoneNumber: "+254700123456",
      role: "ADMIN",
      authToken: "38f1b3a0-6ab1-4568-a888-e88c7de3e365",
      verified: true,
      verificationToken: null,
    },
  });
  console.log("Created admin user:", adminUser.username);

  // 2. Create Tailors (using createMany with Promise.all to precompute hashed passwords)
  const tailorData = [
    {
      username: "kimani_bespoke",
      email: "kimani@nakurutailors.co.ke",
      password: "Kimani@2025!",
      phoneNumber: "+254711234567",
      role: "TAILOR",
    },
    {
      username: "wanjiku_fashions",
      email: "wanjiku@nakurutailors.co.ke",
      password: "Wanjiku@2025!",
      phoneNumber: "+254722345678",
      role: "TAILOR",
    },
    {
      username: "ochieng_styles",
      email: "ochieng@nakurutailors.co.ke",
      password: "Ochieng@2025!",
      phoneNumber: "+254733456789",
      role: "TAILOR",
    },
  ];

  // Precompute tailors' hashed passwords using map with Promise.all:
  const tailorsToCreate = await Promise.all(
    tailorData.map(async (tailor) => ({
      username: tailor.username,
      email: tailor.email,
      password: await bcrypt.hash(tailor.password, 10),
      phoneNumber: tailor.phoneNumber,
      role: tailor.role,
      authToken: generateUUID(),
      verified: true,
      verificationToken: null,
    }))
  );
  await prisma.user.createMany({ data: tailorsToCreate });
  // Fetch tailors from database for later reference
  const tailors = await prisma.user.findMany({ where: { role: "TAILOR" } });
  console.log(`Created ${tailors.length} tailors`);

  // 3. Create Clients (using createMany)
  const clientData = [
    {
      username: "njoroge_john",
      email: "njoroge@gmail.com",
      password: "Njoroge@2025!",
      phoneNumber: "+254744567890",
      role: "CLIENT",
    },
    {
      username: "akoth_mary",
      email: "akoth@gmail.com",
      password: "Akoth@2025!",
      phoneNumber: "+254755678901",
      role: "CLIENT",
    },
    {
      username: "kamau_peter",
      email: "kamau@gmail.com",
      password: "Kamau@2025!",
      phoneNumber: "+254766789012",
      role: "CLIENT",
    },
    {
      username: "akinyi_grace",
      email: "akinyi@gmail.com",
      password: "Akinyi@2025!",
      phoneNumber: "+254777890123",
      role: "CLIENT",
    },
    {
      username: "mwangi_david",
      email: "mwangi@gmail.com",
      password: "Mwangi@2025!",
      phoneNumber: "+254788901234",
      role: "CLIENT",
    },
  ];

  const clientsToCreate = await Promise.all(
    clientData.map(async (client) => ({
      username: client.username,
      email: client.email,
      password: await bcrypt.hash(client.password, 10),
      phoneNumber: client.phoneNumber,
      role: client.role,
      authToken: generateUUID(),
      verified: true,
      verificationToken: null,
    }))
  );
  await prisma.user.createMany({ data: clientsToCreate });
  // Fetch clients for later use
  const clients = await prisma.user.findMany({ where: { role: "CLIENT" } });
  console.log(`Created ${clients.length} clients`);
  // 4. Create Fabrics and FabricTypes
  // 4. Create Fabrics and FabricTypes
  const fabricData = [
    {
      types: [
        { name: "Ankara Print - Blue Pattern" },
        { name: "Ankara Print - Red Pattern" },
      ],
    },
    {
      types: [
        { name: "Kitenge - Green Motif" },
        { name: "Kitenge - Yellow Motif" },
      ],
    },
    {
      types: [{ name: "Cotton - White" }, { name: "Cotton - Navy Blue" }],
    },
    {
      types: [{ name: "Linen - Beige" }, { name: "Linen - Light Gray" }],
    },
    {
      types: [{ name: "Kente - Traditional" }, { name: "Kente - Modern" }],
    },
  ];

  const fabrics = await Promise.all(
    fabricData.map(async (fabric) => {
      const newFabric = await prisma.fabric.create({
        data: {},
      });
      const fabricTypesData = fabric.types.map((type) => ({
        name: type.name,
        fabric_id: newFabric.id,
      }));
      await prisma.fabricType.createMany({ data: fabricTypesData });
      return newFabric;
    })
  );
  console.log(`Created ${fabrics.length} fabrics with their types`);

  // 5. Create Measurements for Clients
  const measurementsData = clients.map((client) => ({
    user_id: client.id,
    neck: getRandomFloat(12, 18),
    chest: getRandomFloat(34, 46),
    waist: getRandomFloat(28, 42),
    hips: getRandomFloat(34, 48),
    inseam: getRandomFloat(28, 34),
    sleeve: getRandomFloat(22, 28),
  }));
  await prisma.measurement.createMany({ data: measurementsData });
  const measurements = await prisma.measurement.findMany();
  console.log(`Created ${measurements.length} measurements`);

  // 6. Create Products
  const productData = [
    {
      productName: "Custom Ankara Suit",
      description:
        "Elegant two-piece Ankara suit with modern cut and traditional patterns.",
      price: 4500,
      location: "Nakuru CBD",
      tailorIndex: 0,
      fabricIndex: 0,
    },
    {
      productName: "Traditional Kitenge Dress",
      description:
        "Beautiful Kitenge dress with hand-embroidered details, perfect for special occasions.",
      price: 3800,
      location: "Milimani, Nakuru",
      tailorIndex: 1,
      fabricIndex: 1,
    },
    {
      productName: "Business Linen Shirt",
      description:
        "Professional linen shirt with custom collar design and perfect fit.",
      price: 2200,
      location: "Section 58, Nakuru",
      tailorIndex: 2,
      fabricIndex: 3,
    },
    {
      productName: "Custom Cotton Trousers",
      description:
        "Comfortable cotton trousers with perfect measurements for daily wear.",
      price: 2500,
      location: "Nakuru CBD",
      tailorIndex: 0,
      fabricIndex: 2,
    },
    {
      productName: "Kente Celebration Outfit",
      description:
        "Traditional Kente outfit designed for weddings and special celebrations.",
      price: 5500,
      location: "Milimani, Nakuru",
      tailorIndex: 1,
      fabricIndex: 4,
    },
    {
      productName: "Modern Kitenge Blouse",
      description:
        "Contemporary blouse made with Kitenge fabric, combining tradition with modern style.",
      price: 1800,
      location: "Section 58, Nakuru",
      tailorIndex: 2,
      fabricIndex: 1,
    },
    {
      productName: "Executive Linen Suit",
      description:
        "Premium linen suit tailored for professionals who appreciate quality and comfort.",
      price: 7500,
      location: "Nakuru CBD",
      tailorIndex: 0,
      fabricIndex: 3,
    },
    {
      productName: "Traditional Wedding Attire",
      description:
        "Bespoke wedding outfit combining Ankara and Kente fabrics for the special day.",
      price: 9000,
      location: "Milimani, Nakuru",
      tailorIndex: 1,
      fabricIndex: 0,
    },
  ];

  const productsData = productData.map((product) => {
    const tailor = tailors[product.tailorIndex];
    const fabric = fabrics[product.fabricIndex];
    return {
      fabric_id: fabric.id,
      productName: product.productName,
      description: product.description,
      price: product.price,
      location: product.location,
      tailorName: tailor ? tailor.username : "Unknown Tailor",
    };
  });
  await prisma.product.createMany({ data: productsData });
  const products = await prisma.product.findMany();
  console.log(`Created ${products.length} products`);

  // 7. Create Orders
  const orders = [];
  const orderData = [
    { clientIndex: 0, productIndex: 0, measurementIndex: 0 },
    { clientIndex: 1, productIndex: 1, measurementIndex: 1 },
    { clientIndex: 2, productIndex: 3, measurementIndex: 2 },
    { clientIndex: 3, productIndex: 4, measurementIndex: 3 },
    { clientIndex: 4, productIndex: 6, measurementIndex: 4 },
  ];

  // Function to generate a random delivery address
function generateRandomAddress() {
  const streetNumbers = [
    '123', '456', '789', '101', '242', '567', '890', '321', '654', '987'
  ];
  const streetNames = [
    'Main St', 'Oak Ave', 'Cedar Rd', 'Pine Lane', 'Maple Drive', 
    'Elm Street', 'Willow Way', 'Birch Boulevard', 'Acacia Road', 'Jacaranda Street'
  ];
  const cities = [
    'Nakuru', 'Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'
  ];

  const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];

  return `${streetNumber} ${streetName}, ${city}`;
}

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
          deliveryAddress: generateRandomAddress(), // Generate a random address string
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
    {
      clientIndex: 0,
      productIndex: 0,
      rating: 4.8,
      comment:
        "Excellent quality and perfect fit! Very satisfied with my purchase.",
    },
    {
      clientIndex: 1,
      productIndex: 1,
      rating: 4.5,
      comment:
        "The tailor understood exactly what I wanted. The fabric is beautiful.",
    },
    {
      clientIndex: 2,
      productIndex: 3,
      rating: 4.9,
      comment: "Great craftsmanship and attention to detail. Will order again.",
    },
    {
      clientIndex: 3,
      productIndex: 4,
      rating: 4.7,
      comment: "The outfit exceeded my expectations. Delivery was on time too.",
    },
    {
      clientIndex: 4,
      productIndex: 6,
      rating: 5.0,
      comment: "Beautiful work and professional service. Highly recommended!",
    },
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

  console.log("Database seeding completed successfully.");
}

// Helper Functions
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
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
