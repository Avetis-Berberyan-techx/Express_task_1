const express = require("express");
const path = require("path");

const coffeeRouter = require("./routes/coffee.router");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/ErrorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.use(logger);

app.get("/coffee_list", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.txt"));
});

app.use("/menu", coffeeRouter);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
