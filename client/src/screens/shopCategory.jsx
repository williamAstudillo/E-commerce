import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { getCategories } from '../screens/CatalogScreen';
import Checkbox from '../components/Checkbox';
import RadioBox from '../components/CatBar';
import { prices } from '../components/fixedPrices';

const Shop = () => {
	const [ myFilters, setMyFilters ] = useState({
		filters : {
			category : [],
			price    : []
		}
	});
	const [ categories, setCategories ] = useState([]);
	const [ error, setError ] = useState(false);
	//console.log('traete las categorias hdp :',getCategories())

	const init = () => {
		getCategories().then((data) => {
			//console.log('que hay en la data', data)
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	const handleFilters = (filters, filterBy) => {
		//console.log('que son los berracos filters????------->>>>>  ',filters)
		const newFilters = { ...myFilters };
		newFilters.filters[filterBy] = filters;

		if (filterBy == 'price') {
			let priceValues = handlePrice(filters);
			newFilters.filters[filterBy] = priceValues;
		}
		loadFilteredResults(myFilters.filters);
		setMyFilters(newFilters);
	};

	const handlePrice = (value) => {
		const data = prices;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value)) {
				array = data[key].array;
			}
		}
		return array;
	};

	const loadFilteredResults = (newFilters) => {};
	return (
		<div>
			<Row>
				<Col md={4}>
					<h4>Filter by categories</h4>
					<div>
						<RadioBox
							categories={categories}
							handleFilters={(filters) => handleFilters(filters, 'category')}
						/>
					</div>

					{/* <h4>Filter by price range</h4>
					<div>
						<RadioBox 
							prices={prices}
							handleFilters={filters =>
								handleFilters(filters, 'price')
							}
						/>
					</div> */}
				</Col>
				<Col md={8}>{JSON.stringify(myFilters)}</Col>
			</Row>
		</div>
	);
};

export default Shop;
