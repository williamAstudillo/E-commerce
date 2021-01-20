const server = require('express').Router();
const { Product, Category, Reviews, User } = require('../db.js');
const PORT = process.env.PORT || 3000;
const { DB_HOST } = process.env;

// *S21 - Crear ruta que devuelva todos los productos
server.get('/', (req, res, next) => {
	Product.findAll({
		include : [ { model: Category }, { model: User } ],
		order   : [ 'id' ]
	})
		.then((products) => {
			res.json(products);
		})
		.catch(next);
});

// *S17 - Crear ruta para agregar categorias de un producto.
server.post('/:idProduct/category/:idCategory', (req, res) => {
	const idProduct = req.params.idProduct;
	const idCategory = req.params.idCategory;
	Product.findByPk(idProduct, {
		include : {
			model : Category
		}
	})
		.then((product) => {
			return product.addCategories(idCategory);
		})
		.then((result) => {
			res.send(result);
		});
});

// *S17 - Crear ruta para sacar categorias de un producto.
server.delete('/:idProduct/category/:idCategory', (req, res) => {
	const idProduct = req.params.idProduct;
	const idCategory = req.params.idCategory;
	Product.findByPk(idProduct, {
		include : {
			model : Category
		}
	})
		.then((product) => {
			return product.removeCategories(idCategory);
		})
		.then((result) => {
			res.send({ productId: idProduct, categoryId: idCategory });
		})
		.catch((e) => console.log('errorr'));
});

// *S22 Crear Ruta que devuelva los productos de X categoria
server.get('/category/:nameCat', (req, res) => {
	const nameCat = req.params.nameCat;

	Product.findAll({
		include: {
			model: Category,
			where: {
				name: nameCat
			}
		}
	}).then((result) => {
		res.send(result);
	});
});

// *S24 - Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles
server.get('/:id', (req, res, next) => {
	const idProduct = req.params.id;
	Product.findByPk(idProduct, {
		include : [
			{
				model : Category
			},
			{
				model : User
			}
		]
	}).then((product) => {
		res.json(product);
	});
});

// * S25 Crear ruta para crear/agregar Producto
server.post('/', (req, res) => {
	let { name, description, price, stock, images } = req.body;
	console.log(name && description && price && stock != null);
	if (req.file) {
		images = `http://${DB_HOST}:${PORT}/static/${req.file.filename}`;
	}
	if (name && description && price && stock != null) {
		Product.create({
			name        : name,
			description : description,
			price       : price,
			stock       : stock,
			images      : images
		}).then((result) => {
			return res.send(result);
		});
	} else {
		res.status(400).send('Items para creacion del Producto no se encuentran completos');
	}
});

// * S26 - Crear ruta para modificar un Producto
server.post('/:id', (req, res) => {
	let { name, description, price, stock, images } = req.body;
	if (req.file) {
		images = `http://${DB_HOST}:${PORT}/static/${req.file.filename}`;
	}
	if (name && description && price && stock != null) {
		Product.findAll({
			where : {
				id : req.params.id
			}
		}).then((result) => {
			result[0].name = name;
			result[0].description = description;
			result[0].price = price;
			result[0].stock = stock;
			result[0].images = images;
			result[0].save();
			res.status(201).send(result);
		});
	} else {
		res.status(400).send('Items para actualizacion del Producto no se encuentran completos');
	}
});

// * S27 - Crear ruta para eliminar un Producto
server.delete('/:id', (req, res) => {
	const product = req.params.id;
	Product.destroy({
		where : {
			id : product
		}
	}).then(() => {
		res.send('Producto Eliminado Correctamente');
	});
});

// *  s54 Crear ruta para crear/agregar Review
server.post('/:id/review', (req, res) => {
	const { id } = req.params;
	const { rating, description, idUser } = req.body;

	Product.findOne({
		//vaya y busqueme el producto al que le quiero hacer el review
		include : [ { model: User } ], // incluye el modelo de usuario
		where   : {
			id : id //usando el id de producto
		}
	})
		.then((producto) => {
			return producto.addUser(idUser, {
				//al producto vinculemosle un usuario(en realidad un review que es lo que existe entre ellos dos usuario - producto)
				through : { rating: rating, description: description } // especifico los parametros de mi tabla intermedia
			});
		})
		.then((result) => {
			res.send(result);
		})
		.catch((e) => console.log('errorr añadiendo reviews ñeeeeeño'));
});

//S57 Ruta Get de reviews de un producto
server.get('/:id/review', (req, res) => {
	const idProduct = req.params.id;
	Reviews.findAll({
		where : {
			productId : idProduct
		}
	}).then((reviews) => {
		console.log('mostrame los reviews', reviews);
		res.send(reviews);
	});
});

//S56 Eliminar review
server.delete('/:productId/review/:idReview', (req, res) => {
	const { productId, idReview } = req.params;

	Reviews.destroy({
		where : {
			userId    : idReview,
			productId : productId
		}
	}).then(() => {
		res.send('Review Eliminada');
	});
});

//S55 Modificar review

server.put('/:productId/review/:idReview', (req, res) => {
	const { productId, idReview } = req.params;
	const { rating, description } = req.body;
	Reviews.findAll({
		where : {
			userId    : idReview,
			productId : productId
		}
	}).then((cambio) => {
		cambio[0].rating = rating;
		cambio[0].description = description;
		cambio[0].save();
		res.send(cambio);
	});
});

module.exports = server;
