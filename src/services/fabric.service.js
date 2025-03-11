const prisma = require("../config/prismaClient");

exports.getAllFabric = async () => {
    return await prisma.fabric.findMany();
};



exports.deleteFabricById = async (id) => {
    if (!id || typeof id !== "string") {
        throw new Error("Invalid fabric id");
    }
    const fabric = await prisma.fabric.findUnique({
        where: { id },
    });
    if (!fabric) {
        throw new Error("Product not found");
    }
    return await prisma.fabric.delete({
        where: { id },
    });
};



exports.create = async (fabricData) => {
    return await prisma.fabric.create({
        data: fabricData,
    });
};
