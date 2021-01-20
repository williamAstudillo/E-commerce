import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/actionAuth';
import { userOrders, placeOrder } from '../actions/actionOrders';
import { logInGoogle } from '../actions/actionAuth';
import MercadoPago from './MercadoPago';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';
import './MyOrders.css';
import Swal from 'sweetalert2';
import { orderMercadoPago } from '../actions/actionOrders';

const MyProfile = ({ logOut, user, userOrders, orders, placeOrder, logInGoogle, orderMercadoPago, pago }) => {
	const [input, setInput] = useState({
		open: false,
		products: '',
		orders: '',
		form: { shippingAddress: user.shipping_address, city: user.city, id: '' },
		errors: { shippingAddress: '', city: '' },
		openPago: false,
		totalOrder: 0
	});
	const [inputMP, setInputMP] = useState({
		errorDoc: '',
		form: {
			paymentMethod: '',
			payerFirstName: user.first_name,
			payerLastName: user.last_name,
			payerEmail: user.email,
			docType: '',
			docNumber: 0,
			transactionAmount: 0
		}
	});

	const divMP = {
		display: 'block',
		marginRight: 'auto',
		marginLeft: 'auto'
	};

	var total;

	let history = useHistory();

	useEffect(() => {
		logInGoogle().then(() => {
			console.log('user.myorders------------', user);
			if (!user) {
				history.push('/login');
			}
			if (!orders) {
				userOrders(user);
			}
		});
	});

	useEffect(
		() => {
			setInput({
				...input,
				orders: orders
			});
		},
		[orders]
	);

	useEffect(
		() => {
			if (pago && pago.response.transaction_details.external_resource_url) {
				console.log('useEffectPago', pago.response.transaction_details.external_resource_url);
				window.open(pago.response.transaction_details.external_resource_url, '_blank');
				window.location = '/myorders';
			}
		},
		[pago]
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let errors = input.errors;

		switch (name) {
			case 'shippingAddress':
				errors.shippingAddress = value.length < 1 ? 'Confirme la dirección de entrega!' : '';
				break;
			case 'city':
				errors.city = value.length < 1 ? 'Confirme la ciudad de envío!' : '';
				break;
			default:
				break;
		}

		setInput({
			...input,
			form: {
				...input.form,
				[e.target.name]: e.target.value
			}
		});
		// setInput({
		// 	...input,
		// 	errors: errors
		// });
	};

	const reviewOrder = (index, idOrder) => {
		setInput({
			...input,
			open: true,
			products: orders[index].products,
			form: { ...input.form, id: idOrder }
		});
	};

	const sendOrder = (productos, total) => {
		if (input.form.shippingAddress === '' || input.form.city === '') {
			alert('Please confirm shipping address');
		} else {
			setInput({
				...input,
				open: false,
				openPago: true,
				totalOrder: total
			});
			setInputMP({
				...inputMP,
				form: {
					...inputMP.form,
					transactionAmount: total
				}
			});
		}
	};

	const closeDetails = () => {
		setInput({
			...input,
			open: false
		});
	};

	const handleChangeMP = (e) => {
		setInputMP({
			...inputMP,
			form: {
				...inputMP.form,
				[e.target.name]: e.target.value
			}
		});

		if (inputMP.form.docNumber.length >= 10) {
			setInput({
				...inputMP,
				errorDoc: ''
			});
		}
	};

	const handleSubmitMP = (e) => {
		e.preventDefault();
		if (
			inputMP.form.paymentMethod === '' ||
			inputMP.form.payerFirstName === '' ||
			inputMP.form.payerLastName === '' ||
			inputMP.form.payerEmail === '' ||
			inputMP.form.docType === '' ||
			inputMP.form.docNumber === 0 ||
			inputMP.form.docNumber.length < 6 ||
			isNaN(inputMP.form.docNumber)
		) {
			if (inputMP.form.docNumber.length < 6) {
				setInputMP({
					...inputMP,
					errorDoc: 'Doc. Number should be minimum a 6 digit number'
				});
			}

			alert('Complete todos los campos del formulario');
		} else {
			placeOrder({
				city: input.form.city,
				shippingAddress: input.form.shippingAddress,
				id: input.form.id,
				mail: {
					user: user,
					order: input.products
				}
			});

			orderMercadoPago(inputMP.form);
			//----------esto es lo que habia en master

			Swal.fire({
				title: 'Gracias por su compra, ya la estamos procesando',
				//text              : userInput.message,
				icon: 'success',
				showConfirmButton: false,
				timer: 3000
			}).then(() => {
				//   window.location = '/myorders';
			});

		}
	}
	/* 	const reviewOrder = (index, idOrder) => {
			setInput({
				...input,
				open     : true,
				products : orders[index].products,
				form     : { ...input.form, id: idOrder }
			});
			//--------------esto es lo que estaba en mi rama estilos y daba conflicto

				}

	 */

	/* const sendOrder = (productos) => {

		   //    console.log(productos)

			 if (input.form.shippingAddress === '' || input.form.city === '') {
			   alert('Please confirm shipping address')
			}
			else {
		   //    console.log("city", input.form.city, "address", input.form.shippingAddress,
		   //        "id", input.form.id)

			 placeOrder({
				  city: input.form.city,
				 shippingAddress: input.form.shippingAddress,
				 id: input.form.id,
				 mail: {
					 user: user,
					 order: productos
				 }
			 })

		   //enviar correo de notifiacion
		   //se envia a user.email.. user esta traido de manra global en el compoennten

		   //=======aqui termina el conflicto que señalaba git

		   //<<<<<<< estilos

				   }

			   }
 */
	/* 		 const closeDetails = () => {
					setInput({
						...input,
					  open: false
				})
			 }
	 */		// =======

	/* setInput({
		...input,
		open       : false,
		openPago   : true,
		totalOrder : total
	});
*/	//	};
	//};

	const reviewRatings = (index, product, userid) => {
		history.push(`/rate/${userid}/${product}`);
	};

	//  >>>>>>> master
	return (
		<div>
			<h1 className="ordersTitle"> Orders</h1>
			<div className="ordersContainer">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Order</th>
							<th>Created At</th>
							<th>State</th>
							<th>Options</th>
							<th>Reviews</th>
						</tr>
					</thead>
					<tbody>
						{input.orders &&
							input.orders.map((e, index) => (
								<tr>
									<td>{index + 1}</td>
									<td>{e.updatedAt}</td>
									<td>{e.state}</td>
									<td>
										{e.state === 'creada' ? (
											<Button color="outline-success" onClick={() => reviewOrder(index, e.id)}>
												Review Order
											</Button>
										) : (
												<span />
											)}{' '}
									</td>
									<td>
										{e.products.map((product) => (
											<Button
												color="outline-success"
												onClick={() => reviewRatings(index, product.id, e.userId)}>
												{product.id}
											</Button>
										))}{' '}
									</td>
								</tr>
							))}
					</tbody>
				</Table>

				<Modal isOpen={input.open}>
					<div className="modalContainer">
						<Button className="closeButton" color="danger" onClick={closeDetails}>
							X
						</Button>
					</div>

					<ModalHeader>
						<div>
							<h3>Order Details</h3>
						</div>
					</ModalHeader>

					<ModalBody>
						<FormGroup>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Name </th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Subtotal</th>
										<th>Image</th>
									</tr>
								</thead>
								<tbody>
									<script>{(total = 0)}</script>
									{input.products &&
										input.products.map((e) => (
											<tr>
												<td>{e.name}</td>
												<td>{e.orderLine.units}</td>
												<td>{parseFloat(e.orderLine.price).toFixed(2)}</td>
												<td>{parseFloat(e.orderLine.price * e.orderLine.units).toFixed(2)}</td>
												<img src={e.images} width="150" height="180" border="5" />
												<script>
													{(total = total + e.orderLine.price * e.orderLine.units)}
												</script>
											</tr>
										))}
								</tbody>
							</Table>
						</FormGroup>

						<FormGroup>
							<h3>TOTAL: {total.toFixed(2)} </h3>
						</FormGroup>
						<FormGroup />

						<FormGroup>
							<h2>Confirm Shipping Address</h2>
						</FormGroup>
						<FormGroup>
							<label>Shipping Address:</label>
							<input
								className="form-control"
								name="shippingAddress"
								type="text"
								onChange={handleChange}
								value={input.form.shippingAddress}
							/>
							{<div className="text-danger">{input.errors.shippingAddress}</div>}
						</FormGroup>
						<FormGroup>
							<label>Ciudad:</label>
							<input
								className="form-control"
								name="city"
								type="text"
								onChange={handleChange}
								value={input.form.city}
							/>
							<div className="text-danger">{input.errors.city}</div>
						</FormGroup>
					</ModalBody>

					<ModalFooter>
						<Button color="success" onClick={() => sendOrder(input.products, total)}>
							CONFIRM
						</Button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={input.openPago}>
					{/*                 <ModalHeader>
               
                </ModalHeader>
 */}
					<ModalBody>
						<div>
							<img
								style={divMP}
								src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
								width="150"
								height="180"
							/>

							{/* <MercadoPago total={input.totalOrder} user={user}></MercadoPago> */}

							<form
								onSubmit={
									handleSubmitMP
								} /* action="/process_payment" method="post" id="paymentForm" */>
								<h3>Medio de pago</h3>
								<div>
									<select
										class="form-control"
										id="paymentMethod"
										name="paymentMethod"
										onChange={() =>
											setInputMP({
												...inputMP,
												form: {
													...inputMP.form,
													paymentMethod: document.getElementById('paymentMethod').value
												}
											})}>
										<option>Selecione un medio de pago</option>
										<option value="efecty">EFECTY</option>
										<option value="baloto">BALOTO</option>
									</select>
								</div>

								<br />
								<h3>Detalles del comprador</h3>
								<div>
									<div>
										<label for="payerFirstName">Nombre</label>
										<input
											id="payerFirstName"
											name="payerFirstName"
											type="text"
											value={user.first_name}
											disabled="true"
										/>
									</div>
									<div>
										<label for="payerLastName">Apellido</label>
										<input
											id="payerLastName"
											name="payerLastName"
											type="text"
											value={user.last_name}
											disabled="true"
										/>
									</div>
									<div>
										<label for="payerEmail">E-mail</label>
										<input
											id="payerEmail"
											name="payerEmail"
											type="text"
											value={user.email}
											disabled="true"
										/>
									</div>
									<div>
										<label for="docType">Tipo de documento</label>
										<select
											id="docType"
											name="docType"
											data-checkout="docType"
											type="text"
											onChange={() =>
												setInputMP({
													...inputMP,
													form: {
														...inputMP.form,
														docType: document.getElementById('docType').value
													}
												})}>
											<option>Selecione su tipo de documento</option>
											<option value="CC">Cédula de Ciudadanía</option>
											<option value="CE">Cédula de Extranjería</option>
											<option value="Pasaporte">Pasaporte</option>
										</select>
									</div>
									<div>
										<label for="docNumber">Número de documento</label>
										<input name="docNumber" type="text" onChange={handleChangeMP} />
										<div className="text-danger">{inputMP.errorDoc}</div>
									</div>
								</div>

								<div>
									<div>
										<input
											type="hidden"
											name="transactionAmount"
											id="transactionAmount"
											value={total}
										/>
										<input
											type="hidden"
											name="productDescription"
											id="productDescription"
											value="Orden de Compra Petectives"
										/>

										<br />
										<button type="submit">Pagar</button>
										<br />
									</div>
								</div>
							</form>
						</div>
					</ModalBody>

					<ModalFooter>
						<div style={divMP} className="images" display="flex" margin="auto">
							<img
								src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/122014/efecty.png?itok=pq-WVtG-"
								width="80"
								height="80"
								border="5"
							/>
							<img
								src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102013/baloto_electronico-01.png?itok=9NtnqeQ7"
								width="100"
								height="100"
								border="5"
							/>
						</div>
					</ModalFooter>
				</Modal>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth: { user }, orders: { orders }, orders: { pago } }) => ({
	user,
	orders,
	pago
});

const mapDispatchToProps = (dispatch) => ({
	orderMercadoPago: (input) => dispatch(orderMercadoPago(input)),
	logOut: () => dispatch(logOut()),
	userOrders: (user) => dispatch(userOrders(user)),
	placeOrder: (order) => dispatch(placeOrder(order)),
	logInGoogle: () => dispatch(logInGoogle())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);