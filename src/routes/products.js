const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      sort,
      query
    } = req.query;

    /* 🔎 Filtros */
    const filter = {};

    if (query) {
      filter.$or = [
        { category: query },
        { status: query === "true" }
      ];
    }

    const options = {
      limit: Number(limit),
      page: Number(page),
      lean: true
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await Product.paginate(filter, options);

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}&limit=${limit}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}&limit=${limit}`
        : null
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      payload: product
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message
    });
  }
});


router.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({
      status: "error",
      error: "ID inválido"
    });
  }

  const updated = await Product.findByIdAndUpdate(
    pid,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({
      status: "error",
      error: "Producto no encontrado"
    });
  }

  res.json({
    status: "success",
    payload: updated
  });
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({
      status: "error",
      error: "ID inválido"
    });
  }

  const product = await Product.findById(pid);

  if (!product) {
    return res.status(404).json({
      status: "error",
      error: "Producto no encontrado"
    });
  }

  res.json({
    status: "success",
    payload: product
  });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(400).json({
      status: "error",
      error: "ID inválido"
    });
  }

  const deleted = await Product.findByIdAndDelete(pid);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      error: "Producto no encontrado"
    });
  }

  res.json({
    status: "success",
    message: "Producto eliminado"
  });
});

module.exports = router;
