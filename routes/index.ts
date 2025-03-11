import express from 'express';
const {Usuario} = require('../db/models');
const {Juguete} = require('../db/models'); 
const {Marca} = require('../db/models')
const {Pedido} = require('../db/models'); 
const {Favorito} = require('../db/models')

const router = express.Router();



// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios.' });
    }

    // Si hay usuarios, devolverlos en la respuesta
    return res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

//obtener marcas

router.get('/marca', async (req, res) => {
  try {
    const marca = await Marca.findAll();

    if (marca.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios.' });
    }

    // Si hay marcas, devolverlos en la respuesta
    return res.json(marca);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});
// Agregar marca
router.post('/marca', async (req, res) => {
  try {
    const { nombre, imagen } = req.body;

    // Validar que los campos necesarios estén presentes
    if (!nombre || !imagen) {
      return res.status(400).json({ message: 'El nombre y la imagen de la marca son requeridos.' });
    }

    // Crear la nueva marca en la base de datos
    const nuevaMarca = await Marca.create({
      nombre,
      imagen,
    });

    // Devolver la marca creada como respuesta
    return res.status(201).json({
      id: nuevaMarca.id,
      nombre: nuevaMarca.nombre,
      imagen: nuevaMarca.imagen,
      createdAt: nuevaMarca.createdAt,
      updatedAt: nuevaMarca.updatedAt,
    });
  } catch (error) {
    console.error('Error al crear la marca:', error);
    return res.status(500).json({ message: 'Error al crear la marca' });
  }
});

//login 
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    if (usuario.contraseña !== contraseña) {
      return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      id: usuario.id,
      rol: usuario.rol,       
      nombre: usuario.nombre 
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

//registro
router.post('/register', async (req, res) => {
  const { nombre, email, contraseña, rol } = req.body;
  
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado' });
    }
    
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña,
      rol
    });
    
    return res.status(201).json({ success: true, message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
  }
});
// Jugueets
router.get('/juguetes', async (req, res) => {
  try {
    const juguetes = await Juguete.findAll({
      include: {
        model: Marca,
        as: 'marca',
        attributes: ['nombre'], 
      },
    });

    if (juguetes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron juguetes.' });
    }

    
    const juguetess = juguetes.map(juguete => ({
      id: juguete.id,
      nombre: juguete.nombre,
      descripcion: juguete.descripcion,
      precio: juguete.precio,
      stock: juguete.stock,
      imagen: juguete.imagen,
      marca: juguete.marca ? juguete.marca.nombre : null, 
      createdAt: juguete.createdAt,
      updatedAt: juguete.updatedAt
    }));

    return res.json(juguetess);
  } catch (error) {
    console.error('Error al obtener los juguetes:', error);
    return res.status(500).json({ message: 'Error al obtener los juguetes' });
  }
});
// agregar jug.
router.post('/juguetes', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen, marcaId } = req.body;

    if (!nombre || !descripcion || !precio || !stock || !imagen || !marcaId) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const nuevoJuguete = await Juguete.create({
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      marcaId,
    });

    return res.status(201).json({
      id: nuevoJuguete.id,
      nombre: nuevoJuguete.nombre,
      descripcion: nuevoJuguete.descripcion,
      precio: nuevoJuguete.precio,
      stock: nuevoJuguete.stock,
      imagen: nuevoJuguete.imagen,
      marcaId: nuevoJuguete.marcaId,
      createdAt: nuevoJuguete.createdAt,
      updatedAt: nuevoJuguete.updatedAt,
    });
  } catch (error) {
    console.error('Error al crear el juguete:', error);
    return res.status(500).json({ message: 'Error al crear el juguete' });
  }
});


// Obtener productos de una marca específica
router.get('/:id/juguetes', async (req, res) => {
  try {
      const { id } = req.params;
      
      // Buscar la marca y sus productos
      const marca = await Marca.findByPk(id, {
          include: { model: Juguete, as: 'juguetes' }
      });

      if (!marca) {
          return res.status(404).json({ message: 'Marca no encontrada' });
      }

      res.json({
          id: marca.id,
          nombre: marca.nombre,
          imagen: marca.imagen,
          productos: marca.juguetes
      });
  } catch (error) {
      console.error('Error al obtener productos de la marca:', error);
      res.status(500).json({ message: 'Error del servidor' });
  }
});

router.put('/juguetes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen, marcaId } = req.body;

    const juguete = await Juguete.findByPk(id);
    if (!juguete) {
      return res.status(404).json({ message: 'Juguete no encontrado' });
    }

    // Actualizar el juguete con los nuevos datos
    await juguete.update({
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      marcaId,
    });

    return res.json({ success: true, message: 'Juguete actualizado correctamente', juguete });
  } catch (error) {
    console.error('Error al actualizar el juguete:', error);
    return res.status(500).json({ message: 'Error al actualizar el juguete' });
  }
});


// Eliminar un juguete
router.delete('/juguetes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const juguete = await Juguete.findByPk(id);
    if (!juguete) {
      return res.status(404).json({ message: 'Juguete no encontrado' });
    }

    await juguete.destroy();

    return res.json({ message: 'Juguete eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el juguete:', error);
    return res.status(500).json({ message: 'Error al eliminar el juguete' });
  }
});


//Elimina la fakin marca
router.delete('/marca/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la marca
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }

    // Eliminar todos los productos de esa marca
    await Juguete.destroy({ where: { marcaId: id } });

    // Eliminar la marca
    await Marca.destroy({ where: { id } });

    return res.json({ message: 'Marca y sus productos eliminados exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la marca:', error);
    return res.status(500).json({ message: 'Error al eliminar la marca' });
  }
});

//Editar la marca
router.put('/marca/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, imagen } = req.body;

    // Buscar la marca
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }

    // Actualizar la marca
    await marca.update({ nombre, imagen });

    return res.json({ message: 'Marca actualizada correctamente', marca });
  } catch (error) {
    console.error('Error al actualizar la marca:', error);
    return res.status(500).json({ message: 'Error al actualizar la marca' });
  }
});

router.post("/guardar", async (req, res) => {
  try {
    const { usuarioId, jugueteId, cantidad, total } = req.body;

    if (!usuarioId || !jugueteId || !cantidad || !total) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const nuevoPedido = await Pedido.create({
      usuarioId,
      jugueteId,
      cantidad,
      total,
      estadoEntrega: "en espera", // Estado inicial del pedido
      fecha: new Date()
    });

    res.status(201).json({ mensaje: "Pedido guardado exitosamente", pedido: nuevoPedido });
  } catch (error) {
    console.error("Error al guardar el pedido:", error);
    res.status(500).json({ error: "No se pudo guardar el pedido" });
  }
});

//favoritos
router.post("/favorito", async (req, res) => {
  try {
    const { usuarioId, jugueteId } = req.body;

    // Validar que los campos necesarios estén presentes
    if (!usuarioId || !jugueteId) {
      return res.status(400).json({ error: "usuarioId y jugueteId son obligatorios." });
    }

    // Verificar si el juguete ya está en favoritos
    const favoritoExistente = await Favorito.findOne({
      where: { usuarioId, jugueteId }
    });

    if (favoritoExistente) {
      return res.status(400).json({ error: "El juguete ya está en favoritos." });
    }

    // Crear el nuevo favorito
    const nuevoFavorito = await Favorito.create({
      usuarioId,
      jugueteId,
    });

    // Responder con éxito
    res.status(201).json({ mensaje: "Juguete agregado a favoritos", favorito: nuevoFavorito });
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
    res.status(500).json({ error: "No se pudo agregar el juguete a favoritos" });
  }
});
//obt. fav
router.get("/favoritos/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;

    if (!usuarioId) {
      return res.status(400).json({ error: "usuarioId es obligatorio." });
    }

    const favoritos = await Favorito.findAll({
      where: { usuarioId },
      include: [
        {
          model: Juguete,
          as: "juguete",
        },
      ],
    });

    console.log("Favoritos encontrados:", favoritos); // 🔍 Verifica en consola

    if (favoritos.length === 0) {
      return res.status(404).json({ mensaje: "No tienes favoritos." });
    }

    res.status(200).json(favoritos);
  } catch (error) {
    console.error("Error al recuperar los favoritos:", error);
    res.status(500).json({ error: "No se pudo recuperar los favoritos." });
  }
});
//eliminar fav
router.delete("/favorito", async (req, res) => {
  try {
    const { usuarioId, jugueteId } = req.body;

    if (!usuarioId || !jugueteId) {
      return res.status(400).json({ error: "usuarioId y jugueteId son obligatorios." });
    }

    // Buscar y eliminar el favorito
    const favorito = await Favorito.findOne({
      where: { usuarioId, jugueteId },
    });

    if (!favorito) {
      return res.status(404).json({ error: "El juguete no está en favoritos." });
    }

    await favorito.destroy(); // Elimina el favorito de la base de datos

    res.status(200).json({ mensaje: "Juguete eliminado de favoritos." });
  } catch (error) {
    console.error("Error al eliminar de favoritos:", error);
    res.status(500).json({ error: "No se pudo eliminar el juguete de favoritos." });
  }
});

export default router;
