const prisma = require("../config/prismaClient");

/**CREATE ORDER */
exports.createOrder = async (orderData) => {
  return await prisma.order.create({
    data: orderData,
  });
};

/** GET ALL ORDERS */
exports.getAllOrders = async () => {
  return await prisma.order.findMany();
};

/** GET ORDER BY ID */
exports.getOrderById = async (id) => {
    if (!id || typeof id !== "string") {
    throw new Error("Invalid order id");
    }
    try {
        const order = await prisma.order.findUnique({
            where: { id },
        });
     if (!order) {
        throw new Error("Order not found");  
     }
     return order; 
  }
  catch (error) {
    console.error("error in fetching order by ID", error);
    throw new Error("error in fetching order by ID");
  }
};
/**UPDATE ORDER BY ID */
exports.updateOrderById = async (id, orderData) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid order id");
  }
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return await prisma.order.update({
      where: { id },
      data: orderData,
    });
  } catch (error) {
    console.error("error in updating order by ID", error);
    throw new Error("error in updating order by ID");
  }
};