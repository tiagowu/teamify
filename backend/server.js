require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const authRouter = require("./routers/authRouter");

const app = express();
app.use(express.json());
app.use(cookieparser());

app.use("/api", authRouter);

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);
(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
})();
