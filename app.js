// 🔹 Load environment variables from .env
require('dotenv').config({ path: __dirname + '/.env' });
console.log("🔍 Loaded .env file!");
console.log("🔍 MONGO_URI =", process.env.MONGO_URI);
console.log("🔍 SESSION_SECRET =", process.env.SESSION_SECRET);

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

// 🔹 MongoDB Atlas connection using environment variable
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// 🔹 EJS & Static setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Session setup using environment variable
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// 🔹 Make user available globally in all EJS files
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// 🔹 Furniture data
const furnitureItems = [
  {
    name: "Modern Sofa",
    price: "$450",
    image:
      "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A stylish, comfortable sofa for your living room.",
  },
  {
    name: "Wooden Dining Table",
    price: "$620",
    image:
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Premium oak wood dining table with six chairs.",
  },
  {
    name: "Office Chair",
    price: "$180",
    image:
      "https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Ergonomic chair for long working hours.",
  },
  {
    name: "Classic Bed Frame",
    price: "$700",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Elegant wooden bed frame with modern design.",
  },
];

// 🔹 Routes
app.use("/", require("./routes/auth")); // Make sure this file exists
app.use("/blog", require("./routes/blog")); // Make sure this file exists

// 🔹 Home route
app.get("/", (req, res) => {
  res.render("home", { furnitureItems });
});

// 🔹 Contact form route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact Message:", { name, email, message });
  res.send("Thank you! Your message has been received.");
});

// 🔹 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
