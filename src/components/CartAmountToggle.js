import React from "react";
import "../pages/ProductView/SingleProduct.css";

import { Minus, Plus } from "phosphor-react";

const CartAmountToggle = ({ amount, incAmount, decAmount }) => {
  return (
    <>
      <div className="productQuantity">
        <h6 className="qtyText">Quantity:</h6>
        <div className="qtySelector">
          <button type="button" className="decBtn" onClick={() => decAmount()}>
            <Minus size={22} color="#ffc400" weight="bold" />
          </button>
          <h6 className="qtyProductAmount">0{amount}</h6>
          <button type="button" className="incBtn" onClick={() => incAmount()}>
            <Plus size={22} color="#ffc400" weight="bold" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartAmountToggle;
