const checkPremium = (req, res, next) => {
  const { price } = req.body;

  if (price !== undefined && Number(price) > 10) {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(403).json({
        error: "Premium coffee requires authentication token",
      });
    }

    if (token !== "premium-secret") {
      return res.status(403).json({
        error: "Invalid premium token",
      });
    }
  }

  next();
};

module.exports = checkPremium;
