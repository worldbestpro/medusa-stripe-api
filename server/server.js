const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const SK_TEST =
  "sk_test_51Lx5qsGk9QczIREZa1UcIS17fPMJQJGtdtkYrYSoTzW2Elp7iaN7F9EtmJ89wCOYic6AfwH2jBkiQ7f7a2EndUO300BO8IXwNj";
const app = express();
const port = process.env.PORT || 7000;
const stripe = require("stripe")(SK_TEST);

//enable cors
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//generate payment request for a card payer
app.post("/stripe", async (req, res) => {
  //user sends price along with request
  const userPrice = parseInt(req.body.price);
  //create a payment intent
  const intent = await stripe.paymentIntents.create({
    //use the specified price
    amount: userPrice,
    currency: "usd",
    payment_method_types: ["card"],
  });

  //respond with the client secret and id of the new paymentintent
  res.json({ client_secret: intent.client_secret, intent_id: intent.id });
});

//handle payment confirmations
app.post("/confirm-payment", async (req, res) => {
  //extract payment type from the client request
  const paymentType = String(req.body.payment_type);

  //handle confirmed stripe transaction
  if (paymentType == "stripe") {
    //get payment id for stripe
    const clientid = String(req.body.payment_id);

    //get the transaction based on the provided id
    stripe.paymentIntents.retrieve(clientid, function (err, paymentIntent) {
      //handle errors
      if (err) {
        console.log(err);
      }
      console.log("paymentType", paymentIntent);
      //respond to the client that the server confirmed the transaction
      if (paymentIntent.status === "succeeded") {
        /*YOUR CODE HERE*/
        console.log("confirmed stripe payment: " + clientid);
        res.json({ success: true, paymentIntent: paymentIntent });
      } else {
        res.json({ success: false });
      }
    });
  }
});

app.listen(port, () => console.log(`server running on port ${port}`));
