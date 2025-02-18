'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      this.hasMany(models.DetallePedido, {
        foreignKey: 'pedidoId',
        as: 'detalles',
      });
      this.hasOne(models.Pago, {
        foreignKey: 'pedidoId',
        as: 'pago',
      });
    }
  }
  Pedido.init(
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
          model: 'usuarios',
          key: 'id',
        },
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estadoEntrega: {
        type: DataTypes.ENUM('en espera', 'en proceso', 'entregado'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Pedido',
      tableName: 'pedidos',
    }
  );
  return Pedido;
};
