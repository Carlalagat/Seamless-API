const mediaService = require('../services/media.service');
const { CreateMediaDto } = require('../dto/media.dto');

exports.getAllMedia = async (req, res, next) => {
  try {
    const media = await mediaService.getAllMedia();
    res.json(media);
  } catch (error) {
    next(error);
  }
};

exports.getMediaById = async (req, res, next) => {
  try {
    const media = await mediaService.getMediaById(req.params.id);
    if (media) {
      res.json(media);
    } else {
      res.status(404).send('Media not found');
    }
  } catch (error) {
    next(error);
  }
};

exports.createMedia = async (req, res, next) => {
  try {
    // Make sure we're passing all required data from the request
    if (!req.body.product_id || !req.body.user_id) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        message: "product_id and user_id are required" 
      });
    }

    const mediaData = new CreateMediaDto(req.body);
    const newMedia = await mediaService.createMedia(mediaData);
    res.status(201).json(newMedia);
  } catch (error) {
    console.error("Error creating media:", error);
    next(error);
  }
};

exports.updateMediaById = async (req, res, next) => {
  try {
    const mediaData = req.body;
    const updatedMedia = await mediaService.updateMediaById(req.params.id, mediaData);
    if (updatedMedia) {
      res.json(updatedMedia);
    } else {
      res.status(404).send('Media not found');
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteMediaById = async (req, res, next) => {
  try {
    const result = await mediaService.deleteMediaById(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send('Media not found');
    }
  } catch (error) {
    next(error);
  }
};