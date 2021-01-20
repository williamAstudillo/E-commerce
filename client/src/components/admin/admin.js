import React, { useState, useEffect } from 'react';
import { Button, Nav, NavItem } from 'reactstrap';

import Users from './crudUser';
import Dashboard from './dashboard';
import Products from './crud';
import Categories from './CrudCategoria';
import Orders from './orders';
import './admin.css';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';



function Admin({user}) {
	const [ userOption, setUserOption ] = useState('');
	const history=useHistory()
	// var localUser = JSON.parse(localStorage.getItem("localUser"))
	useEffect(() => {
		if (!user) {
			history.push('/login');
		} else if (user.role === 'buyer') {
		    history.push('/me');
		} 
	},[]);

	const selector = (option) => {
		switch (option) {
			case 'users':
				return <Users />;
			case 'products':
				return <Products />;
			case 'categories':
				return <Categories />;
			case 'orders':
				return <Orders />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<div className="content">
			{/* <Row>
				<Col md={2}> */}
			<div className="navigation">
				<hr />
				<Nav vertical>
					<NavItem>
						<Button classNam='adminButtons' color="success" block onClick={() => setUserOption('dashboard')}>
							<i className="fas fa-tachometer-alt" /> Dashboard
						</Button>
					</NavItem>
					<NavItem>
						<Button color="success" block onClick={() => setUserOption('users')}>
							<i className="fas fa-users" /> Usuarios
						</Button>
					</NavItem>
					<NavItem>
						<Button color="success" block onClick={() => setUserOption('products')}>
							<i className="fas fa-atlas" /> Productos
						</Button>
					</NavItem>
					<NavItem>
						<Button color="success" block onClick={() => setUserOption('categories')}>
							<i className="fas fa-layer-group" /> Categorias
						</Button>
					</NavItem>
					<NavItem>
						<Button color="success" block onClick={() => setUserOption('orders')}>
							<i className="fas fa-people-carry" /> Ordenes
						</Button>
					</NavItem>
				</Nav>
			</div>
			{/*</Col>
				<Col md={10}>*/}
			{selector(userOption)}
			{/*</Col>
			</Row>*/}
		</div>
	);
}

const mapStateToProps = ({ auth: { user } }) => ({
	user,
});



export default connect(mapStateToProps, null)(Admin);


