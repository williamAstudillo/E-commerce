const initialState = {
	users   : [],
	message : '',
	orders  : []
};

export default function todos(state = initialState, action) {
	switch (action.type) {
		case 'GET_USERS':
			return {
				...state,
				users : action.payload
			};
		case 'ADD_USER':
			return {
				...state,
				message : action.payload
			};
		case 'UPDATE_USER':
			return {
				...state,
				message : action.payload
			};
		case 'DELETE_USER':
			return {
				...state,
				message : action.payload
			};
		case 'GET_ORDERS':
			return {
				...state,
				orders : action.payload
			};
		case 'RESET_PASSWORD':
			return {
				...state,
				message : action.payload
			};
		default:
			return state;
	}
}
