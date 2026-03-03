const Coffee = require("../models/coffee.model");

let menu = [
  { id: 1, name: "Espresso", price: 12 },
  { id: 2, name: "Latte", price: 15 },
];

const getAllCoffee = (req, res) => {
  const maxPrice = Number(req.query.maxPrice);
  const filteredMenu = maxPrice
    ? menu.filter((coffee) => coffee.price <= maxPrice)
    : menu;
  res.status(200).json(filteredMenu);
};

const createCoffee = (req, res) => {
  const { name, price } = req.body;

  const newCoffee = {
    id: menu.length ? Math.max(...menu.map((c) => c.id)) + 1 : 1,
    name: req.body.name,
    price: req.body.price,
  };
  const { isValid, message } = Coffee.validate(newCoffee);

  if (!isValid) {
    res.status(400).json({ message });
  } else {
    menu.push(newCoffee);
    res.status(201).json(newCoffee);
  }
};

const updateCoffee = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const index = menu.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).send("Coffee not found");

  if (!name || price === undefined)
    return res.status(400).send("Name and price required");

  menu[index] = { id, name, price };
  res.status(200).json(menu[index]);
};

const updateCoffeePrice = (req, res) => {
  const id = parseInt(req.params.id);
  const { price } = req.body;

  const coffee = menu.find((c) => c.id === id);
  if (!coffee) return res.status(404).send("Coffee not found");

  if (price === undefined) return res.status(400).send("Price required");

  coffee.price = price;
  res.status(200).json(coffee);
};

const deleteCoffee = (req, res) => {
  const id = parseInt(req.params.id);
  const index = menu.findIndex((c) => c.id === id);

  if (index === -1) return res.status(404).send("Coffee not found");

  const deleted = menu.splice(index, 1);
  res.status(204).json(deleted[0]);
};

const clearAll = (req, res) => {
  menu = [];
  res.status(200).json(menu);
};

module.exports = {
  getAllCoffee,
  createCoffee,
  updateCoffee,
  updateCoffeePrice,
  deleteCoffee,
  clearAll,
};
