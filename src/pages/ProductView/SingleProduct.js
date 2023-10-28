import React, { useEffect, useReducer } from "react";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import PRODUCTS from "../../Products";
import FormatPrice from "../../Helpers/FormatPrice";
import { useProductContext } from "../../context/ShopContext";
import { Button, Col, Row } from "react-bootstrap";
import { HeartStraight, TShirt, Truck } from "phosphor-react";
import ProductAccordion from "./ProductAccordion";
import BreadcrumbComp from "../../components/BreadcrumbComp";
import AddToCart from "../../components/AddToCart";

const thumbnailSrc = "thumbnailSrc";
const imgSrc = "imgSrc";
const productSize = "productSize";

const reducer = (productState, action) => {
  // Logic for the product images
  switch (action.type) {
    case thumbnailSrc:
      return {
        ...productState,
        thumbnailSrc: productState.imgSrc.imgPrd,
      };

    case imgSrc:
      return {
        ...productState,
        imgSrc: PRODUCTS[action.itemId].nestedImgs[action.payload],
      };

    case productSize:
      return {
        ...productState,
        productSize: PRODUCTS[action.itemId].sizes[action.payload],
      };

    default:
      throw new Error();
  }
};

const SingleProduct = () => {
  const { id } = useParams();
  const { state, products, getSingleProduct } = useProductContext();
  const { nestedImgs } = products[id];
  const { singleProduct } = state;
  useEffect(() => {
    getSingleProduct(products[id]);
  }, []);

  const { productName, price, stock } = singleProduct;

  const [productState, dispatch] = useReducer(reducer, {
    // default values of each one
    thumbnailSrc: products[id].productImage,
    imgSrc: products[id].nestedImgs[0],
  });

  // this function will be executed when the thumbnail is changed
  const handleClick = (index) => {
    // when i click on any image inside the single product page will update the source of the thumbnail image instead of the previous source

    dispatch({ type: imgSrc, itemId: id, payload: index });
    dispatch({ type: thumbnailSrc, payload: id });
  };

  return (
    <div className="prdct">
      <BreadcrumbComp children={productName} />

      {/* product images */}
      <Row>
        <Col lg={6} md={8} sm={12}>
          <div className="productImages">
            <div className="thumbnail">
              <img
                className="imgPreview"
                src={productState.thumbnailSrc}
                alt=""
              />
            </div>

            <div className="imgs">
              {nestedImgs.map((nestedImg, i) => {
                return (
                  <img
                    className={productState.imgSrc.id === i ? "imgClicked" : ""}
                    src={nestedImg.imgPrd}
                    alt=""
                    key={i}
                    onClick={() => handleClick(i)}
                  />
                );
              })}
            </div>
          </div>
        </Col>
        {/* product data */}
        <Col lg={6} md={4} sm={12}>
          <div className="productInfo">
            <div className="productDescription">
              <span className="brand-copyright">EMPOWR &copy;</span>

              <h1 className="productTitle m-0">{productName}</h1>
              <p className="productPrice m-0">
                {<FormatPrice price={price} />}
              </p>
            </div>

            <form>
              <div className="addToCartSection">
                {stock > 0 ? (
                  <AddToCart product={singleProduct} />
                ) : (
                  <>
                    <Button variant="outline-warning" className="soldOutBtn">
                      Sold Out
                    </Button>
                    <small className="text-danger text-center">
                      the product {productName} is sold out.
                    </small>
                  </>
                )}
              </div>
            </form>

            {/* product details */}
            <div className="productsAccordion">
              <ProductAccordion
                iconAcc={<TShirt weight="bold" size={22} color="#ffffff" />}
                labelAcc="Materials"
                bodyAcc="100% COTTON"
                eventKey="0"
              />

              <ProductAccordion
                iconAcc={<Truck weight="bold" size={22} color="#ffffff" />}
                labelAcc="Shipping & Returns"
                bodyAcc="In most cases, the time will take one to 
                three days, except for official holidays and weekends, 
                and we will make sure that the order reaches you as
                soon as possible."
                eventKey="1"
              />

              <ProductAccordion
                iconAcc={
                  <HeartStraight weight="bold" size={22} color="#ffffff" />
                }
                labelAcc="Care Instructions"
                bodyAcc="Do Not Use Bleach"
                eventKey="2"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SingleProduct;
