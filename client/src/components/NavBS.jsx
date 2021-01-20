import React, { Fragment, useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Image, Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBS.css';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import CartDropDown from './CartDropDown';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { logOut } from '../actions/actionAuth';

const NavBS = ({ hidden, user, logOut }) => {
	let history = useHistory();
	// var user = JSON.parse(localStorage.getItem("localUser"))
	useEffect(
		() => {
			//  user = JSON.parse(localStorage.getItem("localUser"))
			// console.log("user nav ----------------",user)

			if (!user) {
				console.log('No hay nada');
			} else {
				console.log('hola', user);
			}
		},
		[ user ]
	);

	const signout = () => {
		logOut().then(() => {
			history.push('/login');
		});
	};

	return (
		<Fragment>
			<div className="freeDelivery">
				<p>Welcome {user ? user.first_name.toUpperCase() : ''} have a great day !</p>
			</div>
			<Navbar bg="light" expand="lg">
				{/* <div> */}
				<LinkContainer to="/">
					<Navbar.Brand>PETECTIVES</Navbar.Brand>
				</LinkContainer>

				<LinkContainer to="/">
					<SearchBar />
				</LinkContainer>
				{/* </div> */}
				{/* <div> */}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						{/* <LinkContainer to="/rate/1/1">
							<Nav.Link>
								<i className="fas fa-star" />
								Reviews
							</Nav.Link>
						</LinkContainer> */}
						{user.role !== 'admin' ? null : (
							<LinkContainer to="/admin">
								<Nav.Link>
									<i className="fas fa-diagnoses" />
									Admin
								</Nav.Link>
							</LinkContainer>
						)}

						<LinkContainer to="/products">
							<Nav.Link>
								<i className="fas fa-layer-group" />
								Catalog
							</Nav.Link>
						</LinkContainer>
						{!user ? (
							<Fragment>
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user" />
										Sign In
									</Nav.Link>
								</LinkContainer>

								<LinkContainer to="/user">
									<Nav.Link>
										<i className="fas fa-user-plus" />
										Sign Up
									</Nav.Link>
								</LinkContainer>
							</Fragment>
						) : (
							<Fragment>
								<UncontrolledDropdown setActiveFromChild>
									<DropdownToggle tag="a" className="nav-link" caret>
										<i className="fas fa-user" />
										{/* <Image src={user.image_profile} /> */}
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem header>{`Hola ${user.first_name}`}</DropdownItem>
										<DropdownItem divider />
										<DropdownItem tag={Link} to={`/products`}>
											Productos
										</DropdownItem>
										<DropdownItem tag={Link} to={`/me`}>
											Profile
										</DropdownItem>
										{user.role === 'buyer' ? (
											<DropdownItem tag={Link} to={`/myorders`}>
												Orders
											</DropdownItem>
										) : null}
										<DropdownItem onClick={signout}>Sign Out</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Fragment>
						)}
						<CartIcon />
					</Nav>
					{/* form */}
				</Navbar.Collapse>

				{/* 	</div> */}
			</Navbar>
			{hidden ? null : <CartDropDown />}
		</Fragment>
	);
};

const mapStateToProps = ({ cart: { hidden }, auth: { user } }) => ({
	hidden,
	user
});

const mapDispatchToProps = (dispatch) => ({
	logOut : () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBS);
