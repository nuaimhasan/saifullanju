const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 2501;
const apiRoutes = require("./src/routes/index");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:2500", "https://saifullanju.com"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

// API Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

// not found api
app.use("*", (req, res) => {
  res.send({ message: "API not found" });
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
