const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5005;

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
  .then(() => {
    console.log("Database is connected");
    // LISTEN
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
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

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Backend check
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});
