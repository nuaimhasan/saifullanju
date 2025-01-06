const mongoose = require("mongoose");

const TrainingOrderSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
    },
    training: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Training",
    },
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TrainingOrder = mongoose.model("TrainingOrder", TrainingOrderSchema);

module.exports = TrainingOrder;
