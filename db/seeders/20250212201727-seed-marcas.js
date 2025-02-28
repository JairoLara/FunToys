'use strict';

const marca = require("../models/marca");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('marcas', [
      { nombre: 'Lego', 
        imagen: 'src/lego-min 1.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
        
      },
      { nombre: 'Hotwheels', 
        imagen: 'src/Hot-Wheels-Logo.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Megablock',
        imagen: 'src/Mega_Logo 1.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Barbie', 
        imagen: 'src/Logo_barbie.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'UNO', 
        imagen: 'src/UNO.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Transformers', 
        imagen: 'src/Transformers.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Monster High', 
        imagen: 'src/monster_high_logo_by_rikorocky_d8768wi-fullview.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Roblox', 
        imagen: 'src/image 4.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
      
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('marcas', null, {});
  },
};
