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

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d", 
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
  const accessToken = generateAccessToken(user); 
  const refreshToken = generateRefreshToken(user);
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return { user,accessToken: accessToken,refreshToken: refreshToken};
};

// Signin Service
exports.signin = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user); 

  
  await prisma.refreshToken.upsert({ 
    where: { userId: user.id },
    update: { token: refreshToken },
    create: { token: refreshToken, userId: user.id },
  });

  return { user, accessToken: accessToken,refreshToken:refreshToken};
};

