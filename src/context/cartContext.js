import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import { toast } from "react-toastify";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("userCart");
  if (localCartData === null) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  // if the userCart is empty array will return it, else will return the data inside the array
  cart: getLocalCartData(),
  totalItems: "",
  totalPrice: "",
  // depend on the delivery company fees ( 7DT )
  shippingFee: 7.0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add item to the cart
  const addToCart = (id, size, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, size, amount, product } });
  };

  // increment & decrement

  const incAmount = (id) => {
    dispatch({ type: "INC_AMOUNT", payload: id });
  };

  const decAmount = (id) => {
    dispatch({ type: "DEC_AMOUNT", payload: id });
  };

  // remove item from the cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const msgAlertWarning = () => {
    toast.error("select the size!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // add the data to localStorage
  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEMS_PRICE" });
    localStorage.setItem("userCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        msgAlertWarning,
        incAmount,
        decAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
