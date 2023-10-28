import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import PRODUCTS from "../Products";
import {
  reducer,
  productReducer,
  increment,
  decrement,
  removeItem,
} from "../reducer/productReducer.js";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};

  for (let i = 0; i < PRODUCTS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const ShopContextProvider = ({ children }) => {
  const [state, updateState] = useReducer(productReducer, initialState);

  // main array of objects [ contain all the products ]
  const [products, setProducts] = useState(PRODUCTS);

  // main object of cart items inside the cart
  const [cart, dispatch] = useReducer(reducer, {
    cartItems: getDefaultCart(),
  });

  // 1st call api for products
  const getProducts = (api) => {
    updateState({ type: "SET_LOADING" });
    try {
      updateState({ type: "SET_API_DATA", payload: api });
    } catch (error) {
      updateState({ type: "API_ERROR" });
    }
  };

  // 2nd call api for single product
  const getSingleProduct = (singleProductApi) => {
    updateState({ type: "SET_SINGLE_LOADING" });
    try {
      updateState({ type: "SET_SINGLE_PRODUCT", payload: singleProductApi });
    } catch (error) {
      updateState({ type: "SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(products);
  }, []);

  // this function to get the total of cart items inside the cart page
  const getTotalCartItems = () => {
    let totalCartItems = 0;
    for (const prdct in cart.cartItems) {
      PRODUCTS.find((product) => product.id === prdct);
      totalCartItems += cart.cartItems[prdct];
    }
    return totalCartItems;
  };

  // this function will return the total amount of items inside the cart
  const gettotalPriceCart = () => {
    let totalPrice = 0;

    for (const itemId in cart.cartItems) {
      if (cart.cartItems[itemId] > 0) {
        let itemInfo = products.find(
          (product) => product.id === Number(itemId)
        );

        // totalPrice = totalPrice + cartItems[itemId] * itemInfo.price
        totalPrice += cart.cartItems[itemId] * itemInfo.price;
      }
    }
    return totalPrice;
  };

  // addToCart function to add an item inside the cart with the quantity of the item
  const addToCart = (itemId) => {
    dispatch({ type: increment, payload: itemId });
    console.log("Added");
  };

  // addToCart function to remove an item inside the cart
  const removeFromCart = (itemId) => {
    dispatch({ type: decrement, payload: itemId });
    console.log("Removed");
  };

  // deleteFromCart function to delete an item from the cart
  const deleteFromCart = (itemId) => {
    dispatch({ type: removeItem, payload: itemId });
    console.log("Deleted");
  };

  const contextValues = {
    products,
    cart,
    state,
    setProducts,
    getTotalCartItems,
    gettotalPriceCart,
    getSingleProduct,
    addToCart,
    removeFromCart,
    deleteFromCart,
  };
  return (
    <ShopContext.Provider value={contextValues}>
      {children}
    </ShopContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ShopContext);
};

export default ShopContextProvider;
