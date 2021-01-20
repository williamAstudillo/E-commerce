const server = require('express').Router();
const bcrypt = require('bcrypt');
//const multer = require('multer');
//const path = require('path');
//const fs = require('fs');
const { User, Order, Product, OrderLine } = require('../db.js');
const PORT = process.env.PORT || 3000;
const { DB_HOST } = process.env;

//const upload = multer({ dest: path.join(__dirname, '../public/uploads') });

// * S34 - Crear ruta para crear/agregar Usuario
server.post('/', (req, res) => {
	User.create({
		email            : req.body.email,
		first_name       : req.body.first_name,
		last_name        : req.body.last_name,
		country          : req.body.country,
		city             : req.body.city,
		shipping_address : req.body.shipping_address,
		password         : req.body.password
	})
		.then(() => {
			res.send('Usuario Ingresado Correctamente');
		})
		.catch((error) => {
			console.log('Error: ', error.message);
			res.status(400).send({ error: error.message });
		});
});

// * S36 - Crear ruta que retorne todos los Usuarios
server.get('/', (req, res, next) => {
	User.findAll({
		order : [ 'id' ]
	})
		.then((user) => {
			res.status(200).send(user);
		})
		.catch(next);
});

server.post('/:id', (req, res) => {
	let { first_name, last_name, email, country, city, shipping_address, role, image_profile } = req.body;
	if (req.file) {
		//let filetype = req.file.mimetype.split('/')[1];
		image_profile = `http://${DB_HOST}:${PORT}/static/${req.file.filename}`;
	}
	if (first_name && last_name && email && country && city && shipping_address != null) {
		User.findAll({
			where : {
				id : req.params.id
			}
		}).then((result) => {
			result[0].first_name = first_name;
			result[0].last_name = last_name;
			result[0].email = email;
			result[0].country = country;
			result[0].city = city;
			result[0].shipping_address = shipping_address;
			result[0].role = role;
			result[0].image_profile = image_profile;
			result[0].save();
			res.send('Usuario Actualizado Correctamente');
		});
	} else {
		res.status(400).send('Items para actualizacion del Usuario no se encuentran completos');
	}

	/* const { first_name, last_name, email, country, city, shipping_address, role, image_profile } = req.body;
	if (first_name && last_name && email && country && city && shipping_address != null) {
		User.findAll({
			where : {
				id : req.params.id
			}
		}).then((result) => {
			result[0].first_name = first_name;
			result[0].last_name = last_name;
			result[0].email = email;
			result[0].country = country;
			result[0].city = city;
			result[0].shipping_address = shipping_address;
			result[0].role = role;
			result[0].save();
			res.send('Usuario Actualizado Correctamente');
		});
	} else {
		res.status(400).send('Items para actualizacion del Usuario no se encuentran completos');
	} */
});

server.delete('/:id', (req, res) => {
	const user = req.params.id;
	User.destroy({
		where : {
			id : user
		}
	}).then(() => {
		res.send('Usuario Eliminado Correctamente');
	});
});

//S38 Crear Ruta para agregar Item al Carrito
server.post('/:userId/cart', (req, res) => {
	const { userId } = req.params;
	const { price, idProduct, units, ip } = req.body;
	Order.findOrCreate({
		include : [ { model: Product }, { model: User } ],
		where   : {
			ipAddress : ip,
			state     : 'carrito'
		}
	})
		.then((order) => {
			return order[0].addProduct(idProduct, {
				through : { price: price, units: units }
			});
		})
		.then((result) => {
			res.send(result);
		});
});

//S39 Crear Ruta que retorne todos los items del Carrito
server.get('/:userId/cart', (req, res) => {
	const { userId } = req.params;
	const { ip } = req.body;

	Order.findOrCreate({
		include : [ { model: Product } ],
		where   : {
			ipAddress : ip,
			state     : 'carrito'
		}
	}).then((result) => {
		res.send(result[0]);
	});
});

//S40 Crear Ruta para vaciar el carrito
server.delete('/:userId/cart', (req, res) => {
	const { userId } = req.params;
	const { ip } = req.body;

	Order.destroy({
		where : {
			ipAddress : ip,
			state     : 'carrito'
		}
	}).then((result) => {
		res.send('carrito elimiado correctamente');
	});
});

//Ruta para eliminar un item del carrito
server.delete('/:userId/cart/:idProduct/:ip', (req, res) => {
	const { userId, idProduct, ip } = req.params;

	console.log('llega la ip al delete del back', ip);
	Order.findOrCreate({
		include : [ { model: Product } ],
		where   : {
			ipAddress : ip,
			state     : 'carrito'
		}
	})
		.then((order) => {
			var idOrder = order[0].id;
			console.log('idOrder', idOrder);
			OrderLine.destroy({
				where : {
					orderId   : idOrder,
					productId : idProduct
				}
			});
		})
		.then((result) => {
			res.send('item elimiado correctamente');
		});
});

//prueba orderline get
server.get('/orderLine/:idProduct', (req, res) => {
	const { idProduct } = req.params;

	OrderLine.findOne({
		where : {
			orderId   : 4,
			productId : idProduct
		}
	}).then((result) => {
		res.send(result);
	});
});

//S41 crear ruta para editar las cantidades del carrito
server.put('/:userId/cart', (req, res) => {
	console.log('estan llegando los parametos', req.body);
	const { userId } = req.params;
	const { idProduct, price, units, ip } = req.body;
	Order.findOrCreate({
		include : [ { model: Product } ],
		where   : {
			ipAddress : ip,
			state     : 'carrito'
		}
	})
		.then((order) => {
			console.log('orden encontrada', order[0]);
			var idOrder = order[0].id;
			console.log('idOrder', idOrder);
			return OrderLine.findOne({
				where : {
					orderId   : idOrder,
					productId : idProduct
				}
			});
		})
		.then((orderline) => {
			orderline.units = units - 1;
			orderline.price = price;
			orderline.save();
			res.send(orderline);
		});
});

// S45: Retorna todas las ordenes de un usuario
server.get('/:id/orders', (req, res) => {
	const { id } = req.params;
	Order.findAll({
		include : [ { model: Product } ],
		where   : {
			userId : id
		}
	}).then((orders) => {
		res.json(orders);
	});
});
server.post('/:id/passwordReset', (req, res) => {
	var { id } = req.params;
	var { password } = req.body;
	User.findOne({
		where : {
			id
		}
	}).then((user) => {
		console.log(user);
		bcrypt.hash(password, bcrypt.genSaltSync(10)).then((hash) => {
			user.password = hash;
			user.save();
		});
		res.send(user);
	});
});

//* Asignar usuario al carrito y cambio de estado de la orden a procesando
server.put('/:userId/checkout', (req, res) => {
	const { userId } = req.params;
	let idOrder;
	Order.findOne({
		include : [ { model: Product } ],
		where   : {
			state : 'carrito'
		}
	})
		.then((order) => {
			order.state = 'creada';
			return order.save();
		})
		.then((orderProcessed) => {
			return orderProcessed.setUser(userId);
		})
		.then((orden) => {
			res.send(orden);
		});
});

//ruta prueba
server.get('/prueba', (req, res) => {
	User.findOrCreate({
		where : {
			email : 'usuario12@ecommerce.com'
		}
		// defaults: {
		//   email: 'wsastudilloa@gmail.com',
		//   first_name: 'William',
		//   last_name: 'astudillo',
		//   country: 'colombia',
		//   city: 'bogota',
		//   shipping_address: 'sdsd',
		//   password: 'sdsd',
		// },
	}).then((user) => {
		console.log('user', user);
		res.send(user);
	});
});
module.exports = server;
