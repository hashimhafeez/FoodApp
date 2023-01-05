import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

function Cart(props) {
  const CartItems = (
    <ul>
      {[{ id: "ci", name: "Sushi", amount: "2", price: 12.99 }].map((item) => (
        <li key={Math.random()}>{item.id}</li>
      ))}
    </ul>
  );
  return (
    <Modal>
      CartItem
      <div>{CartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;
