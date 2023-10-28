import CartItem from "./CartItem";
import "./Cart.css";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import emptyCartIcon from "../../images/clear shopping cart.png";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import { useCartContext } from "../../context/cartContext";
import FormatPrice from "../../Helpers/FormatPrice";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, totalItems, totalPrice, shippingFee } = useCartContext();
  console.log(cart);
  return (
    <div className="cart">
      <BreadcrumbComp children="Shopping Cart" />
      <h1 className="cartTitle">Shopping Cart</h1>
      <Row>
        <Col lg={8} md={12} sm={12} xs={12}>
          <div className="cartItems">
            {cart.map((curElem) => {
              return <CartItem key={curElem.id} {...curElem} />;
            })}
          </div>
        </Col>

        {totalItems > 0 ? (
          <Col lg={4} md={12} sm={12} xs={12}>
            <div className="cartSubtotal">
              <h1 className="subtotalText">Summary</h1>
              <div className="summaryDetails">
                <h4 className="totalPrice">
                  <FormatPrice price={totalPrice + shippingFee} />
                </h4>
                <div className="details">
                  <div className="subtotalPrice">
                    <span className="subtotal">Subtotal</span>
                    <span className="amount">
                      <FormatPrice price={totalPrice} />
                    </span>
                  </div>

                  <div className="deliveryAmount">
                    <span className="delivery">
                      Shipping
                      <span className="totalCartItems">
                        {totalItems > 1
                          ? totalItems + " items"
                          : totalItems + " item"}
                      </span>
                    </span>
                    <span className="amount">
                      <FormatPrice price={shippingFee} />
                    </span>
                  </div>

                  <div className="discountAmount">
                    <span className="discount">Discount</span>
                    <span className="amount">0%</span>
                  </div>
                </div>

                <div className="checkout">
                  <Link className="text-center" to="/">
                    <button className="backToShopBtn">Continue Shopping</button>
                  </Link>
                  <Button className="mainBtnStyle" variant="warning">
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ) : (
          <Col lg={12} md={12} sm={12}>
            <div className="emptyCart">
              <img className="emptyCartIcon" src={emptyCartIcon} alt="" />
              <h2 className="emptyCartText">Your cart is empty</h2>
              <small className="emptyCartMsg">
                There are no items in your cart.
              </small>
              <Link to="/">
                <Button variant="warning" className="mainBtnStyle">
                  Products
                </Button>
              </Link>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Cart;
