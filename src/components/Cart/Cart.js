import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function cartReducer(state, action) {
  if (action.type === "id") {
    return {
      age: state.age + 1,
    };
  }
}

function Cart(props) {
  const data = React.useContext(CartContext);
  const totalAmount = `$${data.totalAmount.toFixed(2)}`;
  const hasItems = data.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    return data.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    return data.addItem({ ...item, amount: 1 });
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {data.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClickBackdrop={props.onCloseCart}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
