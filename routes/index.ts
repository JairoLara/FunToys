import express from 'express';
const { Usuario } = require('../db/models');

const Product = require('../db/models/marca');    // Usamos require para el modelo de Product
const Purchase = require('../db/models/juguete'); // Usamos require para el modelo de Purchase

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


// Ruta para actualizar productos
router.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, discount, stock, image } = req.body;

  console.log("ID recibido:", productId); // Para verificar el ID
  console.log("Datos recibidos:", req.body); // Para verificar los datos

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updatedProduct = await product.update({
      name,
      description,
      price,
      discount,
      stock,
      image,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

// Ruta para eliminar productos
router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Buscar el producto por ID
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar el producto
    await product.destroy();

    // Devolver una respuesta exitosa
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

// Ruta para actualizar compras
router.put('/purchases/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, productId, quantity } = req.body;
  try {
    const purchaseToUpdate = await Purchase.findByPk(id);
    if (purchaseToUpdate) {
      await purchaseToUpdate.update({ userId, productId, quantity });
      res.status(200).json(purchaseToUpdate);
    } else {
      res.status(404).json({ message: 'Purchase not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating purchase', error });
  }
});

export default router;
