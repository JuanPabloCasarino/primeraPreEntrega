import  express  from 'express';
import {
  Router
} from 'express';


const router = Router();
const products = [];

router.use(express.json());
router.use(express.urlencoded({extended:true}))

import ProductManager from "../productManager.js";
const productManager = new ProductManager('./products.json');

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

router.get('/api/products/:pid', async (req, res) => {
  try {
    const pid = await parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);

    if (!product) {
      return console.log('Product not found adwadaw');

    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
  }
});

// Agregar products
router.post('/api/products', async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const {
    id,
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail
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
    thumbnail: thumbnail || []
  };

  // Agregar el nuevo producto al objeto JavaScript
  productManager.addProduct(newProduct);

  // Responder con el nuevo producto agregado
  res.status(201).json("Producto agregado correctamente: " + newProduct.title);
});

// Ruta para actualizar un producto por su id
router.put('/api/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);

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
        thumbnail
      } = await req.body;

      const updatedFields = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail: thumbnail
      }
      productManager.updateProduct(pid, updatedFields)
      res.status(201).json("El producto ha sido actualizado");
    }

  } catch (error) {
    console.error(error);
  }
});

// Ruta para eliminar un producto por su id
router.delete('/api/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);

    if(!product){
      return console.log('Product not found');
    } else{
        productManager.deleteProduct(pid)
        res.status(200).json('Product with Id: ' + pid + ' deleted')
    }
  } catch (error) {
    console.error(error);
  }
});


export default router;