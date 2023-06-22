const Users = require("../models/userModel");

const authController = {
  signup: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new Users({ fullName, email, password });
      await newUser.save();

      res.status(201).json({ message: "Signup successful" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;
