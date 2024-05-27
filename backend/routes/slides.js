const express = require("express");
const router = express.Router();
const Slide = require("../models/Slide.js");

// Yeni bir slayt oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const existingSlide = await Slide.findOne({ name: name });

    if (existingSlide) {
      return res.status(400).json({ error: "This slide is already exist!..." });
    }

    const newSlide = new Slide(req.body);
    await newSlide.save();

    res.status(201).json(newSlide);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm slaytları getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const slides = await Slide.find();

    res.status(200).json(slides);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Slayt silme (Delete)
router.delete("/:slideId", async (req, res) => {
  try {
    const slideId = req.params.slideId;

    const deletedSlide = await Slide.findByIdAndDelete(slideId);

    if (!deletedSlide) {
      return res.status(404).json({ error: "Slide not found!..." });
    }

    res.status(200).json(deletedSlide);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir slaytı getirme (Read - Single)
router.get("/:slideId", async (req, res) => {
  try {
    const slideId = req.params.slideId;
    try {
      const slide = await Slide.findById(slideId);
      res.status(200).json(slide);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Slide not found!..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Slayt güncelleme
router.put("/:slideId", async (req, res) => {
  try {
    const slideId = req.params.slideId;
    const updates = req.body;

    const existingSlide = await Slide.findById(slideId);

    if (!existingSlide) {
      return res.status(404).json({ error: "Slide not found!..." });
    }

    const updatedSlide = await Slide.findByIdAndUpdate(slideId, updates, {
      new: true,
    });

    res.status(200).json(updatedSlide);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
