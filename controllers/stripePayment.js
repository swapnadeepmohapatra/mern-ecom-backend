const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  //   console.log("PRODUCT ", product);
  //   console.log("PRICE ", product.price);
  const idempontencyKey = uuid();

  let amount = 0;
  products.map(r => {
    amount += r.price;
  });

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: amount * 100,
          // currency: "usd",
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of gadgets`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
};
