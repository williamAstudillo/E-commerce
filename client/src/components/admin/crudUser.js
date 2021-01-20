import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {
	Table,
	Button,
	Container,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	ModalFooter,
	UncontrolledTooltip
} from 'reactstrap';
import { getUsers, addUser, updateUser, deleteUser } from '../../actions/actions';

function FormUser({ users, getUsers, addUser, updateUser, deleteUser }) {
	const [ userInput, setUserInput ] = useState({
		form    : {},
		errors  : {},
		message : '',
		newId   : ''
	});
	const [ modal, setModal ] = useState(false);
	const [ formModal, setFormModal ] = useState('');
	const [ picture, setPicture ] = useState('');
	const [ uploaded, setUploaded ] = useState('');

	const toggle = (value) => {
		calculateId();
		setModal(!modal);
		setFormModal(value);
	};

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
		setUserInput({
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
		/* setUserInput({
			...userInput,
			form : {
				...userInput.form,
				[`${e.target.name}_profile`]: e.target.files[0]
			} 
		});*/
	};

	const getInitialData = () => {
		getUsers().then(() => {
			calculateId(users);
		});
	};

	const calculateId = () => {
		for (const value in users) {
			setUserInput({
				...userInput,
				newId : users[value].id + 1
			});
		}
	};

	const setNewUser = (value) => {
		addUser(userInput.form).then(() => {
			getInitialData();
		});
		clearData(value);
	};

	const setUpdateUser = (value) => {
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

		updateUser(data).then(() => {
			getInitialData();
		});
		clearData(value);
	};

	const uploadUser = (user, value) => {
		toggle(value);
		setUserInput({
			...userInput,
			form : user
		});
	};

	const removeUser = (id) => {
		deleteUser(id).then(() => {
			getInitialData();
		});
	};

	const clearData = (value) => {
		toggle(value);
		setUserInput({
			...userInput,
			form   : {},
			errors : {}
		});
		setPicture();
		setUploaded();
	};

	useEffect(() => {
		getInitialData();
	}, []);

	let button;
	let imageProfile;
	let imageProfileChange;
	let passwordProfile;
	let roleProfile;
	let title;
	let roleEdit;
	if (formModal === 'Insertar') {
		button = (
			<Button color="success" onClick={(e) => setNewUser(e.target.value)}>
				Agregar
			</Button>
		);
		passwordProfile = (
			<FormGroup>
				<label>
					Contraseña: <i id="TooltipLabel" className="far fa-question-circle" />
				</label>
				<UncontrolledTooltip placement="right" target="TooltipLabel">
					'Password debe contener entre 6 y 10 caracteres, al menos una letra mayúscula, un número y un
					carácter especial(@$!%*?&)!'
				</UncontrolledTooltip>
				<input className="form-control" name="password" type="text" onChange={handleChange} />
				<div className="text-danger">{userInput.errors.password}</div>
			</FormGroup>
		);
		title = 'Agregar';
	} else {
		imageProfile = (
			<img className="img-fluid rounded w-25" src={uploaded || userInput.form.image_profile} alt="perfil" />
		);
		imageProfileChange = (
			<Fragment>
				<label forhtml="image_profile">Choose image Profile (PNG, JPG)</label>
				<input
					className="form-control"
					name="image"
					type="file"
					id="image"
					accept=".png, .jpg, .jpeg"
					onChange={handleChangeImg}
				/>
			</Fragment>
		);
		button = (
			<Button type="submit" color="success" onClick={(e) => setUpdateUser(e.target.value)}>
				Actualizar
			</Button>
		);
		formModal === 'Editar' ? (roleEdit = userInput.form.role) : (roleEdit = '');
		roleProfile = (
			<FormGroup>
				<label>Rol:</label>
				<input className="form-control" name="role" type="text" onChange={handleChange} value={roleEdit} />
				<div className="text-danger">{userInput.errors.role}</div>
			</FormGroup>
		);
		title = 'Modificar';
	}
	return (
		<Fragment>
			<Container>
				<br />
				<div className="d-flex flex-row justify-content-between">
					<h1>Listado Usuarios Registrados</h1>
					<Button value="Insertar" color="success" size="sm" onClick={(e) => toggle(e.target.value)}>
						Crear/Agregar Usuario
					</Button>
				</div>
				<br />
				<br />
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombres</th>
							<th>Apellidos</th>
							<th>Email</th>
							<th>Rol</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.first_name}</td>
								<td>{user.last_name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<Button
										color="outline-success"
										value="Editar"
										onClick={(e) => uploadUser(user, e.target.value)}>
										Editar
									</Button>{' '}
									<Button color="outline-danger" onClick={() => removeUser(user.id)}>
										Eliminar
									</Button>{' '}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
			{/* COMPLETE: S52 : Crear Formulario de Creacion de Cuenta/Usuario */}
			<Modal isOpen={modal}>
				<ModalHeader>
					<div>
						<h3>{title} Usuario</h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<Form encType="multipart/form-data">
						<FormGroup>
							<div>{imageProfile}</div>
						</FormGroup>

						<FormGroup>
							{imageProfileChange}
							<br />
							<label>Id:</label>
							<input
								className="form-control"
								name="id"
								readOnly
								type="text"
								disabled
								value={formModal === 'Editar' ? userInput.form.id : userInput.newId}
							/>
						</FormGroup>

						<FormGroup>
							<label>Nombres:</label>
							<input
								className="form-control"
								name="first_name"
								type="text"
								onChange={handleChange}
								value={userInput.form.first_name || ''}
							/>
							<div className="text-danger">{userInput.errors.first_name}</div>
						</FormGroup>

						<FormGroup>
							<label>Apellidos:</label>
							<input
								className="form-control"
								name="last_name"
								type="text"
								onChange={handleChange}
								value={userInput.form.last_name || ''}
							/>
							<div className="text-danger">{userInput.errors.last_name}</div>
						</FormGroup>
						<FormGroup>
							<label>Email:</label>
							<input
								className="form-control"
								name="email"
								type="text"
								onChange={handleChange}
								value={userInput.form.email || ''}
							/>
							<div className="text-danger">{userInput.errors.email}</div>
						</FormGroup>
						<FormGroup>
							<label>Pais:</label>
							<input
								className="form-control"
								name="country"
								type="text"
								onChange={handleChange}
								value={userInput.form.country || ''}
							/>
							<div className="text-danger">{userInput.errors.country}</div>
						</FormGroup>
						<FormGroup>
							<label>Ciudad:</label>
							<input
								className="form-control"
								name="city"
								type="text"
								onChange={handleChange}
								value={userInput.form.city || ''}
							/>
							<div className="text-danger">{userInput.errors.city}</div>
						</FormGroup>
						<FormGroup>
							<label>Direccion de Entrega:</label>
							<input
								className="form-control"
								name="shipping_address"
								type="text"
								onChange={handleChange}
								value={userInput.form.shipping_address || ''}
							/>
							<div className="text-danger">{userInput.errors.shipping_address}</div>
						</FormGroup>
						{roleProfile}
						{passwordProfile}
					</Form>
				</ModalBody>
				<ModalFooter>
					{button}
					<Button color="danger" onClick={(e) => clearData(e.target.value)}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
}

function mapStateToProps(state) {
	return {
		users   : state.users.users,
		message : state.users.message
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getUsers   : () => dispatch(getUsers()),
		addUser    : (newUser) => dispatch(addUser(newUser)),
		updateUser : (user) => dispatch(updateUser(user)),
		deleteUser : (user) => dispatch(deleteUser(user))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUser);
