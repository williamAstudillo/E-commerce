import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { getUsers, getProduct } from '../../actions/actions';
import { connect } from 'react-redux';
import { Bar, Doughnut } from 'react-chartjs-2';
import './dashboard.css'

function Dashboard({ getUsers, getProduct, users, products }) {
	const [ Data, setData ] = useState({});
	const [ Data2, setData2 ] = useState({});
	const [ Count, setCount ] = useState({
		users    : users,
		products : products
	});

	useEffect(
		() => {
			getInitialData();
		},
		[ users, products ]
	);

	const getInitialData = () => {
		getUsers();
		getProduct().then(() => {
			getDataChart();
		});
	};

	let usersdata = [];
	let productsdata = [];
	let resultdata = [];
	const getDataChart = () => {
		usersdata.push(Count.users);
		productsdata.push(Count.products);
		//From Bar
		setData({
			data : {
				labels   : [ 'Total' ],
				datasets : [
					{
						label           : 'Productos',
						backgroundColor : 'rgba(255, 102, 102, 0.75)',
						data            : productsdata
					},
					{
						label           : 'Usuarios',
						backgroundColor : 'rgba(51, 102, 255, 0.75)',
						data            : usersdata
					}
				]
			}
		});
		resultdata.push(Count.products);
		resultdata.push(Count.users);
		// From Donut
		setData2({
			data : {
				labels   : [ 'Productos', 'Usuarios' ],
				datasets : [
					{
						backgroundColor : [ 'rgba(255, 102, 102, 0.75)', 'rgba(51, 102, 255, 0.75)' ],
						data            : resultdata
					}
				]
			}
		});
	};

	return (
	

		<Fragment>
			<Container>
				<br />
				<div className="dashboardContent d-flex flex-column justify-content-center">
					<h1>Dashboard</h1>
					<br />
					<Bar
						options={{
							responsive : true,
							scales     : {
								yAxes : [
									{
										ticks : {
											beginAtZero : true
										}
									}
								]
							}
						}}
						data={Data.data}
					/>
					<Doughnut
						options={{
							responsive : true
						}}
						data={Data2.data}
					/>
				</div>
			</Container>
		</Fragment>
	
	);
}

function mapStateToProps(state) {
	return {
		users    : state.users.users.length,
		products : state.products.products.length
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getUsers   : () => dispatch(getUsers()),
		getProduct : () => dispatch(getProduct())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
