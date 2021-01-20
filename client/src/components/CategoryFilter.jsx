import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { getCategory, filterProduct } from '../actions/actions';
//import { getCategories } from '../screens/CatalogScreen'
import CatBar from './CatBar'
import './CategoryFilter.css'
import { connect } from 'react-redux'
import product from '../reducer/reducerCrud';


const CategoryFilter = ({ categories, getCategory, filterProduct }) => {


	useEffect(() => {
		getCategory()

	}, [])

	return (
		<div className='categoryFilterBar'>
			<Row>
				<Col>
					<p className='categoryTitle'>Browse By Category</p>
					<ListGroup className='catShop'>
						{

							categories && categories.map((category) => {
								return (
									<CatBar key={category.id} category={category} />
								)

							})

						}


					</ListGroup>

				</Col>
			</Row>
		</div>
	)
}


function mapStateToProps(state) {
	//console.log(state.products)
	return {
		categories: state.products.categories
	}
}

function mapDispatchToProps(dispatch) {
	return {
		filterProduct: () => dispatch(filterProduct()),
		getCategory: () => dispatch(getCategory())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)

