import axios from 'axios';
import CartActionTypes from './cartTypes';

export const toggleCartHidden = () => ({
	type : CartActionTypes.TOGGLE_CART_HIDDEN
});

//se incluiran los productos por default en el user 1.. hasta que se
//configure el sign up de users
export function addItem ({ product, ip }) {
	// if (!user) {
	//   return dispatch({ type: CartActionTypes.ADD_ITEM_GUEST, payload: item });
	// }

	//console.log('accioname el ', item);
	console.log('producto', product, 'ip', ip);
	if (!product.quantity) {
		return function (dispatch) {
			return axios
				.post('http://localhost:3000/users/1/cart', {
					idProduct : product.id,
					price     : product.price,
					units     : 1,
					ip        : ip
				})
				.then((res) => {
					console.log('RESPUESTA', res.data);
					dispatch({ type: CartActionTypes.ADD_ITEM, payload: product });
				})
				.catch((e) => console.log('error auxilio', e));
		};
	}
	else {
		return function (dispatch) {
			return axios
				.put('http://localhost:3000/users/1/cart', {
					idProduct : product.id,
					price     : product.price,
					units     : product.quantity + 1,
					ip        : ip
				})
				.then((res) => {
					console.log('RESPUESTA', res.data);
					dispatch({ type: CartActionTypes.ADD_ITEM, payload: product });
				})
				.catch((e) => console.log('error auxilio', e));
		};
	}
}

export function clearItemFromCart ({ product, ip }) {
	return function (dispatch) {
		return axios
			.delete('http://localhost:3000/users/1/cart/' + product.id + '/' + ip)
			.then((res) => {
				dispatch({ type: CartActionTypes.CLEAR_ITEM_FROM_CART, payload: product });
			})
			.catch((e) => console.log('error auxilio delete product'));
	};
}

export function removeItem ({ product, ip }) {
	console.log('llega producto', product, 'con ip', ip);
	if (product.quantity === 1) {
		return function (dispatch) {
			return axios
				.delete('http://localhost:3000/users/1/cart/' + product.id + '/' + ip)
				.then((res) => {
					dispatch({
						type    : CartActionTypes.CLEAR_ITEM_FROM_CART,
						payload : product
					});
				})
				.catch((e) => console.log('error auxilio delete product'));
		};
	}
	else {
		return function (dispatch) {
			return axios
				.put('http://localhost:3000/users/1/cart', {
					idProduct : product.id,
					price     : product.price,
					units     : product.quantity,
					ip        : ip
				})
				.then((res) => {
					dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: product });
				})
				.catch((e) => console.log('error auxilio'));
		};
	}
}

export function relateCartToUser (user) {

	return function (dispatch) {
		return axios
			.put('http://localhost:3000/users/' + user.id + '/checkout', {
				id : user.id
			})
			.then((res) => {
			
				dispatch({
					type    : 'RELATE_CART_TO_USER',
					payload : res.data
				});
			})
			.catch((e) => console.log('error auxilio relateCartToUser'));
	};
}
