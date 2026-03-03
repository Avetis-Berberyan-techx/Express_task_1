class Coffee {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static validate({ name, price }) {
    if (!name || name.trim() === "") {
      return { isValid: false, message: "Name is required" };
    }

    if (price === undefined) {
      return { isValid: false, message: "Price is required" };
    }

    return { isValid: true, message: null };
  }
}

module.exports = Coffee;
