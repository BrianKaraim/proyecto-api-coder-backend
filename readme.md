# 🛍️ API de Productos y Carritos – Backend

Proyecto backend desarrollado con **Node.js**, **Express**, **MongoDB**, **Mongoose**, **Handlebars** y **Socket.io**.  
Permite gestionar productos y carritos, renderizar vistas con paginación y mostrar información en tiempo real mediante WebSockets.

## 📁 Estructura del Proyecto

mi-api/
├─ src/
│  ├─ config/
│  │  └─ db.js
│  ├─ routes/
│  │  ├─ products.js
│  │  └─ carts.js
|  |  └─ views.js
│  ├─ scripts/
│  │  └─ migrate.js
│  ├─ views/
│  │  ├─ products.handlebars
│  │  ├─ productDetail.handlebars
│  │  └─ cart.handlebars
│  ├─ public/
│  │  └─ js/
│  │     └─ realtime.js
│  └─ index.js
├─ package.json
└─ README.md

>---

## ⚙️ Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- Express-Handlebars  
- Socket.io  
- Nodemon  

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio

git clone <https://github.com/BrianKaraim/proyecto-api-coder-backend.git>
cd mi-api
2️⃣ Instalar dependencias
npm install
3️⃣ Configurar MongoDB
La conexión a la base de datos se encuentra en:
src/config/db.js
Ejemplo de conexión local:
mongoose.connect("mongodb://127.0.0.1:27017/mi-api");
Asegurarse de tener MongoDB ejecutándose localmente.
4️⃣ Ejecutar el servidor
npm run dev
El servidor quedará escuchando en:
👉 <http://localhost:8080>

### 📦 Endpoints – Productos

Base:
/api/products
GET /api/products
Permite filtros, paginación y ordenamiento mediante query params:
limit → cantidad de productos por página (default: 10)
page → número de página (default: 1)
sort → asc | desc (orden por precio)
query → filtra por categoría o disponibilidad
Ejemplo:
/api/products?limit=10&page=1&sort=asc
Respuesta:
{
  "status": "success",
  "payload": [],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
GET /api/products/:pid
Obtiene un producto por su ID.
POST /api/products
Crea un nuevo producto.
{
  "title": "Remera verde",
  "description": "Remera 100% algodón",
  "code": "R001",
  "price": 1500,
  "status": true,
  "stock": 20,
  "category": "ropa",
  "thumbnails": ["imagen.jpg"]
}
PUT /api/products/:pid
Actualiza un producto existente.
DELETE /api/products/:pid
Elimina un producto por ID.

### 🛒 Endpoints – Carritos

Base:
/api/carts
POST /api/carts
Crea un carrito vacío.
GET /api/carts/:cid
Obtiene un carrito específico con los productos completos utilizando populate.
POST /api/carts/:cid/products/:pid
Agrega un producto al carrito o incrementa su cantidad si ya existe.
PUT /api/carts/:cid
Actualiza todos los productos del carrito recibiendo un arreglo.
PUT /api/carts/:cid/products/:pid
Actualiza únicamente la cantidad de un producto específico.
DELETE /api/carts/:cid/products/:pid
Elimina un producto del carrito.
DELETE /api/carts/:cid
Vacía completamente el carrito.

### 🖥️ Vistas – Handlebars

/products
Lista de productos renderizados
Paginación
Botón para agregar productos al carrito
Enlace al detalle del producto
/products/:pid
Vista de detalle del producto
Información completa
Botón para agregar al carrito
/carts/:cid
Visualización de un carrito específico
Productos renderizados con populate
Cantidades visibles por producto
⚡ WebSockets – Socket.io
El proyecto utiliza Socket.io para manejar comunicación en tiempo real:
Actualización automática de datos
Comunicación cliente-servidor
Sin recargar la página
Se utiliza tanto en el backend como en scripts del cliente.

### 🎯 Funcionalidades implementadas

✔ CRUD completo de productos
✔ CRUD completo de carritos
✔ Persistencia en MongoDB
✔ Uso de Mongoose y populate
✔ Paginación, filtros y ordenamiento
✔ Vistas con Handlebars
✔ WebSockets en tiempo real
✔ Manejo de errores y validaciones
