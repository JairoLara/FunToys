'use strict';

const marca = require("../models/marca");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('marcas', [
      { nombre: 'Lego', 
        imagen: 'https://www.edigitalagency.com.au/wp-content/uploads/lego-logo-png-transparent-background.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
        
      },
      { nombre: 'Hotwheels', 
        imagen: 'https://1000marcas.net/wp-content/uploads/2020/11/Hot-Wheels-Logo.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Megablock',
        imagen: 'https://mir-s3-cdn-cf.behance.net/projects/404/46c83f113752763.Y3JvcCw4MDgsNjMyLDAsMA.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Barbie', 
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Logo_barbie.png/1024px-Logo_barbie.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'UNO', 
        imagen: 'https://cdn.freelogovectors.net/wp-content/uploads/2022/03/uno-logo_freelogovectors.net_.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Transformers', 
        imagen: 'https://1000marcas.net/wp-content/uploads/2020/03/logo-Transformers.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Monster High', 
        imagen: 'https://1000logos.net/wp-content/uploads/2020/11/Monster-High-logo.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { nombre: 'Roblox', 
        imagen: 'https://download.logo.wine/logo/Roblox/Roblox-Logo.wine.png' ,
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
      
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('marcas', null, {});
  },
};
