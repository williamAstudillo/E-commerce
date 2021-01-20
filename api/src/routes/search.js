const server = require('express').Router();
const Op = require('sequelize').Op;
const { Product } = require('../db.js');

// * S23 - Crear ruta que retorne productos segun el keyword de busqueda
// GET /search?query={valor} - Retorna todos los productos que tengan {valor} en su nombre o descripcion.
server.get('/', (req, res) => {
	const query = req.query.query;
	Product.findAll({
		where : {
			[Op.or]: [
				{
					name : {
						[Op.iLike]: `%${query}%`
					}
				},
				{
					description : {
						[Op.iLike]: `%${query}%`
					}
				}
			]
		}
	}).then((result) => {
		res.json(result);
	});
});

module.exports = server;
