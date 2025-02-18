'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallePedido extends Model {
    static associate(models) {
      this.belongsTo(models.Pedido, {
        foreignKey: 'pedidoId',
        as: 'pedido',
      });
      this.belongsTo(models.Juguete, {
        foreignKey: 'jugueteId',
        as: 'juguete',
      });
    }
  }
  DetallePedido.init(
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
      jugueteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'juguetes',
          key: 'id',
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DetallePedido',
      tableName: 'detalles_pedido',
    }
  );
  return DetallePedido;
};
