'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('pedidos', [
      {
        usuarioId: 3,
        jugueteId: 1,
        cantidad: 5,
        total: 40,
        fecha: new Date('2024-03-07 10:00:00'),
        estadoEntrega: 'en espera',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('pedidos', null, {});
  },
};
