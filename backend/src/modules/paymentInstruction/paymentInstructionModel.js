const mongoose = require("mongoose");

const PaymentInstructionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

});

const PaymentInstruction = mongoose.model("PaymentInstruction", PaymentInstructionSchema);

module.exports = PaymentInstruction;
