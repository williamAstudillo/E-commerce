import React, { useState, Fragment } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Container, Form, FormGroup, UncontrolledTooltip } from 'reactstrap';
import { addUser } from '../actions/actions';
import Swal from 'sweetalert2';
import './newUser.css'

function FormUser(props) {
	const [ userInput, setUserInput ] = useState({
		form     : {
			first_name       : '',
			last_name        : '',
			email            : '',
			country          : '',
			city             : '',
			shipping_address : '',
			password         : ''
		},
		errors   : {},
		message  : '',
		redirect : null
	});
	const [ duplicate, setDuplicate ] = useState(false);

	const history = useHistory();
	let isUserFound;

	const handleChange = (e) => {
		let errors = userInput.errors;
		e.target.name === 'email'
			? setUserInput({
					...userInput,
					form   : {
						...userInput.form,
						[e.target.name]: e.target.value.toLowerCase()
					},
					errors
				})
			: setUserInput({
					...userInput,
					form   : {
						...userInput.form,
						[e.target.name]: e.target.value
					},
					errors
				});

		const emailRegex = RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);

		const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/);

		const { name, value } = e.target;

		switch (name) {
			case 'first_name':
				errors.first_name = value.length < 1 ? 'Name must contain at leat one character!' : '';
				break;
			case 'last_name':
				errors.last_name = value.length < 1 ? 'Last Name must contain at leat one character!' : '';
				break;
			case 'email':
				axios
					.get('http://localhost:3000/users')
					.then((res) => {
						const users = res.data;
						isUserFound = users.filter((user) => {
							return user.email.toLowerCase() === value.toLowerCase();
						}).length;
						isUserFound === 1 ? setDuplicate(true) : setDuplicate(false);
					})
					.catch((error) => console.error('error ', error));
				errors.email = emailRegex.test(value) ? '' : 'Must be a valid e-mail!';
				break;
			case 'country':
				errors.country = value.length < 1 ? 'Country must not be empty!' : '';
				break;
			case 'city':
				errors.city = value.length < 1 ? 'Your city is required!' : '';
				break;
			case 'shipping_address':
				errors.shipping_address = value.length < 1 ? 'We need your address to deliver your products!' : '';
				break;
			case 'password':
				errors.password = passwordRegex.test(value)
					? ''
					: 'Password must contain between 6 and 10 characteres, an uppercase letter, a número and a special character(@$!%*?&)!';
				break;
			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			userInput.form.first_name === '' ||
			userInput.form.last_name === '' ||
			userInput.form.email === '' ||
			userInput.form.country === '' ||
			userInput.form.city === '' ||
			userInput.form.shipping_address === '' ||
			userInput.form.password === ''
		) {
			return Swal.fire({
				title             : 'Datos Incompletos',
				//text              : userInput.message,
				icon              : 'error',
				showConfirmButton : false,
				timer             : 1500
			});
		} else if (
			userInput.errors.first_name !== '' ||
			userInput.errors.last_name !== '' ||
			userInput.errors.email !== '' ||
			userInput.errors.country !== '' ||
			userInput.errors.city !== '' ||
			userInput.errors.shipping_address !== '' ||
			userInput.errors.password !== '' ||
			duplicate === true
		) {
			return Swal.fire({
				title             : 'Datos Incorrectos o Email ya se encuentra Registrado',
				//text              : userInput.message,
				icon              : 'error',
				showConfirmButton : false,
				timer             : 1500
			});
		} else {
			setNewUser();
			history.push('/login');
		}
	};

	const setNewUser = () => {
		props.addUser(userInput.form).then(() => {
			setUserInput({
				...userInput,
				message : props.message
			});
			Swal.fire({
				title             : 'Creacion Exitosa',
				//text              : userInput.message,
				icon              : 'success',
				showConfirmButton : false,
				timer             : 1500
			}).then(() => {
				setUserInput({
					...userInput,
					redirect : true
				});
			});
		});
	};
	
	return (
		<div className='containerSignUp'>
			<div className='blankSpace'></div>
		<Fragment>
			{userInput.redirect ? <Redirect to="/" /> : false}
		
				<br />
				<div className="d-flex flex-row justify-content-between align-items-center">
					{/* <Link className="btn btn-light" to="/">
						Regresar
					</Link> */}
				</div>
		
		
			{/* COMPLETE: S52 : Crear Formulario de Creacion de Cuenta/Usuario*/}
		

		<div className='containerFormSignUp'>
			<h1 className='getRegistered'>Get Registered</h1>
			<Form onSubmit={(e) => handleSubmit(e)}>

				<label className='labelSignUp' for='first_name' >Name</label>
				<input
					className="inputSignUp"
					name="first_name"
					id="first_name"
					type="text"
					onChange={handleChange}
				/>
				<div className="text-danger">{userInput.errors.first_name}</div>
		
			
				<label className='labelSignUp' for='last_name'>Last Name</label>
				<input className="inputSignUp" name="last_name" type="text" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.last_name}</div>
		
	
				<label className='labelSignUp' for='email'>Email</label>
				<input className="inputSignUp" name="email" type="text" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.email}</div>
		
				<label className='labelSignUp' for='country'>Country</label>
				<input className="inputSignUp" name="country" type="text" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.country}</div>
	
				<label className='labelSignUp' for='city'>City</label>
				<input className="inputSignUp" name="city" type="text" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.city}</div>
		
				<label className='labelSignUp' for='shipping_address'>Shipping address</label>
				<input className="inputSignUp" name="shipping_address" type="text" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.shipping_address}</div>

				<UncontrolledTooltip placement="right" target="TooltipLabel">
					'Password must contain between 6 and 10 characteres, an uppercase letter, a número and
					a special character(@$!%*?&)!'
				</UncontrolledTooltip>

				<label className='labelSignUp' for='password'>Password</label>
				<label><i id="TooltipLabel" className="far fa-question-circle" /></label>
				<input className="inputSignUp" name="password" type="password" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.password}</div>

			<button id='signUp'>Sign Up</button>
			{/* onClick={(e) => setNewUser(e.target.value)} */}
		</Form>
		</div>
			
		</Fragment>
<div className='blankSpace'></div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		message : state.users.message
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addUser : (newUser) => dispatch(addUser(newUser))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUser);
