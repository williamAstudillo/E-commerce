import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, UncontrolledTooltip, Row, Col, Collapse } from 'reactstrap';
import './userProfile.css';
import backgroundProfile from './images/backProfile.jpg';

import { updateUser, userResetPassword } from '../actions/actions';

const UserProfile = ({ user, updateUser, userResetPassword }) => {
	const history = useHistory();
	const [ userInput, setUserInput ] = useState({
		form   : {},
		errors : {
			first_name       : '',
			last_name        : '',
			email            : '',
			country          : '',
			city             : '',
			shipping_address : '',
			password         : ''
		}
	});
	const [ picture, setPicture ] = useState('');
	const [ uploaded, setUploaded ] = useState('');
	const [ isOpen, setIsOpen ] = useState(false);
	const [ visibleOk, setVisibleOk ] = useState(false);
	const [ visibleNok, setVisibleNok ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	useEffect(
		() => {
			setUserInput({
				...userInput,
				form : user
			});
		},
		[ user ]
	);

	useEffect(
		() => {
			if (!user) {
				history.push('/login');
			} else if (user.role === 'buyer') {
				history.push('/me');
			} else if (user.role === 'admin') history.push('/admin');
			// localStorage.setItem('localUser', JSON.stringify(user))
		},
		[ user ]
	);

	const handleChange = (e) => {
		const emailRegex = RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);

		const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/);

		const { name, value } = e.target;
		let errors = userInput.errors;

		switch (name) {
			case 'first_name':
				errors.first_name = value.length < 1 ? 'Nombres debe contener al menos 1 caracter!' : '';
				break;
			case 'last_name':
				errors.last_name = value.length < 1 ? 'Apellidos debe contener al menos 1 caracter!' : '';
				break;
			case 'email':
				errors.email = emailRegex.test(value) ? '' : 'Email no valido!';
				break;
			case 'country':
				errors.country = value.length < 1 ? 'Pais debe contener al menos 1 caracter!' : '';
				break;
			case 'city':
				errors.city = value.length < 1 ? 'Ciudad debe contener al menos 1 caracter!' : '';
				break;
			case 'shipping_address':
				errors.country = value.length < 1 ? 'Direccion debe contener al menos 1 caracter!' : '';
				break;
			case 'role':
				errors.role = value.length < 1 ? 'Role debe contener al menos 1 caracter!' : '';
				break;
			case 'password':
				errors.password = passwordRegex.test(value)
					? ''
					: 'password debe contener entre 6 y 10 caracteres, al menos una letra mayúscula, un número y un carácter especial(@$!%*?&)!';
				break;
			default:
				break;
		}
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
	};

	const handleChangeImg = (e) => {
		setPicture(e.target.files[0]);
		setUploaded(URL.createObjectURL(e.target.files[0]));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			userInput.form.first_name === '' ||
			userInput.form.last_name === '' ||
			userInput.form.email === '' ||
			userInput.form.country === '' ||
			userInput.form.city === '' ||
			userInput.form.shipping_address === ''
		) {
			setVisibleNok(true).then(() => {
				window.setTimeout(() => {
					setVisibleNok(false);
				}, 2000);
			});
		} else if (
			userInput.errors.first_name !== '' ||
			userInput.errors.last_name !== '' ||
			userInput.errors.email !== '' ||
			userInput.errors.country !== '' ||
			userInput.errors.city !== '' ||
			userInput.errors.shipping_address !== '' ||
			userInput.errors.password !== ''
		) {
			setVisibleNok(true);
			window.setTimeout(() => {
				setVisibleNok(false);
			}, 2000);
		} else {
			let data = new FormData();

			data.append('image', picture);
			data.append('id', userInput.form.id);
			data.append('first_name', userInput.form.first_name);
			data.append('last_name', userInput.form.last_name);
			data.append('email', userInput.form.email);
			data.append('country', userInput.form.country);
			data.append('city', userInput.form.city);
			data.append('shipping_address', userInput.form.shipping_address);
			data.append('role', userInput.form.role);
			data.append('image_profile', userInput.form.image_profile);

			updateUser(data);
			if (isOpen) {
				userResetPassword(userInput.form);
			}
			setVisibleOk(true);
			window.setTimeout(() => {
				setVisibleOk(false);
			}, 2000);
			setPicture();
		}
	};

	return (
		<div className="profileBackground">
			<h1 className="welcomeProfile">{`Welcome ${userInput.form.first_name}`}</h1>

			<div className="containerProfile">
				<br />
				<form className="formDeMierda" onSubmit={handleSubmit}>
					<div className="profileLeftColumn">
						<img
							className="profileImage"
							src={uploaded || userInput.form.image_profile}
							alt="Image Profile"
						/>
						<label className="chooseFile">Choose file (.png .jpg)</label>
						<input
							className="selectFile"
							name="image"
							type="file"
							id="image"
							accept=".png, .jpg, .jpeg"
							onChange={handleChangeImg}
						/>
						<div className="profileButtonContainer" style={{ padding: '.5rem' }}>
							<button
								color="success"
								size="lg"
								className="updateProfile"
								style={{ marginBottom: '1rem' }}>
								Update Profile
							</button>
							<button
								color="primary"
								className="changePassword"
								size="lg"
								onClick={toggle}
								style={{ marginBottom: '1rem' }}>
								Change Password
							</button>
						</div>
					</div>
					<div className="entireFormContainer">
						<div className="centerColumnProfile">
							<div className="profileEntriesContainer">
								<label className="profileLabels" forhtml="first_name">
									First Name
								</label>
								<input
									className="profileInputs"
									name="first_name"
									type="text"
									onChange={handleChange}
									value={userInput.form.first_name || ''}
								/>
								<div className="text-danger">{userInput.errors.first_name}</div>
							</div>

							<div className="profileEntriesContainer">
								<label className="profileLabels">Last Name</label>
								<input
									className="profileInputs"
									name="last_name"
									type="text"
									onChange={handleChange}
									value={userInput.form.last_name || ''}
								/>
								<div className="text-danger">{userInput.errors.last_name}</div>
							</div>

							<div className="profileEntriesContainer">
								<label className="profileLabels">Email</label>
								<input
									className="profileInputs"
									name="email"
									type="text"
									onChange={handleChange}
									value={userInput.form.email || ''}
								/>
								<div className="text-danger">{userInput.errors.email}</div>
							</div>

							<div className="profileEntriesContainer">
								<label className="profileLabels">Country</label>
								<input
									className="profileInputs"
									name="country"
									type="text"
									onChange={handleChange}
									value={userInput.form.country || ''}
								/>
								<div className="text-danger">{userInput.errors.country}</div>
							</div>

							<div className="profileEntriesContainer">
								<label className="profileLabels">City</label>
								<input
									className="profileInputs"
									name="city"
									type="text"
									onChange={handleChange}
									value={userInput.form.city || ''}
								/>
								<div className="text-danger">{userInput.errors.city}</div>
							</div>

							<div className="profileEntriesContainer">
								<label className="profileLabels">Shipping Address</label>
								<input
									className="profileInputs"
									name="shipping_address"
									type="text"
									onChange={handleChange}
									value={userInput.form.shipping_address || ''}
								/>
								<div className="text-danger">{userInput.errors.shipping_address}</div>
							</div>
						</div>
					</div>

					<br />
					<br />

					<Collapse isOpen={isOpen}>
						<label>
							Password: <i id="TooltipLabel" className="far fa-question-circle" />
						</label>
						<UncontrolledTooltip placement="right" target="TooltipLabel">
							'Password debe contener entre 6 y 10 caracteres, al menos una letra mayúscula, un número y
							un carácter especial(@$!%*?&)!'
						</UncontrolledTooltip>
						<input className="profileInputs" name="password" type="text" onChange={handleChange} />
						<div className="text-danger">{userInput.errors.password}</div>
					</Collapse>
				</form>
				<Alert color="success" isOpen={visibleOk}>
					user updated successfully
				</Alert>
				<Alert color="danger" isOpen={visibleNok}>
					some data is wrong
				</Alert>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		user : state.auth.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateUser        : (user) => dispatch(updateUser(user)),
		userResetPassword : (user) => dispatch(userResetPassword(user))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
