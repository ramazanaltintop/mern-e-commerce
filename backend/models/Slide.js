const mongoose = require("mongoose");

const SlideSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Slide = mongoose.model("Slide", SlideSchema);
module.exports = Slide;
