import axios from 'axios';

export function addProduct(payload) {
	return function(dispatch) {
		return axios
			.post('http://localhost:3000/products', payload)
			.then((res) => {
				
				dispatch({ type: 'ADD_PRODUCT', payload: res.data });
			})
			.catch((e) => console.log('error auxilio'));
	};
}

export function getProduct() {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/products')
			.then((res) => {
				dispatch({ type: 'GET_PRODUCT', payload: res.data });
			})
			.catch((e) => console.log('error auxilio get product'));
	};
}
export function putProduct(payload) {
	return function(dispatch) {
		var convertedJSON = {};
		payload.forEach((value, key) => (convertedJSON[key] = value));
		return axios
			.post('http://localhost:3000/products/' + convertedJSON.id, payload)
			.then((res) => {
				
				dispatch({
					type    : 'PUT_PRODUCT',
					payload : res.data
				});
			})
			.catch((e) => console.log('error auxilio put product'));
	};
}

/* export function paginateProducts() {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/products')
			.then((res) => {
				const slice = res.data.slice(offset, offset + perPage)
                const postData = slice.map(pd => <div key={pd.id}>
                    <p>{pd.title}</p>
                    <img src={pd.thumbnailUrl} alt=""/>
                </div>)
                setData(postData)
                setPageCount(Math.ceil(data.length / perPage))
			})
			.then((res) => {
				dispatch({ type: 'PAGINATE_PRODUCTS', payload: res.data });
			})
			.catch((e) => console.log('error auxilio get product'));
	};
} */

export function searchProduct(valor) {
	return function(dispatch) {
		return axios
			.get(`http://localhost:3000/search?query=${valor}`)
			.then((res) => {
				console.log('que me responde la accion---------->', res);
				dispatch({ type: 'SEARCH_PRODUCT', payload: res.data });
			})
			.catch((e) => console.log('error auxilio search product'));
	};
}

export function filterProduct(categ) {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/products/category/' + categ)
			.then((res) => {
				console.log('actions filterproduct     :::',res.data)
				dispatch({ type: 'FILTER_PRODUCT', payload: res.data });
			})
			.catch((e) => console.log('error auxilio get categfilter'));
	};
}

export function productDetail(id) {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/products/' + id)
			.then((res) => {
				console.log('DETAIL', res);
				dispatch({ type: 'GET_PRODUCT_DETAIL', payload: res.data });
			})
			.catch((e) => console.log('error auxilio get categfilter'));
	};
}

export function deleteProduct(id) {
	return function(dispatch) {
		return axios
			.delete('http://localhost:3000/products/' + id)
			.then((res) => {
				dispatch({ type: 'DELETE_PRODUCT', payload: id });
			})
			.catch((e) => console.log('error auxilio delete product'));
	};
}
export function addCategory(payload) {
	return function(dispatch) {
		return axios
			.post('http://localhost:3000/products/category', {
				name        : payload.name,
				description : payload.description
			})
			.then((res) => {
				dispatch({ type: 'ADD_CATEGORY', payload: res.data });
			})
			.catch((e) => console.log('error auxilio add category'));
	};
}
export function getCategory() {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/products/category')
			.then((res) => {
				dispatch({ type: 'GET_CATEGORY', payload: res.data });
			})
			.catch((e) => console.log('error auxilio add category'));
	};
}

export function deleteCategory(id) {
	console.log('delete');
	return function(dispatch) {
		return axios
			.delete('http://localhost:3000/products/category/' + id)
			.then((res) => {
				dispatch({ type: 'DELETE_CATEGORY', payload: id });
			})
			.catch((e) => console.log('error auxilio delete product'));
	};
}

export function putCategory(payload) {
	return function(dispatch) {
		return axios
			.put('http://localhost:3000/products/category/' + payload.id, {
				name        : payload.name,
				description : payload.description
			})
			.then((res) => {
				console.log(res.data);
				dispatch({ type: 'PUT_CATEGORY', payload: res.data[0] });
			})
			.catch((e) => console.log('error auxilio delete product'));
	};
}
export function postCategoryProduct(payload) {
	return function(dispatch) {
		return axios
			.post(`http://localhost:3000/products/${payload.a}/category/${payload.b}`)
			.then((res) => {
				dispatch({ type: 'POST_CATEGORY_PRODUCT', payload: res.data });
			})
			.catch((e) => console.log('error auxilio post product category'));
	};
}
export function deleteCategoryProduct(payload) {
	return function(dispatch) {
		return axios
			.delete(`http://localhost:3000/products/${payload.a}/category/${payload.b}`)
			.then((res) => {
				console.log(res.data);
				dispatch({ type: 'DELETE_CATEGORY_PRODUCT', payload: res.data });
			})
			.catch((e) => console.log('error auxilio post product category'));
	};
}

export function getUsers() {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/users')
			.then((res) => {
				dispatch({ type: 'GET_USERS', payload: res.data });
			})
			.catch((error) => console.error('error ', error));
	};
}

export function addUser(payload) {
	return function(dispatch) {
		return axios
			.post('http://localhost:3000/users', {
				first_name       : payload.first_name,
				last_name        : payload.last_name,
				email            : payload.email,
				country          : payload.country,
				city             : payload.city,
				shipping_address : payload.shipping_address,
				password         : payload.password
			})
			.then((res) => {
				dispatch({ type: 'ADD_USER', payload: res.data });
			})
			.catch((error) => console.log('error ', error.response.data));
	};
}

export function updateUser(payload) {
	return function(dispatch) {
		var convertedJSON = {};
		payload.forEach((value, key) => (convertedJSON[key] = value));
		return axios
			.post(`http://localhost:3000/users/${convertedJSON.id}`, payload)
			.then((res) => {
				console.log('res', res);
				//console.log('data', res.data);
				dispatch({ type: 'UPDATE_USER', payload: res.data });
			})
			.catch((error) => console.error('error ', error));
	};
}

export function deleteUser(payload) {
	return function(dispatch) {
		return axios
			.delete(`http://localhost:3000/users/${payload}`)
			.then((res) => {
				dispatch({ type: 'DELETE_USER', payload: res.data });
			})
			.catch((error) => console.error('error ', error));
	};
}

export function getOrders() {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/orders')
			.then((res) => {
				dispatch({ type: 'GET_ORDERS', payload: res.data });
				console.log(res.data);
			})
			.catch((error) => console.error('error ', error));
	};
}

export function getReviewsId(id) {
	return function(dispatch) {
		return axios
			.get('http://localhost:3000/products/' + id + '/review')
			.then((res) => {
				dispatch({ type: 'GET_REVIEWS_ID', payload: res.data });
				console.log('respuesta GetReviewsAction', res.data);
			})
			.catch((error) => console.error('error ', error));
	};
}

export function postReviewId(payload) {
	console.log('info entrando al action', payload);
	return function(dispatch) {
		return axios
			.post('http://localhost:3000/products/' + payload.id + '/review', {
				rating      : payload.rating,
				description : payload.description,
				idUser      : payload.idUser
			})
			.then((res) => {
				dispatch({ type: 'POST_REVIEW_ID', payload: payload });
				console.log('respuesta GetReviewsAction', res.data);
			})
			.catch((error) => console.error('error ', error));
	};
}

export function userResetPassword(payload) {
	return function(dispatch) {
		return axios
			.post(`http://localhost:3000/users/${payload.id}/passwordReset`, {
				password : payload.password
			})
			.then((res) => {
				dispatch({ type: 'RESET_PASSWORD', payload: res.data });
			})
			.catch((error) => console.error('error ', error));
	};
}
