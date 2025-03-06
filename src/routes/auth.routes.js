const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../middleware/auth.middleware");

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/verify/:token', authController.verifyAccount);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/refresh-token', authController.refreshToken);

// Protected route example:
router.get("/profile", verifyToken, async (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;
