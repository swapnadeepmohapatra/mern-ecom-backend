const stripe = require("stripe")("Key");
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
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
};
