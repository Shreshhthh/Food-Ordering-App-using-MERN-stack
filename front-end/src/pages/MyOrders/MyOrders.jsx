import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { ContextStore } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(ContextStore);
  let [data, setData] = useState([]);
  console.log(token);

  const fetchOrders = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/order/userorder",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
    console.log(token, url);
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My order </h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
