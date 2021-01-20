const { DataTypes } = require('sequelize');


//S32 creación linea orden
module.exports = (sequelize) => {
	sequelize.define('orderLine', {
		price : {
			type      : DataTypes.FLOAT,
			allowNull : false
		},
		units : {
			type      : DataTypes.INTEGER,
			allowNull : false
		}
	});

};
