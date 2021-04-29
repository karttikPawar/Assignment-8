const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blogs");
const Comment = require("../Models/Comments");

router.get("/", (req, res) => {
  Blog.find({}, (err, blogs) => {
    res.render("blogs/index", { blogs });
  });
});

router.get("/blogs/new", (req, res) => {
  res.render("blogs/new");
});

router.post("/newBlog", async (req, res) => {
  await Blog.create(req.body);
  res.redirect("/");
});

router.get("/blog/:id", (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .populate("comments")
    .exec((err, foundBlog) => {
      if (err) {
        return console.log(err);
      }
      console.log(foundBlog.comments);
      res.render("blogs/blogView", { blog: foundBlog });
    });
});

router.delete("/blog/:id", (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id, (err, deleteBlog) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

router.get("/blog/:id/edit", (req, res) => {
  const { id } = req.params;

  Blog.findById(id).exec((err, foundBlog) => {
    if (err) {
      return console.log(err);
    }
    res.render("blogs/edit", { blog: foundBlog });
  });
});

router.patch("/blog/:id", (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndUpdate(id, req.body, (err, blog) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

router.post("/blog/:id/comments", async (req, res) => {
  const { id } = req.params;
  const comments = new Comment(req.body);

  await Blog.findById(id).exec((err, blog) => {
    blog.comments.push(comments);
    blog.save();
    comments.save();
  });

  res.redirect(`/blog/${id}`);
});

module.exports = router;
