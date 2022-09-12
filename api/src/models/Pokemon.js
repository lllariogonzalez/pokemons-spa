const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLowerCase(value){
          if(value!==value.toLowerCase()) throw new Error("only lower case")
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        min: 30,
        max: 100
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 10,
        max: 100
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 10,
        max: 100
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 10,
        max: 100
      }
    },
    height: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
        max: 10
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
        max: 1000
      }
    }
  },{
        timestamps: false
    })
};
