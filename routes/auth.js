const express = require("express");

const router = express.Router();

const signout = (req, res) => {
  res.json({ user: "done" });
};

router.get("/signOut", signout);

module.exports = router;
