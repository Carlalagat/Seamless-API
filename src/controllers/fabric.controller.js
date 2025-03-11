const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFabrics = async (req, res) => {
    try {
        const fabrics = await prisma.fabric.findMany();
        res.status(200).json(fabrics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFabricById = async (req, res) => {
    try {
        const { id } = req.params;
        const fabric = await prisma.fabric.findUnique({
            where: { id: Number(id) },
        });

        if (!fabric) {
            return res.status(404).json({ message: 'fabric not found' });
        }

        res.status(200).json(fabric);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createFabric = async (req, res) => {
    try {
        const fabric = await prisma.fabric.create({
            data: req.body,
        });
        res.status(201).json(fabric);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFabric = async (req, res) => {
    try {
        const { id } = req.params;
        const fabric = await prisma.fabric.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.status(200).json(fabric);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFabric = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.fabric.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: 'fabric deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllFabrics,
    getFabricById,
    createFabric,
    updateFabric,
    deleteFabric,
};