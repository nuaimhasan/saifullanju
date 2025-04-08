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
    payment: {
      paymentMethod: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      accountNb: {
        type: String,
        default: "N/A",
      },
      transactionId: {
        type: String,
        default: "N/A",
      },
      date: {
        type: Date,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const TrainingOrder = mongoose.model("TrainingOrder", TrainingOrderSchema);

module.exports = TrainingOrder;
