import  express  from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import { Server } from 'socket.io';


const app = express();
const port = 8080;
const httpServer = app.listen(8080,()=>console.log("Listening on port 8080"))


import ProductManager from "./productManager.js";
const productManager = new ProductManager('./products.json');
const socketServer = new Server(httpServer)

// app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + 'public'))
app.use('/',viewsRouter);
app.use('/',productsRouter);
app.use('/',cartRouter);

socketServer.on('connection', (socket) => {
  console.log('A new user has connected');

    // enviar lista de productos al conectarse
    socket.emit('productList', productManager.getProducts());

    // manejar evento de creación de un nuevo producto
    socket.on('newProduct', (product) => {
      productManager.addProduct(product);
      io.emit('productList', productManager.getProducts());
    });
  
    // manejar evento de eliminación de un producto
    socket.on('deleteProduct', (productId) => {
      productManager.deleteProduct(productId);
      io.emit('productList', productManager.getProducts());
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
});

