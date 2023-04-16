import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
  }

   addOrder() {
     const orders = this.getOrderFromFile();
     const newOrder = {
       id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
       products: [""]
     };
     orders.push(newOrder);
     this.saveOrderToFile(orders);
     return newOrder;
   }

   getOrder() {
    return this.getOrderFromFile();
  }

  getOrderById(id) {
    const orders = this.getOrderFromFile();
    return orders.find((order) => order.id === id);
  }

   updateProduct(id, updatedFields) {
     const orders = this.getOrderFromFile();
     const orderIndex = orders.findIndex((order) => order.id === id);
     if (orderIndex >= 0) {
       const updatedOrder = { ...orders[orderIndex], ...updatedFields };
       products[orderIndex] = updatedProduct;
       this.saveOrderToFile(orders);
       console.log("Product updated: " + updatedOrder.id);
       return updatedOrder;
     }
     return null;
   }

   deleteOrder(id) {
     const orders = this.getOrderFromFile();
    const updatedOrder = orders.filter((order) => order.id !== id);
     this.saveOrderToFile(updatedOrder);
     console.log("Order with the id "+ id +" deleted correctly");
     return updatedOrder;
   }

   getOrderFromFile() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
    const ordersData = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(ordersData);
  }

  saveOrderToFile(order) {
    fs.writeFileSync(this.path, JSON.stringify(order));
  }
}

export default CartManager;

