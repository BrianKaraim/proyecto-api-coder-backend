const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const router = express.Router();


router.get("/products", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort,
    query
  } = req.query;

  const filter = {};

  if (query) {
    filter.$or = [
      { category: query },
      { status: query === "true" }
    ];
  }

  const options = {
    page,
    limit,
    lean: true
  };

  if (sort) {
    options.sort = { price: sort === "asc" ? 1 : -1 };
  }

  const result = await Product.paginate(filter, options);

  res.render("products", {
    ...result,
    prevLink: result.hasPrevPage
      ? `/products?page=${result.prevPage}&limit=${limit}`
      : null,
    nextLink: result.hasNextPage
      ? `/products?page=${result.nextPage}&limit=${limit}`
      : null
  });
});


router.get("/products/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid).lean();
  res.render("productDetail", product);
});

router.get("/carts/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate("products.product")
    .lean();
 
  res.render("cart", {
    products: cart.products
  });
});

module.exports = router;
