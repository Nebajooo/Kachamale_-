const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Prepare payload without sensitive info
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      // add other fields if needed but avoid sensitive info
    };

    // Sign JWT token with secret (consider moving secret to env variable)
    const token = jwt.sign(payload, process.env.JWT_SECRET || "top_secret", {
      expiresIn: "1h", // set token expiration
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
