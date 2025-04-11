const mediaService = require('../services/media.service');
const { CreateMediaDto, UpdateMediaDto } = require('../dto/media.dto');
const multer = require('multer');
const path = require('path');

// Use memory storage instead of disk storage to avoid keeping files locally
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

exports.getAllMedia = async (req, res, next) => {
  try {
    const media = await mediaService.getAllMedia();
    res.json(media);
  } catch (error) {
    next(error);
  }
};

exports.getMediaByProductId = async (req, res, next) => {
  try {
    const media = await mediaService.getMediaByProductId(req.params.productId);
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
    // Process a single file upload
    upload.single('file')(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      try {
        // Make sure we're passing all required data from the request
        if (!req.body.product_id) {
          return res.status(400).json({ 
            error: "Missing required fields", 
            message: "product_id is required" 
          });
        }
        
        const mediaData = new CreateMediaDto(req.body);
        
        // Use buffer-based upload if available
        let newMedia;
        if (req.file && req.file.buffer) {
          newMedia = await mediaService.createMediaFromBuffer(
            mediaData, 
            req.file.buffer, 
            req.file.originalname
          );
        } else {
          newMedia = await mediaService.createMedia(mediaData, req.file);
        }
        
        res.status(201).json(newMedia);
      } catch (error) {
        console.error("Error creating media:", error);
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMediaById = async (req, res, next) => {
  try {
    // Process a single file upload
    upload.single('file')(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      try {
        const mediaData = new UpdateMediaDto(req.body);
        const updatedMedia = await mediaService.updateMediaById(req.params.id, mediaData, req.file);
        
        if (updatedMedia) {
          res.json(updatedMedia);
        } else {
          res.status(404).send('Media not found');
        }
      } catch (error) {
        console.error("Error updating media:", error);
        res.status(400).json({ message: error.message });
      }
    });
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
