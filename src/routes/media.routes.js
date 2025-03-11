const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controllers');

router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMediaById);
router.post('/', mediaController.createMedia);
router.patch('/:id', mediaController.updateMediaById);
router.delete('/:id', mediaController.deleteMediaById);

module.exports = router;



