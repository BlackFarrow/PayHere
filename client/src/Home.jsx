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

    const response = await axios.post("http://localhost:5000/generate-hash", {
      order_id,
      amount,
      currency,
    });

    const hash = response.data.hash;
    const merchant_id = response.data.MERCHANT_ID;

    // const MERCHANT_ID = "1227621";
    // const MERCHANT_SECRET = "";
    // const hash = to_upper_case(md5(MERCHANT_ID + order_id + amount + currency + to_upper_case(md5(MERCHANT_SECRET))))

    // const hash = md5(
    //   MERCHANT_ID +
    //     order_id +
    //     amount +
    //     currency +
    //     md5(MERCHANT_SECRET).toUpperCase()
    // ).toUpperCase();

    const payment = {
      sandbox: true,
      merchant_id ,// Replace your Merchant ID
      return_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      notify_url: "http://localhost:5000/notify",
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
    console.log(order);
    console.log(hash);
    console.log(order_id);
    console.log("PayHere Object:", payhere);
    console.log("Payment Object:", payment);
    console.log(merchant_id);
    payhere.startPayment(payment);
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
