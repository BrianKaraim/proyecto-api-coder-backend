const express = require('express');
const ProductManager = require('../managers/productManager');
const router = express.Router();
const pm = new ProductManager();


router.get('/', async (req, res) => {
  try {
    const products = await pm.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const prod = await pm.getById(req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const product = await pm.addProduct(payload);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:pid', async (req, res) => {
  try {
    const ok = await pm.deleteProduct(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
