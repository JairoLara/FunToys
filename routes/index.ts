import express from 'express';
const {Usuario} = require('../db/models');
const {Juguete} = require('../db/models'); 
const {Marca} = require('../db/models')

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
    
    return res.status(200).json({ success: true, message: 'Login exitoso' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
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


export default router;
