import React from "react";
import "./ShopItem.css";
import FormatPrice from "../../Helpers/FormatPrice";

const ShopItems = ({ product }) => {
  const { productName, price, productImage, stock } = product;
  return (
    <div className="shopItem" style={{ width: "15rem" }}>
      <div style={{ height: "20rem" }} className="productImg">
        <img style={{ height: "100%" }} src={productImage} alt="" />
      </div>
      <div className="description">
        {stock > 0 ? (
          <h6 className="avb avbTextWarning m-0">IN STOCK</h6>
        ) : (
          <h6 className="avb avbTextDanger m-0">OUT OF STOCK</h6>
        )}
        <p className="m-0 mt-2">{productName}</p>
        <p className="m-0 mt-1">{<FormatPrice price={price} />}</p>
      </div>
    </div>
  );
};

export default ShopItems;
