require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const allowedOrigins = ["https://teamify.tiagowu.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/userRouter"));
app.use("/api", require("./routers/teamRouter"));

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
