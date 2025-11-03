const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async #readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (!data.trim()) return [];
      return JSON.parse(data);
    } catch {
      await fs.promises.writeFile(this.path, "[]");
      return [];
    }
  }

  async #writeFile(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this.#readFile();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: [],
    };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#readFile();
    return carts.find((c) => c.id === Number(id)) || null;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.#readFile();
    const index = carts.findIndex((c) => c.id === Number(cartId));

    if (index === -1) throw new Error("Carrito no encontrado.");

    const cart = carts[index];
    const productIndex = cart.products.findIndex((p) => p.product === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    carts[index] = cart;
    await this.#writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;
