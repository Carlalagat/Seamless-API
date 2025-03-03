const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require("../middleware/auth.middleware");

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// Example: Protect a Client profile route
router.get("/profile", verifyToken, async (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
  });

module.exports = router;
