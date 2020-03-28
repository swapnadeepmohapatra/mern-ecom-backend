const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (error, fields, file) => {
    if (error) {
      res.status(400).json({
        error: "problem with image"
      });
    }

    const { name, descripiton, price, category, stock } = fields;

    if (!name || !descripiton || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "Saving product failed"
        });
      }
      res.json(product);
    });
  });
};
