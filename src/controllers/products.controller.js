const productService = require("../services/products.service");
const { CreateProductDto, UpdateProductDto } = require("../dto/product.dto");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer to use memory storage instead of disk storage
// This avoids saving files to disk permanently
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image and video files are allowed"));
    }
  },
});

// Middleware to handle file uploads
const handleFileUploads = upload.fields([
  { name: "display", maxCount: 3 }, // Main product display images
  { name: "detail", maxCount: 5 }, // Detail images
  { name: "measurement", maxCount: 2 }, // Measurement guides (image/video)
]);

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    console.log("Received ID:", req.params.id);
    const product = await productService.deleteProductById(req.params.id);
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // Handle file uploads first
    handleFileUploads(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        // Now process the product data with files
        // Parse fabricTypes from the form-data string
        const fabricTypes = req.body.fabricTypes
          ? JSON.parse(req.body.fabricTypes)
          : [];

        const productData = new CreateProductDto({
          ...req.body,
          fabricTypes, // Include parsed fabricTypes
        });

        // Add user_id if available from auth or request body
        // We'll validate user existence in the service
        productData.user_id = req.body.user_id || req.user?.id;

        if (!productData.user_id) {
          return res.status(400).json({
            error: "Missing required fields",
            message: "user_id is required to create a product",
          });
        }

        // Prepare media files for upload directly to Cloudinary
        const mediaFiles = [];
        if (req.files) {
          Object.keys(req.files).forEach((fieldName) => {
            req.files[fieldName].forEach((file) => {
              // Add the fieldname to the file object to determine purpose later
              file.fieldname = fieldName;
              mediaFiles.push(file);
            });
          });
        }

        const newProduct = await productService.createProduct(
          productData,
          mediaFiles
        );
        res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    // Handle file uploads first
    handleFileUploads(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const productData = new UpdateProductDto(req.body);

        // Add user_id to validate user in service
        productData.user_id = req.body.user_id || req.user?.id;

        // Prepare media files for upload
        const mediaFiles = [];
        if (req.files) {
          Object.keys(req.files).forEach((fieldName) => {
            req.files[fieldName].forEach((file) => {
              // Add the fieldname to the file object to determine purpose later
              file.fieldname = fieldName;
              mediaFiles.push(file);
            });
          });
        }

        const updatedProduct = await productService.updateProductById(
          req.params.id,
          productData,
          mediaFiles
        );

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    next(error);
  }
};
