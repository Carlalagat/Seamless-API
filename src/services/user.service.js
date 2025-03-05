const prisma = require("../config/prismaClient");

exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};

exports.updateUsersById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid user id");
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return await prisma.user.delete({
    where: { id },
  });
};


exports.deleteUsersById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid user id");
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return await prisma.user.delete({
    where: { id },
  });
};

exports.createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

exports.getUserById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid user id");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user; // Return the user object

  } catch (error) {
    // Log the error (important for debugging)
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID"); // Re-throw to signal failure
  }
};