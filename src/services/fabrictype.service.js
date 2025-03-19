const prisma = require("../config/prismaClient");

exports.getAllFabrictypes = async () => {
  try{
    const fabrictypes = await prisma.FabricType.findMany();
    return fabrictypes;
  }catch(error){
    console.error("error fetching fabrictypes:",error);
  }
};

exports.getFabrictypeById = async (id) => {
    if(!id || typeof id !== "string") {
      throw new Error("Invalid fabrictype id");
    }
  
    try {
      const fabrictype = await prisma.FabricType.findUnique({
        where: { id },
      });
  
      return fabrictype;
  }catch(error){
    console.error("Error fetching fabrictype by ID:", error);
    throw new Error("Failed to fetch fabrictype by ID");
  }
};

exports.createFabrictype = async (fabrictypeData) => {
  try {
    return await prisma.FabricType.create({  // Corrected to use prisma.review.create
      data: fabrictypeData,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review"); //Re-throw the error to be caught by the controller.
  }
};

exports.updatefabrictypeById = async (id, fabrictypeData) => {
  const updateData = {};
  
  if (fabrictypeData.url) updateData.url = fabrictypeData.url;
  if (fabrictypeData.type) updateData.type = fabrictypeData.type;
  
  if (fabrictypeData.product_id) {
    updateData.product = {
      connect: { id: fabrictypeData.product_id }
    };
  }
  
  if (fabrictypeData.user_id) {
    updateData.user = {
      connect: { id: fabrictypeData.user_id }
    };
  }
  
  return await prisma.FabricType.update({
    where: { id },
    data: updateData
  });
};

exports.deletefabrictypeById = async (id) => {
  try {
    await prisma.FabricType.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};
