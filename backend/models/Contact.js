const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    iframe: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    shopTitle: { type: String, required: true },
    street: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
