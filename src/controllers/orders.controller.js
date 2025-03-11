const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const orderService = require("../services/products.service");
const { CreateOrderDto } = require("../dto/order.dto");

const getAllOrders = async (req, res) => {
  try {
    const Orders = await prisma.Order.findMany();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const Order = await prisma.Order.findUnique({
      where: { id: Number(id) },
    });

    if (!Order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(Order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderData = new CreateOrderDto(req.body);
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Order not created", error: error.message });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const Order = await prisma.Order.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(Order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Order.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};
