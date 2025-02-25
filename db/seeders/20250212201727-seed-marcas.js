'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('marcas', [
      { nombre: 'Lego', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Hotwheels', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Megablock', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Barbie', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'UNO', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Transformers', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Monster High', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Roblox', createdAt: new Date(), updatedAt: new Date() }
      
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('marcas', null, {});
  },
};
