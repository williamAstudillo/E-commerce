const { DataTypes } = require('sequelize');

//S31 creación carrito orden
module.exports = (sequelize) => {
	sequelize.define('order', {
		state           : {
			type   : DataTypes.ENUM,
			values : [
				'carrito',
				'creada',
				'procesando',
				'cancelada',
				'completa'
			]
		},
		ipAddress       : {
			type      : DataTypes.STRING,
			allowNull : false
		},
		shippingAddress : {
			type : DataTypes.STRING
		},
		city            : {
			type : DataTypes.STRING
		}
	});
};
