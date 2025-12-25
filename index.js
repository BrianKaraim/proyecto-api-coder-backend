const express = require("express");
const path = require("path");
const connectDB = require("./src/config/db");
const { engine } = require("express-handlebars");
const http = require("http");

connectDB();

const productsRouter = require("./src/routes/products");
const cartsRouter = require("./src/routes/carts");
const viewsRouter = require("./src/routes/views");


const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


server.listen(8080, () => {
  console.log("Servidor escuchando en http://localhost:8080");
});
