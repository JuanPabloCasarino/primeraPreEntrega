import  express  from 'express';
import {
  Router
} from 'express';

const router = Router();
const cart = [];

router.use(express.json());
router.use(express.urlencoded({extended:true}))

import CartManager from "../cartManager.js";
const cartManager = new CartManager('./cart.json');


router.post('/api/carts', async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  // const products = await req.body.products;
  const newOrder = []
  // // Verificar que los campos obligatorios estén presentes
  // if (!products) {
  //   return res.status(400).json({
  //     error: 'Falta ingresar los productos'
  //   });
  // }

  // Crear el objeto de la nueva orden
  // const newOrder = {
  //   {products}
  // };

  // Mapear los productos para crear objetos con los campos 'title' e 'id'
  // const cartProducts = products.map((product) => {
  //   return {
  //     id: product.id,
  //     title: product.title
  //   };
  // });

  //  const newOrder  = {
  //   products: cartProducts
  // };

  // // Agregar el nuevo producto al objeto JavaScript
   cartManager.addOrder(newOrder);

  // Responder con el nuevo producto agregado
  res.status(201).json("Carrito creado correctamente" );
});

router.get('/api/carts', async (req, res) => {
  try {
    const orders = await cartManager.getOrder();
    res.json(orders); 
    
  } catch (error) {
    console.error(error);
  }
})

router.get('api/carts/:cid', async (req, res) => {
  try {
    const cid = await parseInt(req.params.cid);
    const order = await cartManager.getOrderById(cid);

    if (!order) {
      return console.log('Order not found');
    } else {
      res.json(order);
    }
  } catch (error) {
    console.error(error);
  }
});



export default router;