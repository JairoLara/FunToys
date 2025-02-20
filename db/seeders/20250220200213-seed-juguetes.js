'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('juguetes', [
      {
        nombre: 'Carro de Carrera',
        descripcion: 'Un carro de juguete a control remoto con luces y sonidos.',
        precio: 29.99,
        stock: 50,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQH_7tl-s0eoOkyCVvnMa7yp1gatkPlW3ag&s',
        marcaId: 1, // Asegúrate de que la marca con ID 1 exista en la tabla `marcas`
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Muñeca Interactiva',
        descripcion: 'Muñeca que habla y responde al tacto.',
        precio: 19.99,
        stock: 30,
        imagen: 'https://example.com/imagenes/muneca.jpg',
        marcaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Bloques de Construcción',
        descripcion: 'Set de 100 piezas para construir estructuras divertidas.',
        precio: 24.99,
        stock: 40,
        imagen: 'https://example.com/imagenes/bloques.jpg',
        marcaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('juguetes', null, {});
  },
};

