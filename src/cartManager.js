import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
  }

  addCart() {
    const carts = this.getCartFromFile();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: [""]
    };
    carts.push(newCart);
    this.saveCartToFile(carts);
    return newCart;
  }


  getCart() {
    return this.getCartFromFile();
  }

  getCartById(id) {
    const carts = this.getCartFromFile();
    return carts.find((cart) => cart.id === id);
  }

  updateCart(cid, pid) {
    const carts = this.getCartFromFile();
    const cart = carts [cid]
    console.log(this.getCartById(cid))
    console.log(cid)
    console.log(cart)

    if(!cart.products.product){
      const updatedCart = {
        product : pid,
        quantity:1
      }
    }else{
      cart.products.quantity ++;
    }
    


    // if (pid !== 0) {
    //   // Si el producto ya existe, incrementar su cantidad en 1
    //   cart.products[pid].quantity++;
    // } else {
    //   // Si el producto no existe, agregarlo con cantidad 1
    //   cart.products.push({
    //     product: pid,
    //     quantity: 1
    //   });
    // }
    // if (carts[cid]) {
    //   const quantity = cart.products.product ? cart.products.quantity + 1 : 1;
    //   console.log(quantity);
    //   console.log(cart.products.product);
    //   // cart.products.push(pid,quantity)
    //   // const updatedCart = { ...cart.products, ...newCart };
    //   // cart.products = updatedCart;
    //   // cart.products.push(newCart);
    //   this.saveCartToFile(carts);
    //   console.log("Cart updated: " + cid);
    //   return cid;
  }



//  deleteOrder(id) {
//    const orders = this.getOrderFromFile();
//   const updatedOrder = orders.filter((order) => order.id !== id);
//    this.saveOrderToFile(updatedOrder);
//    console.log("Order with the id "+ id +" deleted correctly");
//    return updatedOrder;
//  }

getCartFromFile() {
  if (!fs.existsSync(this.path)) {
    fs.writeFileSync(this.path, JSON.stringify([]));
  }
  const cartsData = fs.readFileSync(this.path, 'utf-8');
  return JSON.parse(cartsData);
}

saveCartToFile(cart) {
  fs.writeFileSync(this.path, JSON.stringify(cart));
}
}

export default CartManager;