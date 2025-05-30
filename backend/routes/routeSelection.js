const express = require("express");
const router = express.Router();
const Bus = require("../models/Buses");

// Search buses by startCity and destination
router.post("/search", async (req, res) => {
  const { startCity, destination } = req.body;

  if (!startCity || !destination) {
    return res
      .status(400)
      .json({
        status: false,
        message: "startCity and destination are required",
      });
  }

  try {
    const buses = await Bus.find({ startCity, destination });
    res.json({ status: true, buses });
  } catch (err) {
    console.error("Error searching buses:", err);
    res.status(500).json({ status: false, message: "Error while searching" });
  }
});

// Get bus by ID
router.post("/getById", async (req, res) => {
  const { bId } = req.body;

  if (!bId) {
    return res
      .status(400)
      .json({ status: false, message: "Bus ID (bId) is required" });
  }

  try {
    const bus = await Bus.findById(bId);
    if (!bus) {
      return res.status(404).json({ status: false, message: "Bus not found" });
    }
    res.json({ status: true, bus });
  } catch (err) {
    console.error("Error finding bus by ID:", err);
    res
      .status(500)
      .json({ status: false, message: "Error while searching with ID" });
  }
});

// Create a new bus (uncomment if needed)
router.post("/create", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.status(201).json({ status: true, bus: savedBus });
  } catch (err) {
    console.error("Error creating bus:", err);
    res
      .status(500)
      .json({ status: false, message: "Error while creating bus" });
  }
});

module.exports = router;
