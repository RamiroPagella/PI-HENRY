"use strict";

const {
  DataTypes,
  Sequelize
} = require('sequelize');
module.exports = sequelize => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5
      },
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    season: {
      type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
      allowNull: false
    }
  }, {
    define: {
      primaryKey: 'uuid'
    }
  });
};