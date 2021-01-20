import React from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import CategoryFilter from './CategoryFilter';
import Products from './Products';
import ProductFilter from './ProductFilter';
import './filteredProducts.css'

const FilteredProducts = ({ match }) => {
	return (
			
		<div className='filteredProducts'>
			<h3 className='productsCategoryHeading'>Product by category</h3>
			<Row>
				<Col md={2}>
					<CategoryFilter />
				</Col>
				<Col md={10}>
					<ProductFilter filtrados={match.params.nameCat} />
				</Col>
			</Row>
		</div>
	);
};

export default FilteredProducts;
