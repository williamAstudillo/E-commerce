const { DataTypes } = require('sequelize');

//S58 Creacion modelo reviews
module.exports = (sequelize) => {
	sequelize.define('reviews', {
		rating      : {
			type      : DataTypes.INTEGER,
			allowNull : false
		},
		description : {
			type         : DataTypes.TEXT,
			allowNull    : true,
			defaultValue : 'Sin Comentario por parte del usuario'
		}
	});
};
