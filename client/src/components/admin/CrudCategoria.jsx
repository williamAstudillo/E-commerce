import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { addCategory, getCategory, deleteCategory, putCategory } from '../../actions/actions';

import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';

var index = 0;

function FormCrud({ addCategory, categories, getCategory, deleteCategory, putCategory }) {
	const [ input, setInput ] = useState({
		//        index: 0,
		data            : [],
		temp            : [],
		modalInsertar   : false,
		modalActualizar : false,
		form            : {
			id          : '',
			name        : '',
			description : ''
		}
	});

	useEffect(
		() => {
			if (!input.temp[0]) {
				getCategory();
				setInput({
					...input,
					data : categories.categories,
					temp : categories.categories
				});
				index = categories.categories.length;
			}
		},
		[ categories.categories ]
	);

	function eliminar(id) {
		const newData = input.data.filter((item) => item.id !== id);
		deleteCategory(id);
		setInput({ ...input, data: newData });
	}

	const insertar = () => {
		if (input.form.name === '' || input.form.description === '') return alert('Data fields should not be empty');

		var valorNuevo = { ...input.form };
		index++;
		valorNuevo.id = index;
		var lista = input.data;
		lista.push(valorNuevo);
		addCategory(valorNuevo);
		var form1 = {
			id          : '',
			name        : '',
			description : ''
		};
		setInput({ ...input, modalInsertar: false, data: lista, form: form1 });
	};
	const editar = (form) => {
		if (input.form.name === '' || input.form.description === '') return alert('All fields should not be empty');
		var contador = 0;
		var arreglo = input.data;
		input.data.map((producto) => {
			if (form.id === producto.id) {
				arreglo[contador].name = form.name;
				arreglo[contador].description = form.description;
			}
			contador++;
		});

		var form1 = {
			id          : '',
			name        : '',
			description : ''
		};
		putCategory(form);
		setInput({
			...input,
			data            : arreglo,
			modalActualizar : false,
			form            : form1
		});
	};

	const mostrarModalInsertar = () => {
		setInput({
			...input,
			modalInsertar : true
		});
	};
	const ocultarModalInsertar = () => {
		setInput({
			...input,
			modalInsertar : false
		});
	};

	//Activar Pop Up de Edicion
	const mostrarModalActualizar = (producto) => {
		setInput({
			...input,
			modalActualizar : true,
			form            : producto
		});
	};

	//Desactivar Pop Up de Edicion
	const ocultarModalActualizar = () => {
		setInput({
			...input,
			modalActualizar : false
		});
	};
	const handleChange = (e) => {
		setInput({
			...input,
			form : {
				...input.form,
				[e.target.name]: e.target.value
			}
		});
	};

	return (
		<Fragment>
			<Container>
				<br />
				<div class="d-flex flex-row-reverse">
					<Button color="success" size="lg" onClick={() => mostrarModalInsertar()}>
						Insertar categoria
					</Button>
				</div>
				<br />
				<br />
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Descripcion</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{input.data.map((e, i) => (
							<tr key={i}>
								<td>{e.id}</td>
								<td>{e.name}</td>
								<td>{e.description}</td>
								<td>
									<Button color="outline-success" onClick={() => mostrarModalActualizar(e)}>
										Edit
									</Button>{' '}
									<Button color="outline-danger" onClick={() => eliminar(e.id)}>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>

			{/*MODAL INSERTAR: PARA AGREGAR PRODUCTOS*/}
			<Modal isOpen={input.modalInsertar}>
				<ModalHeader>
					<div>
						<h3>Insertar Categoria</h3>
					</div>
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<label>Id:</label>

						<input className="form-control" readOnly type="text" value={index + 1} />
					</FormGroup>

					<FormGroup>
						<label>Categoría:</label>
						<input className="form-control" name="name" type="text" onChange={handleChange} />
					</FormGroup>

					<FormGroup>
						<label>Descripción:</label>
						<input className="form-control" name="description" type="text" onChange={handleChange} />
					</FormGroup>
				</ModalBody>

				<ModalFooter>
					<Button color="success" onClick={() => insertar()}>
						Insertar
					</Button>
					<Button color="danger" onClick={() => ocultarModalInsertar()}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>

			{/*MODAL ACTUALIZAR: PARA EDITAR UN PRODUCTO*/}
			<Modal isOpen={input.modalActualizar}>
				<ModalHeader>
					<div>
						<h3>Editar Categoria</h3>
					</div>
				</ModalHeader>

				<ModalBody>
					<FormGroup>
						<label>Id:</label>

						<input className="form-control" readOnly type="text" value={input.form.id} />
					</FormGroup>

					<FormGroup>
						<label>Categoría:</label>
						<input
							className="form-control"
							name="name"
							type="text"
							onChange={handleChange}
							value={input.form.name}
						/>
					</FormGroup>

					<FormGroup>
						<label>Descripción:</label>
						<input
							className="form-control"
							name="description"
							type="text"
							onChange={handleChange}
							value={input.form.description}
						/>
					</FormGroup>
				</ModalBody>

				<ModalFooter>
					<Button color="success" onClick={() => editar(input.form)}>
						Aceptar
					</Button>
					<Button color="danger" onClick={() => ocultarModalActualizar()}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
}
function mapStateToProps(state) {
	return {
		categories : state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addCategory    : (category) => dispatch(addCategory(category)),
		getCategory    : () => dispatch(getCategory()),
		deleteCategory : (id) => dispatch(deleteCategory(id)),
		putCategory    : (id) => dispatch(putCategory(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCrud);
