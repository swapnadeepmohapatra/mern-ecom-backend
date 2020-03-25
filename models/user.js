const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true
  },
  lastname: {
    type: String,
    maxLength: 32,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userInfo: {
    type: String,
    trim: true
  },
  //   TODO: Comeback here
  password: {
    type: String,
    trim: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Array,
    default: []
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
