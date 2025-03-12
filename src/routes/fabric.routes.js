const express = require('express');
const router = express.Router();
const fabricController = require('../controllers/fabric.controller');

// If you plan to use validation middleware, you can add it here:
// const { validateBody } = require('../middlewares/validate.middleware');
// const { userSchema } = require('../dtos/user.dto'); // For example, using Joi

// router.post('/', fabricController.createFabric);
router.get('/', fabricController.getAllFabrics);
router.get('/:id', fabricController.getFabricById);
// router.patch('/:id', fabricController.updateFabricById);
router.delete('/:id', fabricController.deleteFabric);

module.exports = router;
