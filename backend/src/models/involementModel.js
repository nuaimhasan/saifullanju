const mongoose = require("mongoose");

const involementSchema = mongoose.Schema({
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

const Involement = mongoose.model("Involement", involementSchema);
module.exports = Involement;
