const mongoose = require("mongoose");

const BookOrderSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
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
      address: {
        type: String,
        required: true,
      },
    },
    note: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const BookOrder = mongoose.model("BookOrder", BookOrderSchema);

module.exports = BookOrder;
