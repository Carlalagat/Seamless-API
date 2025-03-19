const express = require('express');
const router = express.Router();
const fabrictypeController = require('../controllers/fabrictype.controller');

router.post('/', fabrictypeController.createFabrictype);
router.get('/', fabrictypeController.getAllFabrictypes);
router.get('/:id', fabrictypeController.getFabrictypeById);
router.delete('/:id', fabrictypeController.deleteFabrictypeById);
router.patch('/:id', fabrictypeController.updateFabrictypeById);


module.exports = router;