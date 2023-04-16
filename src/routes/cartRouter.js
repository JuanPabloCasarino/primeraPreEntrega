import { Router } from 'express';

const router  = Router();
const cart = [];

import ProductManager from "../productManager.js";
const productManager = new ProductManager('products.json');

router.post('/api/carts/', async (req, res) => {
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
  
export default router;