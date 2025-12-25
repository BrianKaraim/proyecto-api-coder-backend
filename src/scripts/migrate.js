const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");
const Cart = require("../models/Cart");

async function migrate() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mi-api");
    console.log("🟢 Mongo conectado");

    // 🧹 limpiar
    await Product.deleteMany();
    await Cart.deleteMany();

    // 📦 PRODUCTOS
    const productsPath = path.join(__dirname, "../data/products.json");
    const productsJSON = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    const mongoProducts = await Product.insertMany(productsJSON);

    // mapear id viejo → ObjectId
    const productMap = {};
    mongoProducts.forEach((p, i) => {
      productMap[productsJSON[i].id] = p._id;
    });

    console.log(`✅ Productos migrados: ${mongoProducts.length}`);

    // 🛒 CARRITOS
    const cartsPath = path.join(__dirname, "../data/carts.json");
    const cartsJSON = JSON.parse(fs.readFileSync(cartsPath, "utf-8"));

    for (const cart of cartsJSON) {
      await Cart.create({
        products: cart.products.map(p => ({
          product: productMap[p.product],
          quantity: p.quantity
        }))
      });
    }

    console.log("✅ Carritos migrados");
    process.exit();

  } catch (error) {
    console.error("❌ Error migrando:", error);
    process.exit(1);
  }
}

migrate();
