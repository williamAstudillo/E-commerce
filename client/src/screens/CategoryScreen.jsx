import React from 'react'
import products from '../products'
import Product from '../components/product'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryScreen = ({ match }) => {
	const results = products.filter(p => p.category === match.params.category)
	const traerCategorias = () => {
		const categories = products.map((product) => product.category);
		return categories;
	};
	return (
		<div>
			<Row>
				<Col md={3}>
					<h1>LEro Lero Candelero</h1>
					<ListGroup variant="flush">
						{traerCategorias().map((category) => {
							return (
								<ListGroup.Item>
									<Link to={`/catalog/${category}`}
										style={{ textDecoration: 'none' }}
									>
										<p>{category}</p>
									</Link>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Col>
				<Col md={9}>
					<h1>{match.params.category}</h1>
					<div className="catalogContainer">{results.map((item) => <Product product={item} />)}</div>
				</Col>
			</Row>

		</div>
	)
}

export default CategoryScreen


