import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Container, Button } from 'reactstrap';
import { getOrders } from '../../actions/actions';
import { setComplete } from '../../actions/actionOrders';

function Orders ({ orders, getOrders, setComplete }) {
	const [
		userOption,
		setUserOption
	] = useState('');

	const [
		cambio,
		setCambio
	] = useState('');

	const procesando = 'procesando';

	const getInitialData = () => {
		getOrders();
	};

	const cambiarEstado = ({ id, status }) => {
		setComplete({ id: id, status: status });
		setCambio(status);
	};

	useEffect(
		() => {
			getInitialData();
		},
		[
			cambio
		]
	);

	return (
		<Fragment>
			<Container>
				<br />
				<div class="d-flex flex-row justify-content-between">
					<h1>Listado de Ordenes</h1>
				</div>

				<label for="orderTypes">Filtrar Ordenes:</label>
				<select
					name="ordenes"
					id="ordenes"
					onChange={() => setUserOption(document.getElementById('ordenes').value)}
				>
					<option value="">Order Types</option>
					<option value="carrito">Carrito</option>
					<option value="creada">Creada</option>
					<option value="procesando">Procesando</option>
					<option value="cancelada">Cancelada</option>
					<option value="completa">Completa</option>
				</select>

				<br />
				<br />
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Status</th>
							<th>Date</th>
							<th>Shipping Address</th>
							<th>Buyer</th>
							<th>Products</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(
							(order, index) =>
								userOption === '' ? (
									<tr key={order.id}>
										<td>{order.id}</td>
										<td>{order.state}</td>
										<td>{order.createdAt}</td>
										<td>{order.shippingAddress}</td>
										<td>{order.userId}</td>
										<td>{order.products.map((product) => product.id + ',').sort()}</td>
										{order.state === procesando ? (
											<td>
												{' '}
												<Button
													color="success"
													onClick={() =>
														cambiarEstado({
															id     : order.id,
															status : 'completa'
														})}
												>
													Complete
												</Button>
												<Button
													color="danger"
													onClick={() =>
														cambiarEstado({
															id     : order.id,
															status : 'cancelada'
														})}
												>
													Cancel{' '}
												</Button>
											</td>
										) : (
											<td>
												<div />
											</td>
										)}
									</tr>
								) : order.state === userOption ? (
									<tr key={order.id}>
										<td>{order.id}</td>
										<td>{order.state}</td>
										<td>{order.createdAt}</td>
										<td>{order.shippingAddress}</td>
										<td>{order.userId}</td>
										<td>{order.products.map((product) => product.id + ',').sort()}</td>
										{order.state === procesando ? (
											<td>
												{' '}
												<Button
													color="success"
													onClick={() =>
														cambiarEstado({
															id     : order.id,
															status : 'completa'
														})}
												>
													Complete
												</Button>
												<Button
													color="danger"
													onClick={() =>
														cambiarEstado({
															id     : order.id,
															status : 'cancelada'
														})}
												>
													Cancel{' '}
												</Button>
											</td>
										) : (
											<td>
												<div />
											</td>
										)}
									</tr>
								) : (
									<div />
								)
						)}
					</tbody>
				</Table>
			</Container>
		</Fragment>
	);
}

function mapStateToProps (state) {
	return {
		orders : state.users.orders
	};
}

function mapDispatchToProps (dispatch) {
	return {
		getOrders   : () => dispatch(getOrders()),
		setComplete : (payload) => dispatch(setComplete(payload))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
