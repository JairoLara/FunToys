'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('marcas', [
      { nombre: 'Lego', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Mattel', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('marcas', null, {});
  },
};
