import CartActionTypes from '../actions/cartTypes';
import { addItemToCart, removeItemFromCart } from './cartUtils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  orders: '',
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload), // vamos a usar una funcion que definimos en cartUtils
      };
    case CartActionTypes.REMOVE_ITEM: // esto recibe un payload desde las acciones que trae el item que queremos remover
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload), // vamos a usar una fuincion que definimos en cartUtils
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case 'RELATE_CART_TO_USER':
      return {
        ...state,
        cartItems: [],
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
