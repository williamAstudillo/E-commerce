import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { searchProduct } from '../actions/actions';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Product from '../components/product';
import './searchScreen.css'

const SearchScreen = ({ searchResults }) => {

 
/* 	useEffect(
		() => {
			searchProduct(props.match.params.item);
		},
		[ props.match.params.item ]
	); */

	return (
		<div>
				<h3 className='searchResultsTitle'>Search Results</h3>
			<Col>
				<div className="flexThis searchLayout">
					{searchResults ?
						searchResults.map((product) => {
							return (
								<Link to={`/products/${product.id}`}
									style={{textDecoration: 'none'}}
								>
									<Product product={product} />
								</Link>
							);
						})
					:<p>
						We're sorry we dont have the product you're looking for, but maybe in the future
					</p>
					}
				</div>
			</Col>
		</div>
	);
};

const mapStateToProps = ({products: {searchResults}}) => ({		
		searchResults	
})

function mapDispatchToProps(dispatch) {
	return {
		searchProduct : () => dispatch(searchProduct())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
