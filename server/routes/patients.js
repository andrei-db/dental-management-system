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

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Patient not found." });

    res.json({ msg: "Patient deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error." });
  }
});

router.put("/:id", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Patient not found." });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
