# Inventory API — Backend

API REST para el inventario de productos de la **Prueba Técnica SUNUM (Etapa 1)**.

## 🛠️ Stack

Node.js · Express · TypeScript · Sequelize · MySQL

## ✅ Requisitos

- Node.js 22+
- MySQL 8 (local, en contenedor o en servidor)
- npm

## 🚀 Instalación y ejecución

```bash
git clone https://github.com/JazDzib/Inventory-Backend.git
cd Inventory-Backend
npm install

# 1. Configura el archivo .env (ver .env.example)
# 2. Inicia el servidor
npm run dev
```

El servidor queda en `http://localhost:3000`.


## 🔐 Variables de entorno (`.env`)

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=inventory_db
DB_USER=dev
DB_PASSWORD=tu_password_segura
```

## 🗄️ Diagrama de base de datos

```
┌────────────────┐          ┌──────────────────────────┐
│   categories   │          │         products         │
├────────────────┤          ├──────────────────────────┤
│ id      PK INT │◄─────────│ id           PK INT      │
│ name VARCHAR100│   FK 1:N  │ name    VARCHAR(100)     │
│ created_at     │          │ quantity  INT UNSIGNED   │
│ updated_at     │          │ price     DECIMAL(10,2)  │
└────────────────┘          │ supplier  ENUM(6 valores)│
                            │ category_id FK → categories.id
                            │ created_at / updated_at  │
                            └──────────────────────────┘
```

- **Relación:** `Category 1 ──── N Product` (FK en `products.category_id`)
- **ON DELETE:** `RESTRICT` → si la categoría tiene productos, se responde `409 Conflict`

## 📡 Endpoints

| Método | Ruta | Descripción | Códigos |
|--------|------|-------------|---------|
| GET | `/api/products?page=1&limit=10` | Lista paginada con categoría | 200 |
| GET | `/api/products/:id` | Producto por id | 200 / 404 |
| POST | `/api/products` | Crear producto | 201 / 400 |
| PUT | `/api/products/:id` | Actualizar producto | 200 / 400 / 404 |
| DELETE | `/api/products/:id` | Eliminar producto | 200 / 404 |
| GET | `/api/categories` | Todas las categorías | 200 |
| POST | `/api/categories` | Crear categoría | 201 / 400 |
| DELETE | `/api/categories/:id` | Eliminar (409 si tiene productos) | 200 / 404 / **409** |

## 🧠 Decisiones técnicas

- **`DECIMAL(10,2)` para el precio** — los números flotantes en binario pierden precisión (`0.1 + 0.2`); el dinero se maneja con decimal exacto.
- **Validaciones en el modelo (Sequelize)** — nombre (no vacío / máx 100), cantidad ≥ 0, precio > 0, e `isIn` para el enum de supplier.
- **Validación de FK antes de escribir** — se consulta que `categoryId` exista antes del `create`.
- **Manejo centralizado de errores** — `ApiError` + middleware de 4 parámetros → códigos 400/404/409/500 con mensajes claros.
- **`sync` en desarrollo, migraciones en producción** — en dev las tablas se sincronizan desde los modelos; en prod se usan migraciones versionadas.
- **Asociaciones en `models/index.ts`** — se importan ambos modelos y se registra la relación sin dependencias circulares.

## 📁 Estructura

```
src/
├── database/sequelize.ts   # Conexión + initDb (authenticate + sync)
├── models/                 # Category, Product, associaciones (index) y Enum
├── controllers/            # Lógica de los endpoints
├── services/               # Reglas de negocio + acceso a datos
├── routes/                 # Definición de rutas (índice central)
├── middlewares/            # errorHandle
├── utils/                  # ApiError
└── app.ts                  # Configuración de Express + registro de rutas
```