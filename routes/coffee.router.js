const express = require("express");

const checkPremium = require("../middleware/CheckPremium.js");
const checkAdmin = require("../middleware/CheckAdmin.js");

const router = express.Router();

const {
  getAllCoffee,
  createCoffee,
  updateCoffee,
  updateCoffeePrice,
  deleteCoffee,
  clearAll,
} = require("../controller/coffee.controller");

router.get("/", getAllCoffee);

router.post("/", checkPremium, createCoffee);
router.post("/clear_all", checkAdmin, clearAll);

router.put("/:id", updateCoffee);

router.patch("/:id", updateCoffeePrice);

router.delete("/:id", deleteCoffee);

module.exports = router;
