const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_VJkriXRRieIUo0RQtqewtAEh');

const app = express();

app.use(express.json());
app.use(cors());

app.post("/charge", (req, res) => {
  stripe.charges.create({
    amount: req.body.amount,
    currency: "eur",
    source: req.body.stripeToken,
    description: `Charge from ${req.body.email}`,
    shipping: {
      address: {
        line1: req.body.street,
        city: req.body.city,
        postal_code: req.body.zipCode,
        state: req.body.country
      },
      name: `${req.body.firstName} ${req.body.lastName}`,
      phone: req.body.phone
    },
    metadata: {
      products: "Product's name"
    },
    receipt_email: req.body.email
  }, function(err, charge) {
    if(err) {
      res.status(402).json({
        error: err
      });
    } else {
      res.status(200).json({
        message: "Payment successfully completed"
      });
    }
  });
});

app.listen(3000, function () {
  console.log('Server listening on port 3000..');
});