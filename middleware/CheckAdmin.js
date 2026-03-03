require("dotenv").config();

const checkAdmin = (req, res, next) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const token = req.headers["x-admin-password"];
  if (!token || token !== ADMIN_PASSWORD) {
    const attackerIp = req.ip || req.connection.remoteAddress || "Unknown IP";
    console.warn(
      `[ALERT] Unauthorized /menu/clear-all attempt from IP: ${attackerIp}`,
    );
    return res.status(403).json({ error: "Forbidden: Invalid admin password" });
  }
  next();
};

module.exports = checkAdmin;
