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

  //  updateCart(id, updatedFields) {
  //    const carts = this.getCartFromFile();
  //    const cartIndex = carts.findIndex((cart) => cart.id === id);
  //    if (cartIndex >= 0) {
  //      const updatedCart = { ...carts[cartIndex], ...updatedFields };
  //      carts[orderIndex] = updatedCart;
  //      this.saveOrderToFile(carts);
  //      console.log("Product updated: " + updatedCart.id);
  //      return updatedCart;
  //    }
  //    return null;
  //  }

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

