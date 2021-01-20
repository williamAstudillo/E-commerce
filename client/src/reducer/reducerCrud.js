const initialState = {
	products      : [],
	categories    : [],
	product       : {},
	catFilter     : [],
	searchResults : [],
	reviews       : []
};

export default function product(state = initialState, action) {
	switch (action.type) {
		case 'ADD_PRODUCT':
			var obj = {
				id          : action.payload.id,
				name        : action.payload.name,
				description : action.payload.description,
				price       : action.payload.price,
				stock       : action.payload.stock,
				images      : action.payload.images,
				categories  : []
			};
			return {
				...state,
				products : state.products.concat(obj)
			};
		case 'GET_PRODUCT':
			return {
				...state,
				products : action.payload
			};
		case 'PUT_PRODUCT':
			var aux2=0
			var aux=state.products.map((e,i)=>{
			
				if(e.id===action.payload[0].id){
					aux2=i
				}
			})
			state.products[aux2].images=action.payload[0].images
			state.products[aux2].id=action.payload[0].id
			state.products[aux2].name=action.payload[0].name
			state.products[aux2].descrption=action.payload[0].descrption
			state.products[aux2].price=action.payload[0].price
			state.products[aux2].stock=action.payload[0].stock
			return {
				...state,
				products:state.products
			};
		/*    case "PAGINATE_PRODUCTS":
            return {
                ...state,
                products: action.payload
                
            } */
		case 'GET_PRODUCT_DETAIL':
			return {
				...state,
				product : action.payload
			};
		case 'SEARCH_PRODUCT':
			return {
				...state,
				searchResults : action.payload
			};
		case 'FILTER_PRODUCT':
			return {
				...state,
				catFilter : action.payload
			};
		case 'DELETE_PRODUCT':
			return {
				...state,
				products : state.products.filter((x) => x.id !== action.payload)
			};
		case 'ADD_CATEGORY':
			return {
				...state,
				categories : state.categories.concat(action.payload)
			};
		case 'GET_CATEGORY':
			return {
				...state,
				categories : action.payload
			};
		case 'PUT_CATEGORY':
			for (let i = 0; i < state.categories.length; i++) {
				if (action.payload.id === state.categories[i].id) {
					state.categories[i].name = action.payload.name;
					state.categories[i].description = action.payload.description;
				}
			}
			return { ...state };

		case 'DELETE_CATEGORY':
			return {
				...state,
				categories : state.categories.filter((x) => x.id !== action.payload)
			};
		case 'POST_CATEGORY_PRODUCT':
			var findC = state.categories.find((x) => x.id === action.payload[0].categoryId);
			var arr = state.products;
			arr.map((x) => {
				if (x.id === action.payload[0].productId) {
					x.categories.push(findC);
				}
			});
			return {
				...state,
				products : arr
			};
		case 'DELETE_CATEGORY_PRODUCT':
			var arr = state.products;
			arr.map((x) => {
				if (x.id === action.payload.productId) {
					for (let i = 0; i < x.categories.length; i++) {
						if (x.categories[i].id === action.payload.categoryId) {
							x.categories.splice(i, 1);
						}
					}
				}
			});
			return {
				...state,
				products : arr
			};
		case 'GET_REVIEWS_ID':
			return {
				...state,
				reviews : action.payload
			};
		case 'POST_REVIEW_ID':
			console.log(('posteo', action.payload));
			return {};

		default:
			return state;
	}
}
