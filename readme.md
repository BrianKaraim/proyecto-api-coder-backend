# 🛍️ API de Productos y Carritos

Este proyecto es un **servidor RESTful** desarrollado con **Node.js**, **Express**, **Handlebars** y **WebSockets (Socket.io)**. Permite gestionar productos, carritos y una vista en tiempo real.

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
│  ├─ views/
│  │  ├─ home.handlebars
│  │  └─ realTimeProducts.handlebars
│  ├─ public/
│  │  └─ js/
│  │     └─ realtime.js
│  └─ index.js
├─ package.json
└─ README.md

> Los archivos `products.json` y `carts.json` se crean automáticamente al ejecutar el servidor por primera vez.

---

## ⚙️ Tecnologías utilizadas

* **Node.js**
* **Express.js**
* **Express-Handlebars**
* **Socket.io**
* **Body-parser**
* **Nodemon**
* **File System (fs)**

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/BrianKaraim/proyecto-api-coder-backend.git
cd mi-api
```

### 2️⃣ Inicializar el proyecto

```bash
npm init -y
```

### 3️⃣ Instalar dependencias

```bash
npm install express express-handlebars socket.io body-parser
npm install --save-dev nodemon
```

### 4️⃣ Scripts en package.json

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

### 5️⃣ Ejecutar el servidor

```bash
npm run dev
```

El servidor escuchará en:
👉 **[http://localhost:8080](http://localhost:8080)**

---

# 🧩 Endpoints disponibles

## 📦 Productos (`/api/products`)

| Método     | Endpoint             | Descripción                   |
| ---------- | -------------------- | ----------------------------- |
| **GET**    | `/api/products`      | Lista todos los productos     |
| **GET**    | `/api/products/:pid` | Obtiene un producto por su ID |
| **POST**   | `/api/products`      | Crea un nuevo producto        |
| **DELETE** | `/api/products/:pid` | Elimina un producto           |

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

## 🛒 Carritos (`/api/carts`)

| Método   | Endpoint                       | Descripción                       |
| -------- | ------------------------------ | --------------------------------- |
| **POST** | `/api/carts`                   | Crea un nuevo carrito             |
| **GET**  | `/api/carts/:cid`              | Lista los productos de un carrito |
| **POST** | `/api/carts/:cid/product/:pid` | Agrega un producto al carrito     |

---

# 💾 Persistencia

La información se guarda en archivos JSON dentro de `src/data`:

* `products.json`: almacena todos los productos.
* `carts.json`: almacena los carritos.

---

# 🧠 Managers

### **ProductManager**

Se encarga de:

* Leer productos
* Agregar nuevos
* Eliminar
* Buscar por ID

### **CartManager**

Maneja:

* Creación de carritos
* Agregado de productos
* Incremento de cantidades

---

# 🧩 Handlebars + WebSockets

Esta entrega agrega **vistas renderizadas**, **interacción dinámica en tiempo real** y **actualización automática** mediante WebSockets.

---

## 🎨 Configuración de Handlebars

El servidor usa Handlebars como motor de plantillas:

```js
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));
```

---

## 🏡 Vista principal: `home.handlebars`

Muestra la lista de productos cargados hasta el momento obtenidos desde el backend.

Ruta:
👉 **GET /**

```handlebars
<ul>
  {{#each products}}
    <li>{{this.title}} - ${{this.price}}</li>
  {{/each}}
</ul>
```

---

## ⚡ Vista en tiempo real: `realTimeProducts.handlebars`

Ruta:
👉 **GET /realtimeproducts**

Esta vista usa **WebSockets** para:

* Mostrar productos en tiempo real
* Actualizar la lista al crear o eliminar productos

Incluye un formulario para agregar productos vía HTTP, pero se actualiza vía **Socket.io**.

```html
<script src="/socket.io/socket.io.js"></script>
<script src="/js/realtime.js"></script>
```

---

# 🔌 WebSockets (Socket.io)

El servidor crea una instancia de Socket.io:

```js
const io = new Server(server);
```

Cuando se crea o elimina un producto desde la API, el router emite:

```js
io.emit("updateProducts", products);
```

Esto permite que la vista `realTimeProducts` reciba automáticamente los cambios sin recargar la página.

---

# 🧠 Scripts del cliente (`public/js/realtime.js`)

Escucha los eventos enviados desde el servidor:

```js
const socket = io();

socket.on("updateProducts", (products) => {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach(p => {
    list.innerHTML += `<li>${p.title} - $${p.price}</li>`;
  });
});
```

---

# 🎯 Conclusión

El proyecto integra:

✔ Motor de plantillas Handlebars
✔ WebSockets con actualización automática
✔ Vista tradicional y vista en tiempo real
✔ API completa de productos y carritos

El backend y frontend quedan conectados dinámicamente.
