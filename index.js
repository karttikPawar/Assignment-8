const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const blogRoutes = require("./routes/blogRoutes");
const seed = require("./seed");

mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Blog-- db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// seedDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(blogRoutes);

app.listen(3000, () => {
  console.log("Server Started AT PORT 3000");
});
