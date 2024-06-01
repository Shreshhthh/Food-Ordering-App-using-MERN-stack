import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { ContextStore } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItems, url } =
    useContext(ContextStore);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 99,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Failed to place order");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-feilds">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={handleOnChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={handleOnChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Email Id"
          name="email"
          value={data.email}
          onChange={handleOnChange}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={handleOnChange}
          required
        />
        <div className="multi-feilds">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={handleOnChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="multi-feilds">
          <input
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={data.pincode}
            onChange={handleOnChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={handleOnChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹ {getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>₹ {getTotalAmount() === 0 ? 0 : 99}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>₹ {getTotalAmount() === 0 ? 0 : getTotalAmount() + 99}</b>
            </div>
          </div>
          <button requiredtype="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
