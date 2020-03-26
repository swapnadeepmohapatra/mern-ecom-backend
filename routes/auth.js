const express = require("express");
const { signout, signup } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.get("/signout", signout);

module.exports = router;
