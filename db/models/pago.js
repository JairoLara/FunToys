'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      this.belongsTo(models.Pedido, {
        foreignKey: 'pedidoId',
        as: 'pedido',
      });
    }
  }
  Pago.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'id',
        },
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      metodoPago: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaPago: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Pago',
      tableName: 'pagos',
    }
  );
  return Pago;
};
