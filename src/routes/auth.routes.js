const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../middleware/auth.middleware");

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
// router.patch('/resetPassword', authController.resetPassword);

// Example: Protect a Client profile route
router.get("/profile", verifyToken, async (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
  });

module.exports = router;
