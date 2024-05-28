const express = require("express");
const router = express.Router();
const Logo = require("../models/Logo.js");

// Yeni bir logo oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const newLogo = new Logo({ name });
    await newLogo.save();

    res.status(201).json(newLogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir logoyu getirme (Read - Single)
router.get("/:logoId", async (req, res) => {
  try {
    const logoId = req.params.logoId;
    const logo = await Logo.findById(logoId);

    if (!logo) {
      return res.status(404).json({ error: "Logo not found!..." });
    }
    res.status(200).json(logo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Logo güncelleme
router.put("/:logoId", async (req, res) => {
  try {
    const logoId = req.params.logoId;
    const updates = req.body;

    const existingLogo = await Logo.findById(logoId);

    if (!existingLogo) {
      return res.status(404).json({ error: "Logo not found!..." });
    }

    const updatedLogo = await Logo.findByIdAndUpdate(logoId, updates, {
      new: true,
    });

    res.status(200).json(updatedLogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm logoları getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const logos = await Logo.find();

    res.status(200).json(logos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
