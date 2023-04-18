import express from 'express';
import {
  Router
} from 'express';

const router = Router();
const cart = [];

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}))

import CartManager from "../cartManager.js";
const cartManager = new CartManager('./cart.json');


router.post('/api/carts', async (req, res) => {
  const newCart = []
  cartManager.addCart(newCart);
  res.status(201).json("Carrito creado correctamente");
});

router.get('/api/carts', async (req, res) => {
  try {
    const orders = await cartManager.getCart();
    res.json(orders);

  } catch (error) {
    console.error(error);
  }
})

router.get('/api/carts/:cid', async (req, res) => {
  try {
    const cid = await parseInt(req.params.cid);
    const order = await cartManager.getCartById(cid);

    if (!order) {
      return console.log('Carrito no encontrado');
    } else {
      res.json(order);
    }
  } catch (error) {
    console.error(error);
  }
});

// router.post('/:cid/product/:pid', async (req, res) => {
//   const cid = await parseInt(req.params.cid);
//   const pid = await parseInt(req.params.pid);

//     cartManager.updateCart(cid, pid);
//     res.status(201).json("Carrito creado correctamente");
  
// });

router.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  
  await cartManager.updateCart(cid, pid);
  
  // Responder con el carrito actualizado
  res.json(cart);
});



export default router;