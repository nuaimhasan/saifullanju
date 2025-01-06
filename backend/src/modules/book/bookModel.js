const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
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
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
