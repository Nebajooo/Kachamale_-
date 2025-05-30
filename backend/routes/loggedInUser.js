const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "Access token missing" });

  jwt.verify(token, process.env.JWT_SECRET || "top_secret", (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// Protected route for user profile
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
