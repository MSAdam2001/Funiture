const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

// 🔹 MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/furnitureDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// 🔹 EJS & Static setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// 🔹 Session setup
app.use(
  session({
    secret: "secretkey",
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
app.use("/", require("./routes/auth"));
app.use("/blog", require("./routes/blog"));

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
app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
