const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../config/prismaClient");
require("dotenv").config();

// Generate JWT Token (access token) with short expiration
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

// Generate Refresh Token (longer expiry)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// Signup Service with account verification
exports.signup = async ({ username, email, password, phoneNumber, role }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  // Generate a random verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      verificationToken,
      verified: false,
    },
  });

  // Here you would typically send an email containing a link like:
  // http://yourdomain.com/api/auth/verify/<verificationToken>
  console.log(`Verify your account via: /api/auth/verify/${verificationToken}`);

  return { user, token: generateToken(user) };
};

// Account Verification Service
exports.verifyAccount = async (token) => {
  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });
  if (!user) throw new Error("Invalid verification token");

  return await prisma.user.update({
    where: { id: user.id },
    data: { verified: true, verificationToken: null },
  });
};

// Signin Service
exports.signin = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Optionally check if the account is verified:
  if (!user.verified) {
    throw new Error("Please verify your account before logging in.");
  }

  // Return both access and refresh tokens
  return {
    user,
    token: generateToken(user),
    refreshToken: generateRefreshToken(user),
  };
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

  // Send an email with the reset token link:
  // e.g., http://yourdomain.com/api/auth/reset-password?token=<resetToken>
  console.log(
    `Reset your password via: /api/auth/reset-password?token=${resetToken}`
  );

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
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) throw new Error("User not found");

    return { token: generateToken(user) };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
