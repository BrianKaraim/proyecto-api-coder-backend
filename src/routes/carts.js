const express = require("express");
const CartManager = require("../managers/cartManager");

const router = express.Router();


const cartManager = new CartManager("./src/data/carts.json");


router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
