const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.staus(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};
