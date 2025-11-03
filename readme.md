# 🛍️ API de Productos y Carritos

Este proyecto es un **servidor RESTful** desarrollado con **Node.js** y **Express** que permite gestionar productos y carritos de compra.  

---

## 📁 Estructura del Proyecto

mi-api/
├─ src/
│  ├─ data/
│  │  ├─ products.json
│  │  └─ carts.json
│  ├─ managers/
│  │  ├─ productManager.js
│  │  └─ cartManager.js
│  ├─ routes/
│  │  ├─ products.js
│  │  └─ carts.js
│  └─ index.js
├─ package.json
└─ README.md

> Los archivos `products.json` y `carts.json` se crean automáticamente al ejecutar el servidor por primera vez.

---

## ⚙️ Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **Body-parser**
- **Nodemon**
- **File System (fs)**

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone  https://github.com/BrianKaraim/proyecto-api-coder-backend.git
cd mi-api
```

### 2️⃣ Inicializar el proyecto

```bash
npm init -y
```

### 3️⃣ Instalar dependencias

```bash
npm install express body-parser
npm install --save-dev nodemon
```

### 4️⃣ Scripts en package.json

Asegurate de tener estos scripts:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

### 5️⃣ Ejecutar el servidor

En modo normal:

```bash
npm start
```

En modo desarrollo (auto recarga):

```bash
npm run dev
```

El servidor escuchará en:  
👉 **<http://localhost:8080>**

---

## 🧩 Endpoints disponibles

### 📦 Productos (`/api/products`)

| Método | Endpoint | Descripción |
|---------|-----------|-------------|
| **GET** | `/api/products` | Lista todos los productos |
| **GET** | `/api/products/:pid` | Muestra un producto por su ID |
| **POST** | `/api/products` | Crea un nuevo producto |
| **PUT** | `/api/products/:pid` | Actualiza un producto existente |
| **DELETE** | `/api/products/:pid` | Elimina un producto por su ID |

#### Ejemplo de creación (`POST /api/products`)

```json
{
  "title": "Remera verde",
  "description": "Remera 100% algodón",
  "code": "R001",
  "price": 1500,
  "status": true,
  "stock": 20,
  "category": "ropa",
  "thumbnails": ["imagen20.jpg"]
}
```

---

### 🛒 Carritos (`/api/carts`)

| Método | Endpoint | Descripción |
|---------|-----------|-------------|
| **POST** | `/api/carts` | Crea un nuevo carrito |
| **GET** | `/api/carts/:cid` | Lista los productos de un carrito |
| **POST** | `/api/carts/:cid/product/:pid` | Agrega un producto al carrito (incrementa cantidad si ya existe) |

#### Ejemplo de agregar producto

POST /api/carts/1/product/3

---

## 💾 Persistencia

La información se guarda en archivos JSON dentro de `src/data`:

- `products.json`: almacena todos los productos.
- `carts.json`: almacena los carritos y sus productos.

---

## 🧠 Estructura de datos

### Producto

```json
{
  "id": 1,
  "title": "Remera verde",
  "description": "Remera 100% algodón",
  "code": "R001",
  "price": 1500,
  "status": true,
  "stock": 20,
  "category": "ropa",
  "thumbnails": ["imagen20.jpg"]
}
```

### Carrito

```json
{
  "id": 1,
  "products": [
    {
      "product": 2,
      "quantity": 3
    }
  ]
}
```

---

## 🧩 Managers

El proyecto utiliza dos clases principales ubicadas en `src/managers`:

- **ProductManager:**  
  Maneja todas las operaciones sobre los productos (leer, agregar, actualizar, eliminar).
  
- **CartManager:**  
  Maneja los carritos y la relación con los productos, incluyendo la cantidad de cada uno.

Ambas clases utilizan el sistema de archivos (`fs`) para persistir los datos.

---
