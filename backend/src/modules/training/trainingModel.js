const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sl: {
    type: String,
    required: true,
    unique: true,
  },
  features: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "Features cannot be empty",
    },
  },
  faqs: {
    type: [
      {
        question: {
          type: String,
          required: true,
        },
        ans: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "FAQs cannot be empty",
    },
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Training = mongoose.model("Training", TrainingSchema);

module.exports = Training;
