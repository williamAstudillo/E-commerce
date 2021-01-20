const server = require('express').Router();
const { Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Category.findAll({
		order : [ 'id' ]
	})
		.then((category) => {
			res.send(category);
		})
		.catch(next);
});

// * S18 - Crear ruta para crear/agregar Categoria
server.post('/', (req, res) => {
	Category.create({
		name        : req.body.name,
		description : req.body.description
	}).then((result) => {
		res.send(result);
	});
});

// * S19 - Crear ruta para eliminar Categoria
server.delete('/:id', (req, res) => {
	const category = req.params.id;
	Category.destroy({
		where : {
			id : category
		}
	}).then((result) => {
		res.send('Categoria Eliminada Correctamente');
	});
});

// * S20 - Crear ruta para modificar Categoria
server.put('/:id', (req, res) => {
	const { name, description } = req.body;
	if (name && description != null) {
		Category.findAll({
			where : {
				id : req.params.id
			}
		}).then((result) => {
			result[0].name = req.body.name;
			result[0].description = req.body.description;
			result[0].save();
			return res.status(201).send(result);
			//res.send('Categoria Actualizada Correctamente');
		});
	} else {
		res.status(400).send('Items para actualizacion de la categoria  no se encuentran completos');
	}
});

module.exports = server;
