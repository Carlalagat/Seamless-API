const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaClient");
require("dotenv").config();


// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

// Signup Service
exports.signup = async ({ username, email, password, phoneNumber, role }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword, phoneNumber, role },
  });

  return { user, token: generateToken(user) };
};

// Signin Service
exports.signin = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  return { user, token: generateToken(user) };
};

exports.reset_password = async (email) => {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid user email");
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return await prisma.user.reset_password({
    where: { email },
  });
};
