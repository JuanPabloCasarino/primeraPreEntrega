import {
  Router
} from 'express';

const router = Router();
const products = [];

import ProductManager from "../productManager.js";
const productManager = new ProductManager('products.json');

router.get('/api/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtenemos el query param limit (si existe)
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, limit)); // Si existe limit, devolvemos sólo los primeros 'limit' productos
    } else {
      res.json(products); // Si no existe limit, devolvemos todos los productos
    }
  } catch (error) {
    console.error(error);
  }
})

router.get('api/products:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productManager.getProductById(id);

    if (!product) {
      return console.log('Product not found');
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
  }
});

// Agregar products
router.post('/', async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const {
    id,
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  } = await req.body;

  // Verificar que los campos obligatorios estén presentes
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios'
    });
  }

  // Crear el objeto del nuevo producto
  const newProduct = {
    id: id,
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || []
  };

  // Agregar el nuevo producto al objeto JavaScript
  productManager.addProduct(newProduct);

  // Responder con el nuevo producto agregado
  res.status(201).json("Producto agregado correctamente: " + newProduct);
});

// Ruta para actualizar un producto por su id
router.put(':id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productManager.getProductById(id);

    if (!product) {
      return console.log('Product not found');
    } else {
      const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
      } = await req.body;

      const updatedFields = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails: thumbnails
      }
      const updatedProduct = productManager.updateProduct(productId, updatedFields)
    }
    // Responder con el producto actualizado
    res.json("El producto ha sido actualizado: " + updatedProduct);
  } catch (error) {
    console.error(error);
  }
});

// Ruta para eliminar un producto por su id
router.delete(':id', (req, res) => {
  // Extraer el id del producto de los parámetros de la ruta
  const productId = req.params.id;

  // Buscar el producto en la lista de productos
  const productIndex = products.findIndex(product => product.id === productId);

  // Verificar si el producto existe
  if (productIndex === -1) {
    return res.status(404).json({
      error: 'Producto no encontrado'
    });
  }

  // Eliminar el producto de la lista de productos
  products.splice(productIndex, 1);

  // Escribir los cambios en el archivo products.json
  const fileContent = JSON.stringify(products, null, 2);
  fs.writeFileSync('products.json', fileContent);

  // Responder con un mensaje de éxito
  res.json({
    message: 'Producto eliminado correctamente'
  });
});


export default router;