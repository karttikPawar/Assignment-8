const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
