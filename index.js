const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');


const productsRouter = require('./src/routes/products');
const cartsRouter = require('./src/routes/carts');

const ProductManager = require("./src/managers/productManager");
const pm = new ProductManager();


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'src/public')));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));


app.use('/api/products', productsRouter(io));
app.use('/api/carts', cartsRouter);

app.get("/", async (req, res) => {
  const products = await pm.getProducts();
  res.render("home", { products });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});


io.on("connection", async socket => {
  console.log("Cliente conectado");

  const products = await pm.getProducts();
  socket.emit("updateProducts", products);

  socket.on("addProductWS", async data => {
    await pm.addProduct(data);
    const updated = await pm.getProducts();
    io.emit("updateProducts", updated);
  });

  socket.on("deleteProductWS", async id => {
    await pm.deleteProduct(id);
    const updated = await pm.getProducts();
    io.emit("updateProducts", updated);
  });
});


const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
