const Users = require("../models/userModel");

const authController = {
  signup: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists. Please choose a different email." });
      }

      const newUser = new Users({ fullName, email, password });
      await newUser.save();

      return res.status(201).json({ message: "Registration successful" });
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

      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password. Please try again." });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password. Please try again." });
      }

      return res.status(200).json({ message: "Login successful" });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  },
};

module.exports = authController;
