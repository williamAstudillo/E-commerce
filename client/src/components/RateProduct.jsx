import React, { useState, useEffect, Fragment } from 'react';
import './RateProduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Container, ListGroup, Row, Col, Badge } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { postReviewId } from '../actions/actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { productDetail } from '../actions/actions';

const RateProduct = ({ match, postReviewId, productDetail, product }) => {
	const [ score, setScore ] = useState(0);
	const [ review, setReview ] = useState();
	const [ producto, setProducto ] = useState('');

	var value = 0;

	const handleChange = (e) => {
		if (e.target.name === 'rating') {
			setScore(e.target.value);
		} else {
			setReview(e.target.value);
		}
		//console.log(e.target.name);
	};

	useEffect(
		() => {
			if (!producto) {
				console.log('entra al use effect');
				productDetail(match.params.idProduct);
				setProducto(product);
			}
		},
		[ product ]
	);

	const submitResponse = () => {
		const payload = {
			id          : match.params.idProduct,
			rating      : score,
			description : review,
			idUser      : match.params.idUser
		};

		postReviewId(payload);
		Swal.fire({
			title             : 'Calificacion Agregada',
			//text              : userInput.message,
			icon              : 'success',
			showConfirmButton : false,
			timer             : 1500
		}).then(() => {
			window.location = '/myorders';
		});
		//alert('Producto agregado correctamente');
	};

	return (
		<Fragment>
			{/* <image src={producto.images} alt={producto.name}  /> */}
			<br />
			{/* 	<Col md={6}>
                    <Image src={producto.images} alt={producto.name} fluid />
					</Col>
					<Col md={3}>
                    <ListGroup variant='flush'>
					<ListGroup.Item>
					<h3>{producto.name}</h3>
					
					</ListGroup.Item>
					<ListGroup.Item>
					Price: ${producto.price}
					</ListGroup.Item>
					<ListGroup.Item>
					Description: {producto.description}
					</ListGroup.Item>
                    </ListGroup>
					</Col>
					<Col md={3}>
					
					</Col>
				*/}
			<Container>
				<h3 className="productNameReview">{product.name}</h3>
				<Row>
					<Col className="imageContainer" md={6}>
						<img className="imagen" src={product.images} alt={product.name} fluid />
						<br />
						<hr />
					</Col>
					<Col md={6}>
						<label for="ratingText">
							<h2 className="ratingTitle">Tell us about your experience with the product</h2>
						</label>
						<Input
							id="rating"
							type="textarea"
							className="textAreaReview"
							onChange={handleChange}
							name="ratingText"
						/>

						<div className="rating">
							<input id="rating-5" type="radio" onChange={handleChange} name="rating" value="5" />
							<label for="rating-5">
								<i class="fas fa-3x fa-star" />
								<Badge color="success" pill>
									Excellent
								</Badge>
							</label>
							<input id="rating-4" type="radio" onChange={handleChange} name="rating" value="4" />
							<label for="rating-4">
								<i class="fas fa-3x fa-star" />
							</label>
							<input id="rating-3" type="radio" onChange={handleChange} name="rating" value="3" />
							<label for="rating-3">
								<i class="fas fa-3x fa-star" />
								<Badge color="warning" pill>
									Regular
								</Badge>
							</label>
							<input id="rating-2" type="radio" onChange={handleChange} name="rating" value="2" />
							<label for="rating-2">
								<i class="fas fa-3x fa-star" />
							</label>
							<input id="rating-1" type="radio" onChange={handleChange} name="rating" value="1" />
							<label for="rating-1">
								<i class="fas fa-3x fa-star" />
								<Badge color="danger" pill>
									Poor
								</Badge>
							</label>
						</div>

						<button className="createReview" onClick={submitResponse} disabled={score === 0}>
							Send Review
						</button>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = ({ products: { product } }) => ({
	product
});

const mapDispatchToProps = (dispatch) => ({
	postReviewId  : (payload) => dispatch(postReviewId(payload)),
	productDetail : (id) => dispatch(productDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RateProduct);
