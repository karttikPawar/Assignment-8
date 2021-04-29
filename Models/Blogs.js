const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
