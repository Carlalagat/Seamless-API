const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// If you plan to use validation middleware, you can add it here:
// const { validateBody } = require('../middlewares/validate.middleware');
// const { userSchema } = require('../dtos/user.dto'); // For example, using Joi

router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUsersById);
// router.patch('/:id', userController.updateUsersById);
router.post('/', userController.createUser);

module.exports = router;
