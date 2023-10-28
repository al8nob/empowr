import React from "react";
import "../pages/Cart/CartItem.css";
import { Button } from "react-bootstrap";
import { Minus, Plus, X } from "phosphor-react";
import { useCartContext } from "../context/cartContext";

const CartAmountItem = ({ id, amount, incAmount, decAmount }) => {
  const { removeItem } = useCartContext();

  return (
    <div className="itemQty">
      <button className="deleteCartBtn" onClick={() => removeItem(id)}>
        <small className="deleteBtnText">Delete</small>
        <X size={17} color="#ffc400" weight="bold" />
      </button>

      <div className="incDec">
        <button type="button" className="decBtn" onClick={decAmount}>
          <Minus size={20} color="#cccccc" weight="bold" />
        </button>

        <h3 className="qtyText m-0">0{amount}</h3>

        <button type="button" className="incBtn" onClick={incAmount}>
          <Plus size={20} color="#cccccc" weight="bold" />
        </button>
      </div>

      <Button
        onClick={() => removeItem(id)}
        variant="danger"
        className="deleteItemBtn"
      >
        Delete
      </Button>
    </div>
  );
};

export default CartAmountItem;
