const mongoose = require("mongoose");

const pmSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const PM = mongoose.model("PM", pmSchema);
module.exports = PM;
