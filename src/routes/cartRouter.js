import { Router } from 'express';

const router  = Router();
const cart = [];

import ProductManager from "../productManager.js";
const productManager = new ProductManager('products.json');

export default router;