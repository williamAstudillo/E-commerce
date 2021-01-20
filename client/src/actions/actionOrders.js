import axios from 'axios';

export function userOrders (payload) {
	return function (dispatch) {
		return axios
			.get('http://localhost:3000/orders/user/' + payload.id)
			.then((res) => {
				console.log(res.data);
				dispatch({ type: 'SEARCH_ORDERS', payload: res.data });
			})
			.catch((err) => {
				console.log('error auxilio user orders ');
			});
	};
}

export function placeOrder (payload) {
	return function (dispatch) {
		return axios
			.put('http://localhost:3000/orders/procesar/' + payload.id, {
				status  : 'procesando',
				city    : payload.city,
				address : payload.shippingAddress,
				mail    : payload.mail
			})
			.then((res) => {
				console.log(res.data);
				dispatch({ type: 'PLACE_ORDER', payload: res.data });
			})
			.catch((err) => {
				console.log('error auxilio user orders ');
			});
	};
}

export function setComplete (payload) {
	return function (dispatch) {
		return axios
			.put('http://localhost:3000/orders/' + payload.id, {
				status : payload.status
			})
			.then((res) => {
				console.log(res.data);
				dispatch({ type: 'PLACE_ORDER', payload: res.data });
			})
			.catch((err) => {
				console.log('error auxilio user orders ');
			});
	};
}

export function orderMercadoPago (payload) {
	return function (dispatch) {
		return axios
			.post('http://localhost:3000/orders/mercadoPago/', {
				paymentMethod     : payload.paymentMethod,
				payerFirstName    : payload.payerFirstName,
				payerLastName     : payload.payerLastName,
				payerEmail        : payload.payerEmail,
				docType           : payload.docType,
				docNumber         : payload.docNumber,
				transactionAmount : payload.transactionAmount
			})
			.then((res) => {
				console.log(res.data);
				dispatch({ type: 'MERCADO_PAGO', payload: res.data });
			})
			.catch((err) => {
				console.log('error auxilio user orders ');
			});
	};
}
