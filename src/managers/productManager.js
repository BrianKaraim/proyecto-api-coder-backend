const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor(filename = 'products.json') {
    this.filePath = path.join(__dirname, '..', 'data', filename);
  }

  async _readFile() {
    try {
      const content = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await this._writeFile([]);
        return [];
      }
      throw err;
    }
  }

  async _writeFile(data) {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async getProducts() {
    return await this._readFile();
  }

  async getById(pid) {
    const products = await this._readFile();
    return products.find(p => String(p.id) === String(pid)) || null;
  }

  _generateId(products) {
    if (!products.length) return 1;
    const maxId = products.reduce((max, p) => (Number(p.id) > max ? Number(p.id) : max), 0);
    return maxId + 1;
  }

  async addProduct(productData) {
    const required = ['title','description','code','price','status','stock','category','thumbnails'];
    for (const r of required) {
      if (productData[r] === undefined) {
        throw new Error(`Campo faltante: ${r}`);
      }
    }

    const products = await this._readFile();
    const id = this._generateId(products);
    const product = { id, ...productData };
    products.push(product);
    await this._writeFile(products);
    return product;
  }

  async updateProduct(pid, updateData) {
    const products = await this._readFile();
    const idx = products.findIndex(p => String(p.id) === String(pid));
    if (idx === -1) return null;

    delete updateData.id;

    products[idx] = { ...products[idx], ...updateData };
    await this._writeFile(products);
    return products[idx];
  }

  async deleteProduct(pid) {
    const products = await this._readFile();
    const idx = products.findIndex(p => String(p.id) === String(pid));
    if (idx === -1) return false;
    products.splice(idx, 1);
    await this._writeFile(products);
    return true;
  }
}

module.exports = ProductManager;
