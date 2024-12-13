const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: Array },
    tag: { type: Array },
    explain: { type: Array },
    previewLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
