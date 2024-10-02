// actions.js
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART,USER_LIST } from './constants';

// Action to add an item to the cart
export const AddToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

// Action to remove a specific item from the cart
export const RemoveFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

// Action to clear the entire cart
export const ClearCart = () => ({
  type: CLEAR_CART,
});
export function getUserList() {
  return {
    type: USER_LIST,
  };
}