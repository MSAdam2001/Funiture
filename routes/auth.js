const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Register Page
router.get("/register", (req, res) => {
  res.render("register", { message: null });
});

// ✅ Register POST
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("register", { message: "Username already exists!" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.error("❌ Error registering user:", err);
    res.render("register", { message: "Error registering user." });
  }
});

// ✅ Login Page
router.get("/login", (req, res) => {
  res.render("login", { message: null });
});

// ✅ Login POST
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.render("login", { message: "Invalid username or password." });
    }

    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error("❌ Error logging in:", err);
    res.render("login", { message: "Error logging in." });
  }
});

// ✅ Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
