const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

module.exports = router;
