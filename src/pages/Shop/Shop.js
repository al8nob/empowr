import React from "react";
import { useProductContext } from "../../context/ShopContext";
import ShopItem from "./ShopItem";
import "./Shop.css";
import { Link } from "react-router-dom";
import BreadcrumbComp from "../../components/BreadcrumbComp";

const Shop = () => {
  const { products } = useProductContext();

  return (
    <div className="shop">
      <BreadcrumbComp children="Products" />

      <div className="shopTitle">
        <h1>All Products</h1>
      </div>
      <div className="shopItems">
        {products.map((product) => {
          return (
            <Link
              className="text-decoration-none text-light"
              key={product.id}
              to={"/product-view/" + product.id}
            >
              <ShopItem product={product} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
