const mongoose = require("mongoose");

const speechSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Speech = mongoose.model("Speech", speechSchema);
module.exports = Speech;
