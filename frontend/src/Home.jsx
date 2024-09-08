import React, { useState } from "react";
import md5 from "md5";
import axios from "axios";

const Home = () => {
  const [order, setOrder] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
    items: "Mobile",
    amount: "100.00",
    currency: "LKR",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handlePayment = async () => {
    const order_id = "ORDER_" + new Date().getTime();
    const { amount, currency } = order;

    // Fetch hash and merchant_id from backend
    const response = await axios.post("https://localhost:5000/generate-hash", {
      order_id,
      amount,
      currency,
    });

    const hash = response.data.hash;
    const merchant_id = response.data.MERCHANT_ID;

    const payment = {
      sandbox: true,
      merchant_id, // Replace with your Merchant ID
      return_url: "https://payhere-frontend.onrender.com/success",
      cancel_url: "https://payhere-frontend.onrender.com/cancel",
      notify_url: "https://5799-123-231-124-248.ngrok-free.app/notify",
      order_id,
      items: order.items,
      amount: order.amount,
      currency: order.currency,
      hash,
      first_name: order.first_name,
      last_name: order.last_name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      country: order.country,
    };

    // Show the payhere.js popup
    payhere.startPayment(payment);

    // Payment completed
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);

      // Note: validate the payment and show success or failure page to the customer
    };

    // Payment window closed
    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
      // Note: Prompt user to pay again or show an error page
    };

    // Error occurred
    payhere.onError = function onError(error) {
      console.log("Error:" + error);
      // Note: show an error page
    };
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Buy Item</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={order.first_name}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={order.last_name}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={order.email}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={order.phone}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={order.address}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={order.city}
          onChange={handleInputChange}
          className="input"
        />
        <button onClick={handlePayment} className="btn">
          Pay Here
        </button>
      </div>
    </div>
  );
};

export default Home;
