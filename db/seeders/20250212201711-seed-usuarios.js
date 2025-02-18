'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Admin1',
        email: 'admin1@jugueteria.com',
        contraseña: 'admin123',
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Admin2',
        email: 'admin2@jugueteria.com',
        contraseña: 'admin123',
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Juan Pérez',
        email: 'juanperez@cliente.com',
        contraseña: 'cliente123',
        rol: 'comprador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
