const initialState = {
	orders : '',
	pago   : ''
};
export default function orders (state = initialState, action) {
	switch (action.type) {
		case 'SEARCH_ORDERS':
			return {
				...state,
				orders : action.payload
			};
		case 'PLACE_ORDER':
			return {
				...state
			};
		case 'MERCADO_PAGO':
			return {
				...state,
				pago : action.payload
			};
		default:
			return state;
	}
}
