import  express  from 'express';
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

import ProductManager from "./productManager.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',productsRouter);
app.use('/',cartRouter);


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ` + port);
});
