import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { addItem } from '../actions/cartActions';
//import { getReviewsId } from '../actions/actions'
import Rating from './Rating';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';
import './Product.css';
import publicIP from 'react-native-public-ip';

const Product = ({ product, addItem, cartItems /* , reviews, getReviewsId  */ }) => {
	const { id, images, name, category, description, price, users } = product;
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === id);

	//   const [ arrayReviews, setarrayReviews ] = useState([]);
	const [score, setScore] = useState(0);
	const [cantReviews, setCantReviews] = useState(0);
	const [ip, setIp] = useState(null)
	//   var score=0;

	useEffect(() => {
		//if(!users){
		if (users && product) {
			var temporal = 0;
			for (let i = 0; i < users.length; i++) {
				temporal = temporal + users[i].reviews.rating;
			}
			temporal = temporal / users.length;
			setScore(temporal);
			setCantReviews(users.length);
		}
		if (!ip) {
			publicIP().then(ipaddress => {
				setIp(ipaddress);
				console.log(ip)
			})
				.catch(error => {
					console.log(error);

				});
		}
	}, [users, ip]);

	if (existingCartItem) {
		//si el item ya existe envio producto con cantidad+1
		product = {
			...product,
			quantity: existingCartItem.quantity
		};
	}

	return (
		<div className="card">
			<Link className="nodeco" to={`/product/${id}`} style={{ textDecoration: 'none' }}>
				<img src={images} />
				<h3>{name}</h3>
			</Link>
			{/* <Rating className="stars" value={score} text={`${cantReviews} reviews`} />
			<h4>{category}</h4> */}
			<p>{description}</p>
			<h2>${price}</h2>

			{console.log("ip", ip)}
			<button id={product.stock === 0 ? 'disabledButton' : 'addToCartButton'} type='button' onClick={() => addItem({ product: product, ip: ip })} disabled={product.stock < 1}>
				Add To Cart
			</button>
		</div>
	);
};

const mapStateToProps = ({ cart: { cartItems } /* , products: {reviews} */ }) => ({
	cartItems
	//  reviews
});

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItem(item))
	//    getReviewsId:(id) =>dispatch(getReviewsId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
