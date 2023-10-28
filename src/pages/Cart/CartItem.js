import "./CartItem.css";
import FormatPrice from "../../Helpers/FormatPrice";
import CartAmountItem from "../../components/CartAmountItem";
import { useCartContext } from "../../context/cartContext";

const CartItem = ({ id, name, image, size, price, amount, max }) => {
  const { incAmount, decAmount } = useCartContext();

  return (
    <div className="itemContainer">
      <div className="item">
        <div className="imgItemDetails">
          <div className="productImage">
            <img className="prdctImage" src={image} alt={id} />
          </div>
          <div className="itemDescription">
            <div className="itemNamePrice">
              <small className="copyright">EMPOWR &copy;</small>

              {/* product name */}
              <h6 className="productName m-0">{name}</h6>
              {/* product size */}
              <small className="copyright">Size: {size}</small>
              {/* product price */}
              <p className="productPrice m-0">
                {<FormatPrice price={price} />}
              </p>
            </div>
            {max !== 0 ? (
              <p className="avbInStock m-0">In Stock</p>
            ) : (
              <p className="avbNonStock m-0">Out of Stock</p>
            )}
          </div>
        </div>
        {/* product quantity */}
        <CartAmountItem
          amount={amount}
          id={id}
          incAmount={() => incAmount(id)}
          decAmount={() => decAmount(id)}
        />
      </div>
    </div>
  );
};

export default CartItem;
