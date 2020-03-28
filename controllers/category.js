const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      res.status(400).json({
        error: "category not found"
      });
    }
    req.category = category;
    next();
  });
};
