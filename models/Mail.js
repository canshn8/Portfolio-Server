const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
