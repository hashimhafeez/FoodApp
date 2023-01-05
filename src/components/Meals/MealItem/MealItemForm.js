import { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useState } from "react";

const MealItemForm = (props) => {
  const [amountEnter, setAmountIsValid] = useState(true);
  let amountInputRef = useRef();
  const submitItemData = (e) => {
    e.preventDefault();
    const enterAmount = amountInputRef.current.value;
    const enteAmountNumber = +enterAmount;
    if (
      enterAmount.trim().length === 0 ||
      enteAmountNumber < 1 ||
      enteAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteAmountNumber);
  };

  return (
    <form className={classes.form} onClick={submitItemData}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button className={classes.button}>+ Add</button>
      {!amountEnter && <p>Kindly Enter Value Between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
