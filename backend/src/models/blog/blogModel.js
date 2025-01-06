const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
