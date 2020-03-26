const express = require("express");
const { check } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name should be at least 3 character long"),
    check("email")
      .isEmail()
      .withMessage("valid email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be of minimum length 5")
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
