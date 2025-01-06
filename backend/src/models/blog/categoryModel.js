const mongoose = require("mongoose");

const BlogCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);

module.exports = BlogCategory;
