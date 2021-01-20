import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/product';
//import products from '../products';
import './HomeScreen.css';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const getCategories = () => {
	return fetch('http://localhost:3000/products/category', {
		method: 'GET'
	}).then(res => {
		return res.json()
	}).catch(err => console.log(err))
}

export const getProducts = () => {
	return fetch('http://localhost:3000/products', {
		method: 'GET'
	}).then(res => {
		return res.json()
	}).catch(err => console.log(err))
}



const CatalogScreen = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false)

	useEffect(()=> {
		getProducts().then(result => {
			console.log('que hay en la data', result)
			if (result.error) {
				setError(result.error)
			} else {
				setProducts(result)
			}
		})
	}, [] )
	
		

		
	
	
	return (
		<div>
			<h1>Catalog</h1>
			<Row>
				<Col md={3}>
					<h1>Busca por Categoria</h1>
					<ListGroup variant="flush">						
						{categories.map((category) => {
							
							return (
								<ListGroup.Item>
									<Link to={`/catalog/${category}`}>
										<p>{category}</p>
									</Link>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Col>
				<Col md={9}>
					<div className="catalogContainer">{products.map((product) => <Product product={product} />)}</div>
				</Col>
			</Row>
		</div>
	);
};

export default CatalogScreen;
