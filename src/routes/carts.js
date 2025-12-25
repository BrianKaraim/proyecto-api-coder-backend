const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create({ products: [] });
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid)
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === pid
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: "success", cart });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    await Cart.updateOne(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );

    res.json({ status: "success", message: "Producto eliminado del carrito" });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.put("/:cid", async (req, res) => {
  try {
    const { products } = req.body;

    await Cart.updateOne(
      { _id: req.params.cid },
      { products }
    );

    res.json({ status: "success", message: "Carrito actualizado" });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;

    await Cart.updateOne(
      {
        _id: req.params.cid,
        "products.product": req.params.pid
      },
      {
        $set: { "products.$.quantity": quantity }
      }
    );

    res.json({ status: "success", message: "Cantidad actualizada" });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.delete("/:cid", async (req, res) => {
  try {
    await Cart.updateOne(
      { _id: req.params.cid },
      { products: [] }
    );

    res.json({ status: "success", message: "Carrito vaciado" });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

module.exports = router;
