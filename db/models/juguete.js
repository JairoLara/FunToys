'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juguete extends Model {
    static associate(models) {
      this.belongsTo(models.Marca, {
        foreignKey: 'marcaId',
        as: 'marca',
      });
    }
  }
  Juguete.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      marcaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'marcas',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Juguete',
      tableName: 'juguetes',
    }
  );
  return Juguete;
};
