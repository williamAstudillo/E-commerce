import React from 'react';
import { useState, useEffect } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const getCategories = () => {
	return fetch('http://localhost:3000/products/category', {
		method : 'GET'
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => console.log(err));
};
//console.log('que me devuelve mi funcion ------>', getCategories())

const CategoriesBar = () => {
	const [ preLoaded, setPreLoaded ] = useState([]);
	const [ error, setError ] = useState(false);

	const init = () => {
		getCategories().then((cat) => {
			if (cat.error) {
				setError(cat.error);
				// console.log('Error------>', cat.data.error)
			} else {
				setPreLoaded(cat);
				//console.log('Estado ------>', preLoaded)
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div>
			<Col md={3}>
				<h1>Busca por Categoria</h1>
				<ListGroup variant="flush">
					{preLoaded.map((category) => {
						//console.log(category)
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
		</div>
	);
};

export default CategoriesBar;
