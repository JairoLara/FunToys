import express from 'express';
const Usuario = require('../db/models/usuario');  // Usamos require para el modelo de Usuario
const Product = require('../db/models/marca');    // Usamos require para el modelo de Product
const Purchase = require('../db/models/juguete'); // Usamos require para el modelo de Purchase

const router = express.Router();



// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.findAll();

    // Si no hay usuarios
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

// Ruta para agregar productos
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, discount, stock, image } = req.body;

    if (!name || !description || !price || !stock || !image) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Crear el producto en la base de datos
    const newProduct = await Product.create({
      name,
      description,
      price,
      discount,
      stock,
      image
    });

    return res.status(201).json(newProduct); // Enviar el producto creado en la respuesta
  } catch (error) {
    console.error("Error al crear producto:", error); // Detallar el error
    return res.status(500).json({ error: 'Error al agregar producto' });
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
