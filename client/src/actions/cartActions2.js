import axios from 'axios';
import { selectCartItems } from '../reducer/cartSelectors';
import CartActionTypes from './cartTypes'

export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});

//se incluiran los productos por default en el user 1.. hasta que se 
//configure el sign up de users
export function addItem(item) {
	console.log('accioname el ' , item)
	if(!item.quantity){ 
	return function(dispatch) {
		return axios
		.post('http://localhost:3000/users/1/cart', {
			idProduct   : item.id,  
			price       : item.price,
			units       : 1
		})
		.then((res) => {
				console.log('RESPUESTA', res.data);
				dispatch({ type: CartActionTypes.ADD_ITEM, payload: item });
			})
			.catch((e) => console.log('error auxilio', e));
	}
	}
	else{
		return function(dispatch) {
			return axios
			.put('http://localhost:3000/users/1/cart', {
				idProduct   : item.id,  
				price       : item.price,
				units       : item.quantity + 1 
			})
			.then((res) => {
					console.log('RESPUESTA', res.data);
					dispatch({ type: CartActionTypes.ADD_ITEM, payload: item });
				})
				.catch((e) => console.log('error auxilio', e));
		}	
	}
}

  
/*   export const clearItemFromCart = item => ({
	type: CartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item
  }); */

/*   export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})
 */



export function clearItemFromCart(item) {
	return function(dispatch) {
		return axios
			.delete('http://localhost:3000/users/1/cart/' + item.id)
			.then((res) => {
				dispatch({ type: CartActionTypes.CLEAR_ITEM_FROM_CART, payload: item });
			})
			.catch((e) => console.log('error auxilio delete product'));
	};
}

export function removeItem(item) {
	if( item.quantity === 1) {
		return function(dispatch) {
			return axios
				.delete('http://localhost:3000/users/1/cart/' + item.id)
				.then((res) => {
					dispatch({ type: CartActionTypes.CLEAR_ITEM_FROM_CART, payload: item });
				})
				.catch((e) => console.log('error auxilio delete product'));
		}
	}
	else{
		return function(dispatch) {
			return axios
			.put('http://localhost:3000/users/1/cart', {
				idProduct   : item.id,  
				price       : item.price,
				units       : item.quantity
			})
			.then((res) => {
				dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: item });
			})
			.catch((e) => console.log('error auxilio'));
		}	
	}
}

