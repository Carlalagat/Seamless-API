const prisma = require("../config/prismaClient");

/** GET ALL USERS */
exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};

/** UPDATE USER BY ID */
exports.updateUsersById = async (id, userData) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid user id");
  }
  
  // Retrieve the existing user record
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // If the update includes a new username and it's different from the current one,
  // check if that username is already taken by another user.
  if (userData.username && userData.username !== user.username) {
    const usernameExists = await prisma.user.findUnique({
      where: { username: userData.username },
    });
    if (usernameExists) {
      throw new Error("Username is already taken");
    }
  }

  // Perform the update operation
  return await prisma.user.update({
    where: { id },
    data: userData,
  });
};

/** DELETE USER BY ID */
exports.deleteUsersById = async (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid user id");
  }
  
  // Retrieve the existing user record
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // Perform the update operation
  return await prisma.user.delete({
    where: { id },
  });
};

/** CREATE USER */
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

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID");
  }
};
