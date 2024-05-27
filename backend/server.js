const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const logger = require("morgan");
const mainRoute = require("./routes/index.js");
const port = process.env.PORT || 4000;
const cors = require("cors");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!...");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor!...`);
});
