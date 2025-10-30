const express = require("express");
const router = express.Router();

let blogs = [
  {
    title: "Top 5 Living Room Furniture Trends in 2025",
    content:
      "Discover the latest trends in modern living room design, from minimalist sofas to eco-friendly materials...",
    image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg",
    author: "Admin",
  },
  {
    title: "How to Choose the Perfect Dining Table",
    content:
      "A dining table is more than just furniture—it’s the heart of family gatherings. Learn how to pick the right size and material...",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    author: "Jane Doe",
  },
  {
    title: "Office Chairs That Combine Comfort and Style",
    content:
      "Spending long hours working? Here are our top picks for ergonomic and stylish office chairs...",
    image: "https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg",
    author: "John Smith",
  },
];

// Blog homepage
router.get("/", (req, res) => {
  res.render("blog", { user: req.session.user, blogs });
});

// Add blog post (only for logged-in users)
router.post("/add", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const { title, content, image } = req.body;
  blogs.push({
    title,
    content,
    image: image || "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
    author: req.session.user.username,
  });
  res.redirect("/blog");
});

module.exports = router;
