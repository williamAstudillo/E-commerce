import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {
	addProduct,
	getProduct,
	putProduct,
	deleteProduct,
	getCategory,
	postCategoryProduct,
	deleteCategoryProduct
} from '../../actions/actions';

import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

var index = 0;
var newCatForm = [];
var deleteCatForm = [];

function FormCrud({
	addProduct,
	getProduct,
	putProduct,
	products,
	deleteProduct,
	getCategory,
	postCategoryProduct,
	deleteCategoryProduct
}) {
	const [ input, setInput ] = useState({
		isGoing                : false,
		temp                   : [],
		data                   : [],
		modalInsertarCategoria : false,
		modalInsertar          : false,
		modalActualizar        : false,
		categories             : [],
		auxCategories          : [],
		form                   : {
			id             : '',
			name           : '',
			description    : '',
			price          : '',
			stock          : '',
			images         : '',
			categoriesForm : []
		}
	});
	const [ picture, setPicture ] = useState('');
	const [ uploaded, setUploaded ] = useState('');

	useEffect(
		() => {
			// setInput({ ...input, categories: products.categories});

			if (!input.temp[0] || !input.auxCategories[0]) {
				if (!input.temp[0]) {
					getProduct();
					setInput({ ...input, data: products.products, temp: products.products });
					if (index < products.products.length) index = products.products.length;
				}
				if (!input.auxCategories[0]) {
					getCategory();
					setInput({ ...input, categories: products.categories, auxCategories: products.categories });
				}
			}
		},
		[ products.products, products.categories ]
	);

	function eliminar(id) {
		const newData = input.data.filter((item) => item.id !== id);
		deleteProduct(id);
		setInput({ ...input, data: newData });
	}

	const insertar = async () => {
		if (
			isNaN(input.form.price) ||
			isNaN(input.form.stock) ||
			input.form.name === '' ||
			/* input.form.images === '' || */
			input.form.description === '' ||
			input.form.price === '' ||
			input.form.stock === ''
		)
			return alert('Data fields should not be empty and/or price/qty is not a number');
		else {
			index++;
			let dataProd = new FormData();

			dataProd.append('image', picture);
			dataProd.append('name', input.form.name);
			dataProd.append('description', input.form.description);
			dataProd.append('price', input.form.price);
			dataProd.append('stock', input.form.stock);

			/* addProduct(valorNuevo); */
			await addProduct(dataProd);

			var valorNuevo = {
				id          : index,
				name        : input.form.name,
				description : input.form.description,
				price       : input.form.price,
				stock       : input.form.stock,
				images      : products.products[products.products.length - 1].images,
				categories  : []
			};

			//valorNuevo.id = index;
			input.form.id = index;
			var lista = input.data;
			lista.push(valorNuevo);
			setInput({ ...input, modalInsertar: false, data: lista, modalInsertarCategoria: true });
			setPicture();
			setUploaded();
		}
	};

	const editar = async (form) => {
		if (
			isNaN(input.form.price) ||
			isNaN(input.form.stock) ||
			input.form.name === '' ||
			input.form.images === '' ||
			input.form.description === '' ||
			input.form.price === '' ||
			input.form.stock === ''
		)
			return alert('Data fields should not be empty and/or price/qty is not a number');
		else {
			var contador = 0;
			var arreglo = input.data;
			let dataProdUp = new FormData();

			dataProdUp.append('image', picture);
			dataProdUp.append('id', input.form.id);
			dataProdUp.append('name', input.form.name);
			dataProdUp.append('description', input.form.description);
			dataProdUp.append('price', input.form.price);
			dataProdUp.append('stock', input.form.stock);
			dataProdUp.append('images', input.form.images);

			/* putProduct(input.form); */
			await putProduct(dataProdUp);
			var aInsertar = [];
			input.data.map((producto) => {
				if (form.id === producto.id) {
					arreglo[contador].name = form.name;
					arreglo[contador].description = form.description;
					arreglo[contador].price = form.price;
					arreglo[contador].stock = form.stock;
					arreglo[contador].images = products.products[contador].images;

					var categoriesId = [];
					for (let j = 0; j < arreglo[contador].categories.length; j++) {
						categoriesId.push(arreglo[contador].categories[j].id);
					}
					for (let i = 0; i < form.categoriesForm.length; i++) {
						if (!categoriesId.includes(form.categoriesForm[i].id)) {
							aInsertar.push(form.categoriesForm[i]);
							arreglo[contador].categories.push(form.categoriesForm[i]);
						}
					}

					for (let k = 0; k < deleteCatForm.length; k++) {
						arreglo[contador].categories = arreglo[contador].categories.filter(
							(x) => x.id !== deleteCatForm[k].id
						);
					}

					form.categoriesForm = arreglo[contador].categories;
					insertarCategorias();
					eliminarCategorias();
				}
				contador++;
			});
			//console.log(input.form);

			var form1 = {
				id             : '',
				name           : '',
				description    : '',
				price          : '',
				stock          : '',
				images         : '',
				categoriesForm : []
			};

			setInput({
				...input,
				data            : arreglo,
				modalActualizar : false,
				form            : form1
			});
			setPicture();
			setUploaded();
		}
	};

	const insertarCategorias = () => {
		console.log('products.productscategorias-------', products.products);
		input.form.categoriesForm.map((x) => {
			var obj = {
				a : input.form.id,
				b : x.id
			};
			postCategoryProduct(obj);
		});
		var arr = input.data;
		// arr[input.form.id-1].categories=input.form.categoriesForm
		arr.map((e) => {
			if (e.id === input.form.id) {
				e.categories = input.form.categoriesForm;
			}
		});
		arr.map((e) => {
			if (e.id === input.form.id) {
				e.images = products.products[products.products.length - 1].images;
			}
		});

		newCatForm = [];
		var form1 = {
			id             : '',
			name           : '',
			description    : '',
			price          : '',
			stock          : '',
			images         : '',
			categoriesForm : []
		};
		setInput({
			...input,
			modalInsertarCategoria : false,
			form                   : form1,
			data                   : arr
		});
		// setInput({
		// 	...input,
		// 	data:products.pro
		// })
	};

	const eliminarCategorias = () => {
		deleteCatForm.map((x) => {
			var obj = {
				a : input.form.id,
				b : x.id
			};
			deleteCategoryProduct(obj);
		});
		deleteCatForm = [];
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
		setUploaded('');
		setPicture('');
	};

	//Activar Pop Up de Edicion
	const mostrarModalActualizar = (producto) => {
		const formAux = {
			id             : producto.id,
			name           : producto.name,
			description    : producto.description,
			price          : producto.price,
			stock          : producto.stock,
			images         : producto.images,
			categoriesForm : producto.categories
		};

		setInput({
			...input,
			modalActualizar : true,
			form            : formAux
		});
	};

	//Desactivar Pop Up de Edicion
	const ocultarModalActualizar = () => {
		newCatForm = [];
		var form1 = {
			id             : '',
			name           : '',
			description    : '',
			price          : '',
			stock          : '',
			images         : '',
			categoriesForm : []
		};

		setInput({
			...input,
			form            : form1,
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

	const handleChangeDelete = (name) => {
		var arr = input.form.categoriesForm;
		var eliminar = input.form.categoriesForm;
		var find = arr.filter((e) => e.name !== name);
		deleteCatForm.push(eliminar.filter((e) => e.name === name)[0]);
		setInput({
			...input,
			form : {
				...input.form,
				categoriesForm : find
			}
		});
	};

	function handleInputChange(evento) {
		var arrFind = input.form.categoriesForm;
		var find = arrFind.find((i) => i.name === evento.target.name);
		var find2 = newCatForm.find((i) => i.name === evento.target.name);

		if (!find || !find2) {
			newCatForm = [];
			input.form.categoriesForm.map((i) => newCatForm.push(i));
		}

		if (evento.target.checked && !find) {
			var arr = input.auxCategories;
			arr.map((i) => {
				if (i.name === evento.target.name) {
					newCatForm.push(i);
					setInput({
						...input,
						form : {
							...input.form,
							categoriesForm : newCatForm
						}
					});
				}
			});
		} else if (!find && !evento.target.checked) {
			var arr = newCatForm.filter((i) => i.name !== evento.target.name);
			newCatForm = arr;
			setInput({
				...input,
				form : {
					...input.form,
					categoriesForm : input.form.categoriesForm.filter((i) => i.name !== evento.target.name)
				}
			});
		}
	}
	function handleInputChangeInsert(evento) {
		var arrFind = input.form.categoriesForm;
		var find = arrFind.find((i) => i.name === evento.target.name);
		var find2 = newCatForm.find((i) => i.name === evento.target.name);

		if (!find || !find2) {
			newCatForm = [];
			input.form.categoriesForm.map((i) => newCatForm.push(i));
		}

		if (evento.target.checked && !find) {
			var arr = input.auxCategories;
			arr.map((i) => {
				if (i.name === evento.target.name) {
					newCatForm.push(i);
					setInput({
						...input,
						form : {
							...input.form,
							categoriesForm : newCatForm
						}
					});
				}
			});
		} else if (!evento.target.checked) {
			var arr = newCatForm.filter((i) => i.name !== evento.target.name);
			newCatForm = arr;
			setInput({
				...input,
				form : {
					...input.form,
					categoriesForm : input.form.categoriesForm.filter((i) => i.name !== evento.target.name)
				}
			});
		}
		console.log(newCatForm);
	}

	const ocultarModalInsertarCategoria = () => {
		var form1 = {
			id             : '',
			name           : '',
			description    : '',
			price          : '',
			stock          : '',
			images         : '',
			categoriesForm : []
		};

		setInput({
			...input,
			modalInsertarCategoria : false,
			form                   : form1
		});
	};

	const handleChangeImg = (e) => {
		setPicture(e.target.files[0]);
		setUploaded(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<Fragment>
			<Container>
				<br />
				<div className="d-flex flex-row-reverse">
					<Button color="success" size="lg" onClick={() => mostrarModalInsertar()}>
						Insert New Product
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
							<th>Price</th>
							<th>Cantidad</th>
							<th>Categories</th>
							{/* <th>Image</th> */}
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{input.data.map((e) => (
							<tr>
								<td>{e.id}</td>
								<td>{e.name}</td>
								<td>{e.description}</td>
								<td>${e.price}</td>
								<td>{e.stock}</td>
								<td>{e.categories && e.categories.map((i) => <td>{i.name}</td>)}</td>
								{/* <td>
									<img src={e.images} width="150" height="200" border="5" alt="product" />
								</td> */}
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

				<br />
				<br />
				<LinkContainer to="/crudcategory">
					<Button color="primary" size="lg">
						Ver Formulario Edición Categorias
					</Button>
				</LinkContainer>

				<br />
				<br />
			</Container>

			{/*MODAL ACTUALIZAR: PARA EDITAR UN PRODUCTO*/}
			<Modal isOpen={input.modalActualizar}>
				<ModalHeader>
					<div>
						<h3>Editar Producto</h3>
					</div>
				</ModalHeader>

				<ModalBody>
					<FormGroup>
						<label>Id:</label>

						<input className="form-control" readOnly type="text" value={input.form.id} />
					</FormGroup>

					<FormGroup>
						<label>Titulo:</label>
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

					<FormGroup>
						<label>Precio:</label>
						<input
							className="form-control"
							name="price"
							type="text"
							onChange={handleChange}
							value={input.form.price}
						/>
					</FormGroup>

					<FormGroup>
						<label>Cantidad:</label>
						<input
							className="form-control"
							name="stock"
							type="text"
							onChange={handleChange}
							value={input.form.stock}
						/>
					</FormGroup>

					<FormGroup>
						<div>
							<label>Imagen:</label>
						</div>
						<img className="img-fluid rounded w-25" src={uploaded || input.form.images} alt="producto" />
					</FormGroup>

					<FormGroup>
						<input
							className="form-control"
							name="image"
							type="file"
							id="image"
							accept=".png, .jpg, .jpeg"
							onChange={handleChangeImg}
						/>
					</FormGroup>

					<FormGroup>
						<label>Categorias:</label>
						{console.log(input.auxCategories)}
						{input.auxCategories.map((i) => (
							<label>
								{i.name}
								<input name={i.name} type="checkbox" onChange={handleInputChange} />
							</label>
						))}

						{input.form.categoriesForm.map((e, indice) => (
							<div>
								{e.name}
								<button onClick={() => handleChangeDelete(e.name)}>X</button>
							</div>
						))}
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

			{/*MODAL INSERTAR CATEGORIA*/}
			<Modal isOpen={input.modalInsertarCategoria}>
				<ModalBody>
					<ModalHeader>
						<div>
							<h3>Insertar Categoria</h3>
						</div>
					</ModalHeader>
					<FormGroup>
						<label>Categorias:</label>
						{input.categories.map((i) => (
							<label>
								{i.name}
								<input name={i.name} type="checkbox" onChange={handleInputChangeInsert} />
							</label>
						))}
					</FormGroup>
				</ModalBody>

				<ModalFooter>
					<Button color="success" onClick={() => insertarCategorias()}>
						Aceptar
					</Button>
					<Button color="danger" onClick={() => ocultarModalInsertarCategoria()}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>

			{/*MODAL INSERTAR: PARA AGREGAR PRODUCTOS*/}
			<Modal isOpen={input.modalInsertar}>
				<ModalHeader>
					<div>
						<h3>Insertar Producto</h3>
					</div>
				</ModalHeader>

				<ModalBody>
					<FormGroup>
						<label>Id:</label>

						<input className="form-control" readOnly type="text" value={index + 1} />
					</FormGroup>

					<FormGroup>
						<label>Titulo:</label>
						<input className="form-control" name="name" type="text" onChange={handleChange} />
					</FormGroup>

					<FormGroup>
						<label>Descripción:</label>
						<input className="form-control" name="description" type="text" onChange={handleChange} />
					</FormGroup>

					<FormGroup>
						<label>Precio:</label>
						<input className="form-control" name="price" type="text" onChange={handleChange} />
					</FormGroup>

					<FormGroup>
						<label>Cantidad:</label>
						<input className="form-control" name="stock" type="text" onChange={handleChange} />
					</FormGroup>

					<FormGroup>
						<label>Imagen:</label>
						<input
							className="form-control"
							name="image"
							type="file"
							id="image"
							accept=".png, .jpg, .jpeg"
							onChange={handleChangeImg}
						/>
					</FormGroup>

					{uploaded ? (
						<FormGroup>
							<img className="img-fluid rounded w-25" src={uploaded} alt="producto" />
						</FormGroup>
					) : null}
				</ModalBody>

				<ModalFooter>
					<Button color="success" onClick={() => insertar()}>
						Aceptar
					</Button>
					<Button color="danger" onClick={() => ocultarModalInsertar()}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
}

function mapStateToProps(state) {
	return {
		products : state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		putProduct            : (id) => dispatch(putProduct(id)),
		addProduct            : (product) => dispatch(addProduct(product)),
		getProduct            : () => dispatch(getProduct()),
		deleteProduct         : (id) => dispatch(deleteProduct(id)),
		getCategory           : () => dispatch(getCategory()),
		postCategoryProduct   : (id) => dispatch(postCategoryProduct(id)),
		deleteCategoryProduct : (id) => dispatch(deleteCategoryProduct(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCrud);
