const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  { timestamps: true }
);

const category = mongoose.model("Category", CategorySchema);
module.exports = category;
