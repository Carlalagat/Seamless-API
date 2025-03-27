const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../config/prismaClient");
const EmailService = require("../helpers/email");
require("dotenv").config();

// Generate JWT Token (access token) with short expiration
const generateToken = (user, expiresIn = "15m") => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

// Generate Refresh Token (longer expiry)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, type: "refresh" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
};

// Revoke all refresh tokens for a user
const revokeUserTokens = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { authToken: crypto.randomUUID() },
  });
};

// Signup Service with account verification
exports.signup = async ({ username, email, password, phoneNumber, role }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      verificationToken,
      verificationTokenExpires,
      verified: false,
    },
  });

  // Send verification email
  await EmailService.sendVerificationEmail(email, verificationToken);

  return { user, token: generateToken(user) };
};

// Signin Service
exports.signin = async ({ identifier, password }) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.verified) {
    throw new Error("Please verify your account before logging in.");
  }

  // Revoke previous tokens and generate new ones
  await revokeUserTokens(user.id);

  return {
    user,
    token: generateToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

// Account Verification Service
exports.verifyAccount = async (token) => {
  const user = await prisma.user.findFirst({
    where: { 
      verificationToken: token,
      verificationTokenExpires: { gt: new Date() }, // Add token expiration check
    },
  });
  if (!user) throw new Error("Invalid or expired verification token");

  return await prisma.user.update({
    where: { id: user.id },
    data: { 
      verified: true, 
      verificationToken: null,
      verificationTokenExpires: null
    },
  });
};

// Forgot Password Service
exports.forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  // Generate reset token and set expiry (1 hour)
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.user.update({
    where: { email },
    data: { resetPasswordToken: resetToken, resetPasswordExpires },
  });

  // Send password reset email
  await EmailService.sendPasswordResetEmail(email, resetToken);

  return { message: "Password reset link has been sent to your email" };
};

// Reset Password Service
exports.resetPassword = async ({ token, newPassword }) => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() }, // token is still valid
    },
  });
  if (!user) throw new Error("Invalid or expired reset token");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
};

// Refresh Token Service
exports.refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Additional check against user's auth token (for revocation)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || decoded.type !== "refresh") {
      throw new Error("Invalid refresh token");
    }

    return { token: generateToken(user) };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
