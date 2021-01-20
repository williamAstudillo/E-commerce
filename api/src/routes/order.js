const server = require('express').Router();
const { Product, Order, User, OrderLine } = require('../db.js');
const mailer = require('../templates/check-t');

// *S44 devuelva todos las ordenes por status
server.get('/', (req, res, next) => {
	var status = req.query.status;
	console.log('status', status);
	if (!status) {
		Order.findAll({
			include : {
				model : Product
			},
			order   : [
				'id'
			]
		})
			.then((orders) => {
				res.json(orders);
			})
			.catch(next);
	}
	else {
		return Order.findAll({
			include : {
				model : Product
			},
			where   : {
				state : status
			},
			order   : [
				'id'
			]
		})
			.then((orders) => {
				res.json(orders);
			})
			.catch(next);
	}
});

// *S44 devuelva todos las ordenes
server.get('/', (req, res, next) => {
	Order.findAll({
		include : {
			model : Product
		},
		order   : [
			'id'
		]
	})
		.then((orders) => {
			res.json(orders);
		})
		.catch(next);
});
// devuelve ordenes de un usuario en especifico
server.get('/user/:userId', (req, res, next) => {
	const { userId } = req.params;
	Order.findAll({
		include : {
			model : Product
		},
		where   : {
			userId
		},
		order   : [
			'id'
		]
	})
		.then((orders) => {
			res.json(orders);
		})
		.catch(next);
});

//S46 Retorna una orden en particular
server.get('/:id', (req, res, next) => {
	const { id } = req.params;
	Order.findOne({
		include : {
			model : Product
		},
		where   : { id: id }
	})
		.then((order) => {
			res.json(order);
		})
		.catch(next);
});

//S47 Ruta para modificar una orden de creada a Procesando
server.put('/procesar/:id', (req, res, next) => {
	const { id } = req.params;
	const { status, address, city, mail } = req.body;

	console.log('llega la siguiente info ', req.body, ' y se envía la siguiente al email', mail);
	Order.findOne({
		include : {
			model : Product
		},
		where   : { id: id }
	})
		.then((order) => {
			order.shippingAddress = address;
			order.city = city;
			order.state = status;
			order.save();
			res.json(order);
			mailer.enviar_mail(mail);
		})
		.catch(next);
});

server.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { status, address, city } = req.body;
	Order.findOne({
		include : {
			model : Product
		},
		where   : { id: id }
	})
		.then((order) => {
			order.shippingAddress = address;
			order.city = city;
			order.state = status;
			order.save();
			res.json(order);
			mailer.enviar_mail(status);
		})
		.catch(next);
});

/* // Añadir producto a orden
server.post('/:idOrder/:idProduct', (req, res) => {
	const idProduct = req.params.idProduct;
	const idOrder = req.params.idOrder;
	Order.findByPk(idOrder,{
 		include :  [{
            model : Product,
        }, 
         {model: OrderLine,
                    }
         ]  
    }).then((order) => {
        console.log("orden encontrada",order)
        return order.addProducts(idProduct , { through: { price:10, units:2}} );
    }).then((result) => {
        console.log("producto añadido en orden",result)
        res.send(result);
    }); 
});

	
 */

server.post('/mercadoPago', (req, res) => {
	var mercadopago = require('mercadopago');
	mercadopago.configurations.setAccessToken('TEST-5495572053479370-011522-1e0e8ce9d589f7f58d29c139b62bce6c-78199198');

	console.log(req.body);
	var payment_data = {
		transaction_amount : req.body.transactionAmount * 3500,
		description        : 'Orden de Compra Petectives',
		payment_method_id  : req.body.paymentMethod,
		payer              : {
			email : req.body.payerEmail,
		}
	};

	mercadopago.payment
		.create(payment_data)
		.then(function (data) {
			res.send(data);
		})
		.catch((error) => res.send(error));
});

module.exports = server;
