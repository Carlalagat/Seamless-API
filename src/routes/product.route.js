const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.contoller");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
