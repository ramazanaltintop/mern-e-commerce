const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact.js");

// Yeni bir iletişim sayfası oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// İletişim sayfasını getirme (Read - Single)
router.get("/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found!..." });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// İletişim sayfasını güncelleme
router.put("/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const updates = req.body;

    const existingContact = await Contact.findById(contactId);

    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found!..." });
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, updates, {
      new: true,
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm iletişim sayfalarını getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
