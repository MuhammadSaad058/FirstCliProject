// cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_USER_DATA,
} from "./constants";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart
      const isAlreadyInCart = state.cart.some(
        (item) => item.id === action.payload.id
      );
      if (isAlreadyInCart) {
        alert("Product is already in the cart!");
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case SET_USER_DATA:
      return {
        ...state,
        cart: action.data,
      };

    default:
      return state;
  }
};

export default cartReducer;
