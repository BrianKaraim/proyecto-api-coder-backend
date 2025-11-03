const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./src/routes/products');
const cartsRouter = require("./src/routes/carts");
const app = express();
const PORT = 8080; 

app.use(express.json());
app.use(bodyParser.json());


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  res.send('API Products & Carts - Servidor corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
