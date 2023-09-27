const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        difficulty: {
            type: DataTypes.INTEGER,
            validate: {min: 0, max: 5},
            allowNull: false
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        season: {
            type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
            allowNull: false
        }

    }, {timestamps: false})
}