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
   const carts = cartManager.getCart();
   const newCartId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
   const newCart = {
     id: newCartId,
     products: []
   };
   
   cartManager.addCart(newCart);
   res.status(201).json(newCart);
});

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
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  
  cartManager.addProductToCart(cid, pid);
  
  // Responder con el carrito actualizado
  res.json(cart);
});



export default router;