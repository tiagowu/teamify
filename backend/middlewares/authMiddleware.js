const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing authorization header. Please authenticate." });
      }

      const token = header.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Missing or invalid token. Please authenticate." });
      }

      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
          return res.status(401).json({ error: "User not found. Please authenticate." });
        }

        req.user = user;
        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          // TO-DO: Generate new access token automatically if refresh token is valid
          return res.status(401).json({ error: "Please refresh the page." });
        } else {
          return res.status(401).json({ error: "Invalid token. Please authenticate." });
        }
      }
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = authMiddleware;
