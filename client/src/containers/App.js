import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from '../screens/HomeScreen';

import NavBS from '../components/NavBS';
import ProductScreen from '../screens/ProductScreen';
import SearchScreen from '../screens/SearchScreen';
import newUser from '../components/newUser';
import AllProducts from '../components/AllProducts';
import FilteredProducts from '../components/FilteredProducts';
import admin from '../components/admin/admin';
import CheckoutPage from '../components/Checkout';
import RateProduct from '../components/RateProduct';
import Login from '../components/Login';
import MyOrders from '../components/MyOrders';
import UserProfile from '../components/userProfile';
import footer from '../components/footer';
import introCatalog from '../components/introCatalog';

const App = () => {
	return (
		<Router>
			<div className="App">
				<NavBS />
				<Route path="/login" component={Login} exact />
				<Route path="/products" component={introCatalog} exact />
	
				<Route path="/myorders" component={MyOrders} exact />
				<Route path="/me" component={UserProfile} exact />
				<Route path="/" component={HomeScreen} exact />
				<Route path="/admin" component={admin} />
				<Route path="/checkout" component={CheckoutPage} exact />
				<Route path="/product/:id" component={ProductScreen} exact />
				<Route path="/products" component={AllProducts} exact />
				<Route path="/products/category" component={AllProducts} exact />
				<Route path="/search/:item" component={SearchScreen} exact />
				<Route path="/products/category/:nameCat" component={FilteredProducts} />
				<Route path="/user" component={newUser} />
				<Route path="/rate/:idUser/:idProduct" component={RateProduct} />
				<Route path='/' component={footer}/>
			</div>
		</Router>
	);
};

export default App;
