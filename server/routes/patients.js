const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name) return res.status(400).json({ msg: "Name is required." });

  try {
    const newPatient = new Patient({ name, email, phone });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch patients." });
  }
});

module.exports = router;
