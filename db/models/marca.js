'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Marca extends Model {
    static associate(models) {
      this.hasMany(models.Juguete, {
        foreignKey: 'marcaId',
        as: 'juguetes',
      });
    }
  }
  
  Marca.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imagen: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Marca',
      tableName: 'marcas',
      timestamps: true,
    }
  );
  
  return Marca;
};
