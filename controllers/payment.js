const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid/v4');
const braintree = require('braintree');

exports.makeStripePayment = (req, res) => {
	const { products, token } = req.body;
	console.log('PRODUCTS', products);
	console.log(token);

	let amount = 0;
	products.map((p) => {
		amount = (amount + p.price) * 100;
	});

	const idempotencyKey = uuid();

	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges
				.create(
					{
						amount: amount,
						currency: 'usd',
						customer: customer.id,
						receipt_email: token.email,
						description: products[0].name,
						shipping: {
							name: token.card.name,
							address: {
								line1: token.card.address_line1,
								line2: token.card.address_line2,
								city: token.card.address_city,
								country: token.card.address_country,
								postal_code: token.card.address_zip,
							},
						},
					},
					{ idempotencyKey }
				)
				.then((result) => {
					console.log(result);

					// return res.json(token);
					// // return res.status(200).json({
					// //   aa: "bb",
					// // });
					return res.status(200).json(result);
				})
				.catch((error) => res.status(400).json(error));
		})
		.catch((error) => res.status(400).json(error));
};

const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: '9bpqd56qs2tt47xz',
	publicKey: '5g97hxtnvnvh96tb',
	privateKey: '7863274d54d67a9e6d77c64ffd20301a',
});

exports.getToken = (req, res) => {
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(response);
		}
	});
};

exports.processPayment = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amountFromTheClient = req.body.amount;
	gateway.transaction.sale(
		{
			amount: amountFromTheClient,
			paymentMethodNonce: nonceFromTheClient,
			options: {
				submitForSettlement: true,
			},
		},
		function (err, result) {
			if (err) {
				res.status(500).json({
					error: err,
				});
			} else {
				res.json(result);
			}
		}
	);
};
