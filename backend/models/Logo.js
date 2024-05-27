const mongoose = require("mongoose");

const LogoSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Logo = mongoose.model("Logo", LogoSchema);
module.exports = Logo;
