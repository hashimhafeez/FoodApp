import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const cartCntx = useContext(CartContext);
  console.log("cart", cartCntx);
  const numberOfCartItem = cartCntx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);
  console.log(numberOfCartItem);
  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
}

export default HeaderCartButton;
