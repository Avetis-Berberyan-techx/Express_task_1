# ☕ Coffee Shop API

A professional, production-style RESTful API for managing a coffee shop menu — built with **Node.js**, **Express**, and **MVC architecture**.

---

## 📁 Project Structure

```
coffee-shop-api/
├── controllers/
│   └── coffee.controller.js   # Route logic / handlers
├── middleware/
│   ├── checkPremium.js         # Blocks premium drinks without auth token
│   ├── checkAdmin.js           # Guards the clear-all route
│   └── logger.js               # Logs every request
|   └── ...
├── models/
│   └── coffee.model.js         # Coffee class with static validate()
├── routes/
│   └── coffee.routes.js        # Express Router definitions
├── public/
│   └── index.txt              # Live menu static page
├── .env                        # Environment variables (DO NOT COMMIT)
├── .env.example                # Safe template to share
├── .gitignore                  # Excludes .env and node_modules
├── server.js                   # App entry point
└── README.md
```

---

## ⚙️ Environment Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Express_task_1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project. Use the `.env.example` file as your guide:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
PORT=3000
ADMIN_PASSWORD=your_super_secret_password_here
```

| Variable         | Description                                     | Example       |
| ---------------- | ----------------------------------------------- | ------------- |
| `PORT`           | The port the server will listen on              | `3000`        |
| `ADMIN_PASSWORD` | Password required to access the clear-all route | `s3cr3tB0ss!` |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### 4. Start the server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

The server will be running at: `http://localhost:3000`

---

## 🌐 API Endpoints

### Base URL: `http://localhost:3000`

---

### `GET /menu`

Returns the full coffee menu. Supports optional query filtering.

**Query Parameters:**

| Param      | Type   | Description                           |
| ---------- | ------ | ------------------------------------- |
| `maxPrice` | number | Only returns drinks at or below price |

**Examples:**

```
GET /menu
GET /menu?maxPrice=5.00
```

**Response `200`:**

```json
[
  { "id": 1, "name": "Espresso", "price": 3.0 },
  { "id": 2, "name": "Latte", "price": 4.5 }
]
```

---

### `POST /menu`

Adds a new coffee to the menu.

**Request Body:**

```json
{
  "name": "Cappuccino",
  "price": 4.0
}
```

**Response `201`:**

```json
{ "id": 3, "name": "Cappuccino", "price": 4.0 }
```

**Error `400`** — if `name` is missing:

```json
{ "message": "Name is required" }
```

> 🔒 **Premium Rule:** If `price > 10.00`, the request must include the header:
> `x-auth-token: <any-token>`
> Otherwise, the server returns `403 Forbidden`.

---

### `PUT /menu/:id`

Fully replaces a coffee item by ID.

**Request Body:**

```json
{
  "name": "Flat White",
  "price": 5.0
}
```

**Response `200`:**

```json
{ "id": 1, "name": "Flat White", "price": 5.0 }
```

**Error `404`:**

```json
{ "message": "Coffee not found" }
```

---

### `PATCH /menu/:id`

Updates **only the price** of a specific coffee.

**Request Body:**

```json
{ "price": 5.5 }
```

**Response `200`:**

```json
{ "id": 2, "name": "Latte", "price": 5.5 }
```

**Error `404`:**

```json
{ "message": "Coffee not found" }
```

---

### `DELETE /menu/:id`

Removes a coffee from the menu.

**Response `204`:** _(No body)_

**Error `404`:**

```json
{ "message": "Coffee not found" }
```

---

### `POST /menu/clear-all` 🔴 DANGER ZONE

Wipes the entire menu. Requires admin authorization.

**Required Header:**

```
x-admin-password: your_super_secret_password_here
```

**Response `200`:**

```json
{ "message": "Menu cleared successfully" }
```

**Error `403`** — wrong or missing password:

```json
{ "message": "Forbidden: Invalid admin password" }
```

> ⚠️ Failed attempts log the attacker's IP address to the console.

---

## 🔒 Middleware Overview

| Middleware       | File                         | Purpose                                                   |
| ---------------- | ---------------------------- | --------------------------------------------------------- |
| JSON Body Parser | `server.js`                  | Parses incoming JSON request bodies                       |
| Static Assets    | `server.js`                  | Serves `public/` folder at root                           |
| Logger           | `middleware/logger.js`       | Logs `METHOD`, `URL`, and `Timestamp` for every request   |
| checkPremium     | `middleware/checkPremium.js` | Requires `x-auth-token` header for items priced above $10 |
| checkAdmin       | `middleware/checkAdmin.js`   | Validates `x-admin-password` for the clear-all route      |
| Error Handler    | `server.js` (bottom)         | Global catch-all for unhandled errors                     |

---

## 🧪 Testing with Postman

Import the following test flow in Postman:

1. `GET /menu` — Verify initial menu loads
2. `GET /menu?maxPrice=4.00` — Filter by price
3. `POST /menu` with `{ "name": "Mocha", "price": 5.00 }` — Add item (expect `201`)
4. `POST /menu` with no `name` — Expect `400`
5. `POST /menu` with `price: 12.00` and no `x-auth-token` — Expect `403`
6. `PUT /menu/1` — Replace first item
7. `PATCH /menu/2` — Update price only
8. `DELETE /menu/1` — Remove item (expect `204`)
9. `DELETE /menu/999` — Expect `404`
10. `POST /menu/clear-all` with correct `x-admin-password` header — Expect `200`

---

## 🛡️ Security & Gitignore

The `.gitignore` is configured to **always exclude**:

```
node_modules/
.env
*.log
```

---

## 📦 Dependencies

| Package   | Purpose                                        |
| --------- | ---------------------------------------------- |
| `express` | Web framework                                  |
| `dotenv`  | Loads `.env` variables at runtime              |
| `nodemon` | Auto-restarts server on file change (dev only) |

---
