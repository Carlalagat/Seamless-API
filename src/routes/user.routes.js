const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// If you plan to use validation middleware, you can add it here:
// const { validateBody } = require('../middlewares/validate.middleware');
// const { userSchema } = require('../dtos/user.dto'); // For example, using Joi

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUsersById);
router.delete('/:id', userController.deleteUsersById);

module.exports = router;
