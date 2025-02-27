const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOrders = async (req, res) => {
  try {
    const Orders = await prisma.Order.findMany();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const Order = await prisma.Order.findUnique({
      where: { id: Number(id) },
    });

    if (!Order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(Order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const Order = await prisma.Order.create({
      data: req.body,
    });
    res.status(201).json(Order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const Order = await prisma.Order.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(Order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Order.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};