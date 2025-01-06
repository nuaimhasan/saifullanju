const mongoose = require("mongoose");

const FaciconSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Facicon = mongoose.model("Facicon", FaciconSchema);

module.exports = Facicon;
