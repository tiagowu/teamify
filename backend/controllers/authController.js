const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authController = {
  signup: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists. Please choose a different email." });
      }

      const newUser = new User({ fullName, email, password });
      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/api/refresh-token",
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({ message: "Registered successfully", user: newUser, accessToken: accessToken });
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ errors: validationErrors });
      }
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password. Please try again." });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password. Please try again." });
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/api/refresh-token",
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ message: "Logged in successfully.", user: user, accessToken: accessToken, refreshToken: refreshToken });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        path: "/api/refresh-token",
        secure: true,
        sameSite: "none",
      });

      return res.json({ message: "Logged out successfully." });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        return res.redirect("/");
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if (!decoded) {
        return res.redirect("/");
      }

      const newAccessToken = createAccessToken({ id: decoded.id });

      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        return res.redirect("/");
      }

      return res.status(200).json({ accessToken: newAccessToken, user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

module.exports = authController;
