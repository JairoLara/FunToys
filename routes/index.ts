import express from 'express';
import { default as User } from '../db/models/usuario';  
import { default as Product } from '../db/models/marca';  
import { default as Purchase } from '../db/models/juguete'; 


const router = express.Router();

import multer from 'multer';

const upload = multer();

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

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});


router.post('/users', async (req, res) => {
  const { name, lastname, phone, email } = req.body;
  try {
    const newUser = await User.create({ name, lastname, phone, email });
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});


router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// router.post('/products', async (req, res) => {
//   const { name, description, price, stock, Image } = req.body;
//   try {
//     const newProduct = await Product.create({ name, description, price, stock, Image });
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product', error });
//   }
// });

// Ruta para obtener compras del usuario
router.get('/api/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      include: [
        { model: User, attributes: ['name', 'lastname'] },
        { model: Product, attributes: ['name'] }
      ]
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener compras', error });
  }
});




router.post('/purchases', async (req, res) => {
  const { userId, productId, quantity, totalPrice, purchaseDate } = req.body;

  if (!userId || !productId || !quantity || !totalPrice || !purchaseDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or product not found' });
    }

    const newPurchase = await Purchase.create({
      userId,
      productId,
      quantity,
      totalPrice,
      purchaseDate,
    });

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Error creating purchase', error: error.message });
  }
});


router.get("/api/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      include: [
        { model: Product, attributes: ["name", "Image"] },
        { model: User, attributes: ["name", "lastname"] },
      ],
    });
    res.json(purchases);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).json({ error: "Error al obtener las compras." });
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, lastname, phone, email } = req.body;
  try {
    const userToUpdate = await User.findByPk(id);
    if (userToUpdate) {
      await userToUpdate.update({ name, lastname, phone, email });
      res.status(200).json(userToUpdate); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

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

export default router;
