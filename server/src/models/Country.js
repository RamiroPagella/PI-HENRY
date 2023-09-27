const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id: {
      type: DataTypes.STRING(3),
      AllowNull: false,
      primaryKey: true,
    },

    flagImage: {
      type: DataTypes.STRING
    },

    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },

    subregion: {
      type: DataTypes.STRING,
      allowNull: false
    },

    area: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {timestamps: false});
};