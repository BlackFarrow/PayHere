
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const md5 = require("md5");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MERCHANT_ID = "1227621";
const MERCHANT_SECRET = "MjUwNzE4NzEwNzExMTQyODIwMzE0MDA5MDE0MTYyNzA0MzI2NzE0";

app.post("/generate-hash", (req, res) => {
  const { order_id, amount, currency } = req.body;
  const hash = md5(
    MERCHANT_ID +
      order_id +
      amount +
      currency +
      md5(MERCHANT_SECRET).toUpperCase()
  ).toUpperCase();

  res.json({ hash,MERCHANT_ID});
});

app.post("/notify", (req, res) => {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
  } = req.body;
  const local_md5sig = md5(
    merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      md5(MERCHANT_SECRET).toUpperCase()
  ).toUpperCase();
  if (local_md5sig === md5sig && status_code == 2) {
    // TODO: Update your database as payment success
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
