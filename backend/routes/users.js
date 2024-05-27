const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// Tüm kullanıcıları getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı silme (Delete)
router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found!..." });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir kullanıcıyı getirme (Read - Single)

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "User not found!..." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı güncelleme (Update)
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { avatar, username, email, password } = req.body;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found!..." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updates = {
      avatar,
      username,
      email,
      password: hashedPassword,
    };

    console.log(updates);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
