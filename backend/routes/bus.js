const express = require("express");
const router = express.Router();
const Bus = require("../models/Buses");

// Search buses by startCity and destination
router.post("/search", async (req, res) => {
  try {
    const buses = await Bus.find({
      startCity: req.body.startCity,
      destination: req.body.destination,
    });
    res.json({ status: true, buses });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: false, message: "Error while searching buses" });
  }
});

// Get bus details by ID
router.post("/details", async (req, res) => {
  try {
    const bus = await Bus.findById(req.body.bId);
    if (!bus) {
      return res.status(404).json({ status: false, message: "Bus not found" });
    }
    res.json({ status: true, bus });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: false, message: "Error while searching with ID" });
  }
});

// Add new bus
router.post("/add", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.status(201).json({ status: true, bus: savedBus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Error saving bus" });
  }
});

module.exports = router;
