import React, { useState } from "react";
import CartAmountToggle from "./CartAmountToggle";
import { Button } from "react-bootstrap";
import "../pages/ProductView/SingleProduct.css";
import { useCartContext } from "../context/cartContext";

const AddToCart = ({ product }) => {
  // product data
  const { id, sizes, stock } = product;
  // size state
  const [size, setSize] = useState("");
  // cart items amount
  const [amount, setAmount] = useState(1);

  const { addToCart, msgAlertWarning } = useCartContext();

  // when click on the + button will check if the item amount less then stock available
  const incAmount = () => {
    amount >= stock ? setAmount(stock) : setAmount(amount + 1);
  };

  // when click on the - button will check if item amount greater then 1
  const decAmount = () => {
    return amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  return (
    <>
      {/* product size */}

      <div className="productSize">
        <h6 className="sizeText">Size: {size}</h6>
        <div className="allSizes">
          {sizes.map((curSize, i) => {
            return (
              <Button
                key={i}
                className={curSize === size ? "sizeBtn sizeClicked" : "sizeBtn"}
                onClick={() => {
                  setSize(curSize);
                }}
              >
                {curSize}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Product quantity */}

      <CartAmountToggle
        amount={amount}
        incAmount={incAmount}
        decAmount={decAmount}
      />

      {/* add to cart button */}

      {stock > 0 ? (
        <>
          <Button disabled variant="outline-warning" className="soldOutBtn">
            Sold Out
          </Button>
          {size === "" ? (
            <>
              <Button
                disabled
                onClick={() => {
                  msgAlertWarning();
                }}
                variant="warning"
                className="mainBtnStyle"
              >
                Add To Cart
              </Button>
              <small className="text-danger">Select The Size</small>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  addToCart(id, size, amount, product);
                }}
                variant="warning"
                className="mainBtnStyle"
              >
                Add To Cart
              </Button>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default AddToCart;
