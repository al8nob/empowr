import { toast } from "react-toastify";

const msgAlertSuccess = (message) => {
  return toast.success(message, {
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

const msgAlertError = (message) => {
  return toast.error(message, {
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

const cartReducer = (state, action) => {
  // adding items to the cart logic
  if (action.type === "ADD_TO_CART") {
    let { id, size, amount, product } = action.payload;

    // handling the existing product inside the cart
    // search algorithm:
    // used to find specific items in a set of data.
    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + size
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + size) {
          let newAmount = curElem.amount + amount;
          let newStockAmount = curElem.stock - amount;

          if (curElem.amount >= curElem.max) {
            msgAlertError("You reach the maximum quantity.");
          } else {
            msgAlertSuccess("Product added to your cart");
          }

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          if (newStockAmount < 1) {
            newStockAmount = 0;
          }

          return {
            ...curElem,
            amount: newAmount,
            stock: newStockAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      msgAlertSuccess("Product added to your cart");
      let cartProduct = {
        id: id + size,
        name: product.productName,
        price: product.price,
        size,
        amount,
        image: product.productImage,
        max: product.stock,
        stock: product.stock - amount,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // decrease the quantity of the item logic
  if (action.type === "DEC_AMOUNT") {
    // looping over the cart items that matches with the action.payload (id)
    // and decrease the amount of the item
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let newAmountItem = curElem.amount - 1;
        let newStockAmount = curElem.stock + 1;

        if (newAmountItem <= 1) {
          newAmountItem = 1;
        }

        if (newStockAmount <= curElem.max) {
          newStockAmount = curElem.max - 1;
        }

        return {
          ...curElem,
          amount: newAmountItem,
          stock: newStockAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  // increase the quantity of the item logic
  if (action.type === "INC_AMOUNT") {
    // looping over the cart items that matches with the action.payload (id)
    // and increase the amount of the item
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let newAmountItem = curElem.amount + 1;
        let newStockAmount = curElem.stock - 1;

        if (newAmountItem >= curElem.max) {
          newAmountItem = curElem.max;
        }
        if (newStockAmount <= 0) {
          newStockAmount = 0;
        }

        if (curElem.amount >= curElem.max) {
          msgAlertError("You reach the maximum quantity.");
        } else {
          msgAlertSuccess("Product added to your cart");
        }

        return {
          ...curElem,
          amount: newAmountItem,
          stock: newStockAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  // remove the item from the cart logic
  if (action.type === "REMOVE_ITEM") {
    // this is will create a new array with only elements that passes the condition inside the provided function
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  // calculating the total items and price inside the cart logic
  if (action.type === "CART_TOTAL_ITEMS_PRICE") {
    let { totalItems, totalPrice } = state.cart.reduce(
      (initialValue, curElem) => {
        let { price, amount } = curElem;
        initialValue.totalItems += amount;
        initialValue.totalPrice += price * amount;
        // initialValue = initialValue + ( price * amount )
        // 0 + (89 x 3) = 267
        // initialValue = 267
        return initialValue;
      },
      {
        totalItems: 0,
        totalPrice: 0,
      }
    );
    return {
      ...state,
      totalItems,
      totalPrice,
    };
  }

  return state;
};

export default cartReducer;
