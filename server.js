const express = require("express");

const app = express();
const PORT = 3000;

let menu = [
  { id: 1, name: "Espresso", price: 3.0 },
  { id: 2, name: "Latte", price: 4.5 },
];

app.use(express.json());

app.get("/menu", (req, res) => {
  res.status(200).json(menu);
});

app.post("/menu", (req, res) => {
  const { name, price } = req.body;

  if (!name) {
    return res.status(400).send("Name is required");
  }
  if (!price) {
    return res.status(400).send("Price is required");
  }

  const newCoffee = {
    id: menu.length ? Math.max(...menu.map((c) => c.id)) + 1 : 1,
    name,
    price,
  };

  menu.push(newCoffee);
  res.status(201).json(newCoffee);
});

app.put("/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const index = menu.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).send("Coffee not found");
  }

  if (!name || !price) {
    return res.status(400).send("Name and price are required");
  }

  menu[index] = { id, name, price };
  res.status(200).json(menu[index]);
});

app.patch("/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { price } = req.body;
  const coffee = menu.find((c) => c.id === id);

  if (!coffee) {
    return res.status(404).send("Coffee not found");
  }

  if (!price) {
    return res.status(400).send("Price is required");
  }

  coffee.price = price;
  res.status(200).json(coffee);
});

app.delete("/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = menu.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).send("Coffee not found");
  }

  const deleted = menu.splice(index, 1);
  res.status(200).json(deleted[0]);
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
