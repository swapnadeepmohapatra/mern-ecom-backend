const express = require("express");
const router = express.Router();

const { isAuthenticated, isSignedIn } = require("../controllers/auth");

const {
  makeStripePayment,
  getToken,
  processPayment,
} = require("../controllers/payment");

router.post("/payment/stripe", makeStripePayment);

router.get("/payment/gettoken/:usedId", isSignedIn, getToken);
router.post("/payment/braintree/:userId", isSignedIn, processPayment);
// router.get("/payment/gettoken/:usedId", isSignedIn, isAuthenticated, getToken);
// router.post(
//   "/payment/braintree/:userId",
//   isSignedIn,
//   isAuthenticated,
//   processPayment
// );

module.exports = router;
