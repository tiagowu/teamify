const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) {
        return res.status(401).json({ error: "Missing authorization header. Please authenticate." });
      }

      const token = header.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({ error: "Missing or invalid token. Please authenticate." });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token. Please authenticate." });
      }

      const user = await Users.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ error: "User not found. Please authenticate." });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = authMiddleware;
