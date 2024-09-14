const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve uploads folder
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(
    () =>
      //LISTEN
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      }),
    console.log("Database is connected")
  )

  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
const hackathonRoutes = require("./routes/hackathonRoutes");
app.use("/api/hackathons", hackathonRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

//Backend Check
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});