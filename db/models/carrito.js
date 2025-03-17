'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Carrito extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "usuarioId",
        as: "usuario",
      });
      this.belongsTo(models.Juguete, {
        foreignKey: "jugueteId",
        as: "juguete",
      });
    }
  }
  
  Carrito.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      jugueteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "juguetes",
          key: "id",
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Carrito",
      tableName: "carrito",
    }
  );

  return Carrito;
};
