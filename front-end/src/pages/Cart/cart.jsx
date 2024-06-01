import { RxCrossCircled } from "react-icons/rx";
import React, { useContext } from "react";
import "./cart.css";
import { ContextStore } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalAmount, url } =
    useContext(ContextStore);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    <RxCrossCircled />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
        <div className="cart-bottom">
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
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT{" "}
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>Have a promo code? Enter it here.</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Enter Your Promocode" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
