// rootReducer.js
import { combineReducers } from 'redux';
import cartReducer from './reducer'; // Ensure the correct path

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
