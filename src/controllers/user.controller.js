const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 
const getUsers = async (req, res) => {
  try {
    const Users = await prisma.User.findMany();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await prisma.User.findUnique({
      where: { id: Number(id) },
    });

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const User = await prisma.User.create({
      data: req.body,
    });
    res.status(201).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await prisma.User.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.User.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};