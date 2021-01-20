import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from './product';
import './Products.css';
import { getProduct } from '../actions/actions';

const Products = ({ products, getProduct }) => {
	const [input,setInput]=useState({
		currentPage  : 1,
		postsPerPage : 4,
		page         : 1          

	})
	useEffect(() => {
		getProduct();
	},[]);

	const indexOfLastPost = input.currentPage * input.postsPerPage;
	const indexOfFirstPost = indexOfLastPost - input.postsPerPage;
	const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
	const arr=[]
	for (let i = 0; i < Math.ceil(products.length/input.postsPerPage); i++) {
		arr.push(i+1)
	}
	const pagination=(number)=>{
		setInput({
			...input,
			currentPage:number,
			page:number 
		})
	}
	return (
		<div>
			<Col>
				<span>{console.log('PRODUCTOS', products)}</span>

				<h3 className='catalogTitle'>Browse the Entire Catalog</h3>

				<div className="flexThis">
					{currentPosts.map((product) => {
						return <Product key={product.id} product={product} />;
					})}
				</div>
				<div className="flexThis pagination">
					{arr.map((number) => {
						return (
							<a className='page-link' onClick={()=>pagination(number)}>  
							{number}  
							</a>	
						)
					})}
				</div>
			</Col>
		</div>
	);
};

const mapStateToProps = ({ products: { products } }) => ({
	products
});

function mapDispatchToProps (dispatch) {
	return {
		getProduct : () => dispatch(getProduct())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
