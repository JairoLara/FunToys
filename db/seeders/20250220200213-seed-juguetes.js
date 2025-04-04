'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('juguetes', [
      {
        //LEGO
        nombre: 'LEGO Set de construccion Super Mario 71426 Planta Pirana 540 Piezas',
        descripcion: 'Modelo de exhibición construible Planta Piraña (71426): Disfruta de una aventura de construcción que te permitirá recrear al estilo LEGO los detalles más sutiles de un inconfundible personaje del universo Super Mario',
        precio: 1499.00,
        stock: 50,
        imagen: 'https://m.media-amazon.com/images/I/51lu7eJ0kOL._AC_SX522_.jpg',
        marcaId: 1, // Asegúrate de que la marca con ID 1 exista en la tabla `marcas`
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'LEGO® Marvel Armadura Robótica de Iron Man vs. Ultrón Juguete de superhéroes construible con Minifiguras, Set de construcción y Juego, Regalo para niños y niñas Desde 6 años 76307',
        descripcion: 'Juego con Iron Man para construir: Agiganta las emocionantes aventuras de superhéroes con el set Armadura Robótica de Iron Man vs. Ultrón para niños y niñas a partir de 6 años',
        precio: 349.00,
        stock: 30,
        imagen: 'https://m.media-amazon.com/images/I/81npJj0hCkL._AC_SY355_.jpg',
        marcaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Lego Casco del Mandaloriano',
        descripcion: 'Explora tu portentosa creatividad con este gratificante proyecto para adultos: el detallado modelo casco del mandaloriano para construir y exhibir',
        precio: 1799.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/815jsmzTHsL._AC_SY355_.jpg',
        marcaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'LEGO® Botanicals Ramo de Rosas con Set de Plantas Artificiales Decorativas para decoración de Interiores con Plantas Ornamentales Que se Pueden convertir en un Hermoso Centro de Mesa 10328',
        descripcion: 'Relájate al ver tus plantas artificiales decorativas para adultos volviéndose el centro de atención en tu hogar u oficina que te harán parecer todo un horticultor',
        precio: 1499.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/811u9CmAv6L._AC_SY355_.jpg',
        marcaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Hotwheels
      {
        nombre: 'Hot Wheels City, Autolavado de la Ciudad, Pista de Juguete para niños de 4 años en adelante Compatible con Otros Sets',
        descripcion: 'Cuando luchan contra las criaturas tóxicas, todos los vehículos necesita una buena limpieza en el set de juego Hot Wheels City Downtown Express Car Wash antes de abordar más aventuras. ¡Los geniales detalles brindan más realismo y diversión al juego de Push Around!',
        precio: 349.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71ABQRLRLPL._AC_SY355_.jpg',
        marcaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Hot Wheels RacerVerse Pista de Juguete Jurassic World para niños de 4 años en adelante',
        descripcion: 'Vehículos Hot Wheels RacerVerse Blue el Raptor y Owen se enfrentan en una carrera para escapar de la isla Jurassic World.',
        precio: 1099.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71DdP2vqIVL.__AC_SX300_SY300_QL70_ML2_.jpg',
        marcaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Hot Wheels RacerVerse Vehículo de Juguete Cuatro Autos de Carrera Jurassic World para niños de 3 años en adelante',
        descripcion: '¡Acepta el reto y crea la colección más espectacular de Hot Wheels!',
        precio: 591.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81xWr4xMODL._AC_SX425_.jpg',
        marcaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Hot Wheels Monster Trucks Pista de Juguete Arena de Demolición Glow in The Dark Gunkster para niños de 4 años en adelante',
        descripcion: '¡Lanza el Gunkster que brilla en la oscuridad hacia el monstruo de lodo brillante y derríbalo!',
        precio: 849.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/813iB+o2fSL._AC_SX425_.jpg',
        marcaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Megablock
      {
        nombre: 'MEGA Halo Juguete de Construcción Paquete de 20 Personajes Halo 2 para niños de 13 años en adelante',
        descripcion: 'Colección de 20 figuras de acción armables de Halo, que conmemoran el 20º aniversario de Halo 2.',
        precio: 1829.95,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/91mELY-t5BL._AC_SY355_.jpg',
        marcaId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'MEGA Pokémon Juguete de Construcción Dragonite para niños de 8 años en adelante',
        descripcion: 'Juego de construcción de Dragonite de 388 piezas con el innovador Motion Brick para un movimiento incorporado',
        precio: 949.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71eTGv3zDXL._AC_SY355_.jpg',
        marcaId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Mega Construx Pokémon, Equipo de Kanto, Juguete de Construcción para niños de 6 años en adelante',
        descripcion: 'Set de construcción de Pokémon para articulado y armable que incluye 4 figuras',
        precio: 629.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81PZTLwknQL._AC_SY355_.jpg',
        marcaId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'MEGA CONSTRUX™, Halo, Warthog del Fleetcom, Juguete Construcción, Juguetes para Niños de 13 años en adelante, Modelo de la versión Vista en la Nueva Serie de televisión',
        descripcion: 'Set de construcción de vehículo FLEETCOM Warthog inspirado en Halo: La serie',
        precio: 1399.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81pelLbrmTL._AC_SY355_.jpg',
        marcaId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Barbie
      {
        nombre: 'Barbie Signature Muñeca de Colección Inspiring Women Isabel Allende para niñas de 6 años en adelante',
        descripcion: 'Esta muñeca Barbie de la colección Inspiring Women rinde homenaje a Isabel Allende, una de las escritoras en español más leídas en el mundo. Incansable activista de los derechos sociales, la autora entrelaza lo personal y lo político en historias universales que inspiran a mantener la esperanza en el mundo.',
        precio: 899.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81sGzHaHwSL._AC_SY355_.jpg',
        marcaId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Barbie Detective La Gran Carrera de Caballos Muñeca Brooklyn Equitación para niñas de 3 años en adelante',
        descripcion: 'Muñeca Barbie Mysteries the Great Horse Chase',
        precio: 349.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/61fSWitV+PL._AC_SY450_.jpg',
        marcaId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Barbie Set de Juego Paseo de Perrito con Silla de Ruedas para niñas de 3 años en adelante',
        descripcion: 'DIVERSIÓN CON MASCOTAS. ¡Enamórate de este dúo de perritos con Barbie! El set de juego incluye un cachorro y un perro grande que tiene una silla de ruedas de apoyo que avanza de verdad',
        precio: 569.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71nOm3RdOVL._AC_SY450_.jpg',
        marcaId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Barbie Muñeca Fashionistas #194 con Cabello Negro Natural, además de Silla de Ruedas y rampa, con Mameluco de corazón arcoíris y Accesorios, Incluyendo Zapatos y aretes de aro',
        descripcion: 'Diseñado para reflejar el mundo que los niños ven hoy, esta diversa línea de Barbie Fashionistas muestra estilos brillantes y modernos que hacen que sea un sinfín de posibilidades de contar historias.',
        precio: 657.52,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71NINFkVr9L._AC_SY355_.jpg',
        marcaId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //UNO
      {
        nombre: 'Mattel Games, UNO Original, Juego de Cartas, Clásica Diversión, Original Mattel, Juego de Mesa Familiar, 7+ Años, Cartas de acción Especial y comodines, Diversión sin Límites',
        descripcion: 'UNO DE LOS JUEGOS MAS POPULARES - El juego clásico de cartas de hacer coincidir números y colores',
        precio: 119.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81kTVgT-W5L._AC_SY679_.jpg',
        marcaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Mattel Games UNO Juego de Cartas No Mercy para niños de 7 años en adelante',
        descripcion: 'El juego UNO Show em No Mercy añade 56 cartas más, reglas especiales y cartas de acción súper duras para la edición más brutal de UNO hasta la fecha.',
        precio: 299.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81DbUeNUBHL._AC_SY450_.jpg',
        marcaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Mattel Games UNO Stacko Juego para Dos Personas o más con Cartas para niños Desde los Siete años de Edad en adelante',
        descripcion: 'SORPRESA permanente en esta divertid variante de UNO: combina la habilidad de apilar con toda la diversión de UNO.',
        precio: 899.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71X0h-oCwCL._AC_SY355_.jpg',
        marcaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        nombre: 'Mattel Games, UNO Marvel Spider-Man, Juego de Cartas, Desata el Poder, Original Mattel, Juego de Mesa Familiar, 7+ Años',
        descripcion: 'MUNDO ARAÑA. ¡Experimenta la emoción con Uno Marvel Spider-Man! Cartas llenas de acción con gráficos inspirados en el cómic que te sumergirán en el mundo del Hombre Araña',
        precio: 149.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81LL4Ioia3L._AC_SY550_.jpg',
        marcaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Transformers
      {
        nombre: 'Transformers Juguetes Studio Series, Clase Viajero, Despertar de Las Bestias, 102 Optimus Prime, Figura de Acción Convertible de 16,5 cm, A Partir de 8 años',
        descripcion: 'OPTIMUS PRIME, DE TRANSFORMERS: EL DESPERTAR DE LAS BESTIAS: Esta figura 102 Optimus Prime, de la línea Transformers Studio Series, es completamente articulada para que la coloques en diferentes poses y cuenta con detalles y diseño inspirado en la película',
        precio: 854.17,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/716EVkoY4tL._AC_SY355_.jpg',
        marcaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        nombre: 'Transformers Studio Series, Clase de Lujo, One - Figura de acción Coleccionable de 114 Megatron',
        descripcion: 'MEGATRON DE TRANSFORMERS ONE: Esta figura 114 Megatron, de la línea Transformers Studio Series, es completamente articulada para que la coloques en diferentes poses, y cuenta con detalles y diseño inspirado en la película',
        precio: 649.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71fwh00wX7L._AC_SY355_.jpg',
        marcaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        nombre: 'Transformers Toys Studio Series Deluxe The The Movie 86-29 Bumblebee, Figura de acción de conversión de 4.5 Pulgadas, 8+',
        descripcion: 'Los transformadores: el buñuelo de la película: esta figura de acción Transformers Studio Series 86-29 Bumblebee está altamente articulada para su posabilidad y cuenta con decoración y detalles inspirados en películas',
        precio: 775.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71-Eba5f+ML._AC_SX425_.jpg',
        marcaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        nombre: 'Transformers: One, Prime Changers, Figura de acción de Sentinel Prime',
        descripcion: 'JUGUETE TRANSFORMERS CONVERTIBLE 2 EN 1 INSPIRADO EN LA PELÍCULA: Esta figura Transformers de Sentinel Prime está inspirada en la película Transformers: One y se convierte de robot en jet cybertroniano para duplicar la acción',
        precio: 384,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/61MOVtxCxoL._AC_SY355_.jpg',
        marcaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Monster High
      {
        nombre: 'MONSTER HIGH, Muñeca Draculaura, con Vestimenta de Moda y Accesorios, Edad 4 Años en Adelante, Juguete para Niñas, Inspirada en los vampiros, Capa elegante y escalofriante, Acompañada de su murciélago',
        descripcion: 'La escuela está de vuelta y los espíritus malignos de Monster High caminan por los pasillos con un estilo que te hará gritar.',
        precio: 749.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/712LncouLcL._AC_SY355_.jpg',
        marcaId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        nombre: 'Monster High Muñeca Creepover Twyla con un Atuendo detallado y Accesorios para niñas de 4 años en adelante',
        descripcion: 'Las muñecas Creepover Party de Monster High cuentan con un atuendo detallado y accesorios de pijamadas inspirados en sus exclusivas bufandas, además de una figura de mascota.',
        precio: 761.09,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/71RYQoKkP7L._AC_SY606_.jpg',
        marcaId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Monster High Muñeca Venus para niñas de 4 años en adelante',
        descripcion: 'La muñeca Monster High Venus luce un estilo fabuloso! Viene con montones de piezas para crear historias espantosas y espeluznantes.',
        precio: 749.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/81Js3xrXlhL._AC_SY450_.jpg',
        marcaId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Roblox
      {
        nombre: 'PIGGY Paquete de Cabeza (Incluye artículos DLC)',
        descripcion: 'Producto oficial de Piggy: producto original de PhatMojo.',
        precio: 941.49,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/51eyJCPrCvL._AC_SY450_.jpg',
        marcaId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'OMG ALL STORE Roblox Plush Buddies - Juguetes de peluche para aficionados, niños y amigos, regalos de muñeca de felpa (niños)',
        descripcion: 'La felpa Roblox está inspirada en el popular juego, linda forma de dibujos animados, con colores suaves, la imagen es vívida y realista, la gente no puede dejarla',
        precio:299.00,
        stock: 40,
        imagen: 'https://m.media-amazon.com/images/I/31JlKpndYcL._AC_SX522_.jpg',
        marcaId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('juguetes', null, {});
  },
};

