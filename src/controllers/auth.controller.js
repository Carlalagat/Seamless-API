const authService = require("../services/auth.service");


exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const result = await authService.signup(data);
    res.status(201).json({ message: "User registered successfully", ...result });
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

// exports.resetPassword = async (req, res, next) => {
//   try {
//       const newPassword = await authService.resetPassword(data);
//       res.status(201).json(newPassword);
//     } catch (error) {
//       next(error);
//     }
// };



