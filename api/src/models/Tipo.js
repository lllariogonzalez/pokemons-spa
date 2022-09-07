const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {
    sequelize.define('Tipo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    })
}