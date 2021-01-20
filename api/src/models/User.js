const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// COMPLETE: S30 - Crear Modelo de Usuario
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'sin identificador',
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'buyer',
      },
      image_profile: {
        type: DataTypes.STRING,
        defaultValue:
          'https://www.movilzona.es/app/uploads/2019/05/Foto-de-Perfil-en-WhatsApp.jpg',
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          bcrypt.hash(user.password, bcrypt.genSaltSync(10)).then((hash) => {
            user.password = hash;
            user.save();
          });
        },
      },

      /* instanceMethods : {
				validPassword(password) {
					return bcrypt.compare(password, this.password);
				}
			} */
    }
  );
};
