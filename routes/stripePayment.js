const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/stripePayment");
const { isAuthenticated, isSignedIn } = require("../controllers/auth");

router.post("/payment/stripe", makePayment);

module.exports = router;
