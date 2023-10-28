const increment = "increment";
const decrement = "decrement";
const removeItem = "removeItem";

const isLoading = "SET_LOADING";
const setApiData = "SET_API_DATA";
const isError = "API_ERROR";
const setSingleLoading = "SET_SINGLE_LOADING";
const setSingleProduct = "SET_SINGLE_PRODUCT";
const singleError = "SINGLE_ERROR";

const reducer = (state, action) => {
  switch (action.type) {
    // Logic for {adding, removing, deleting} items in the cart
    case increment:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload]: state.cartItems[action.payload] + 1,
        },
      };
    case decrement:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload]: state.cartItems[action.payload] - 1,
        },
      };
    case removeItem:
      return {
        ...state,
        cartItems: { ...state.cartItems, [action.payload]: 0 },
      };

    default:
      throw new Error();
  }
};

const productReducer = (state, action) => {
  switch (action.type) {
    case isLoading:
      return {
        ...state,
        isLoading: true,
      };

    case setApiData:
      const featureData = action.payload.filter((item) => {
        return item.featured === true;
      });
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        featureProducts: featureData,
      };

    case isError:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case setSingleLoading:
      return {
        ...state,
        isSingleLoading: true,
      };

    case setSingleProduct:
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case singleError:
      return {
        ...state,
        isSingleLoading: false,
        isLoading: true,
      };
    default:
      return state;
  }
};

export {
  reducer,
  productReducer,
  increment,
  decrement,
  removeItem,
  setSingleLoading,
  setSingleProduct,
  singleError,
};
