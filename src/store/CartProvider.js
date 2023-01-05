import React from "react";
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  item: [],
  totalAmount: 0,
};
const cartReducer = (cartState, action) => {
  // Add Item Logic
  if (action.type === "Add") {
    let updatedTotalAmount =
      cartState.totalAmount + action.item.price * action.item.amount;

    console.log("updatedTotalAmount", updatedTotalAmount);

    const existingCartItemIndex = cartState.item.findIndex(
      (item) => item.id === action.item.id
    );
    console.log("itemId", existingCartItemIndex);

    const exisitingItem = cartState.item[existingCartItemIndex];
    console.log("exisitingItem", exisitingItem);
    let updatedItems;
    if (exisitingItem) {
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount + action.item.amount,
      };
      console.log("updatedItem---", updatedItem);
      console.log("cartState.item", cartState.item);
      updatedItems = [...cartState.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = cartState.item.concat(action.item);
    }
    console.log("updatedTotalAmount", updatedTotalAmount);
    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //// Remove Item Logic //////

  if (action.type === "Remove") {
    console.log("cartState.item", cartState.item);
    const existingCartItemIndex = cartState.item.findIndex(
      (item) => item.id === action.id
    );
    // console.log("existingCartItemIndex", existingCartItemIndex);

    const exisitingItem = cartState.item[existingCartItemIndex];
    console.log("exisitingItem", exisitingItem);

    let updatedTotalAmount = cartState.totalAmount - exisitingItem.price;
    // console.log("updatedTotalAmount", updatedTotalAmount);

    let updatedItems;
    if (exisitingItem) {
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount - 1,
      };
      updatedItems = [...cartState.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

function CartProvider(props) {
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "Add", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "Remove", id: id });
  };

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <div>{props.children}</div>
    </CartContext.Provider>
  );
}

export default CartProvider;
