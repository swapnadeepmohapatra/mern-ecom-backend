const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: error.errmsg
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signout = (req, res) => {
  res.json({ message: "Signout" });
};

exports.signin = (req, res) => {
  res.json({ message: "Signin" });
};
