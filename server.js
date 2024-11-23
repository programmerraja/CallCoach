require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const metricsRoutes = require("./routes/metrics");

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log(err, decoded);
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded;
      console.log(req.user);
      next();
    });
  } else {
    next();
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use(express.static("frontend/dist"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
