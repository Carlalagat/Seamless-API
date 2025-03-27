const authService = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const result = await authService.signup(data);
    res
      .status(201)
      .json({ message: "User registered successfully", ...result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const data = req.body;
    const result = await authService.signin(data);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.verifyAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await authService.verifyAccount(token);
    res.status(200).json({ message: "Account verified successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await authService.resetPassword({ token, newPassword });
    res.status(200).json({ message: "Password reset successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ message: "New access token generated", ...result });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
