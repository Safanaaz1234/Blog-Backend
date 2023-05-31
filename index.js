const express = require("express");
const app = express();
app.use(express.json());
const Blog = require("./model/db");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.get("/api/getSingleBlog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById({ _id: id });
    return res.json(result);
  } catch (e) {
    return res.json({ success: false, message: "Error" });
  }
});

app.get("/api/getBlogs", async (req, res) => {
  try {
    const result = await Blog.find({});
    return res.json(result);
  } catch (e) {
    return res.json({ success: false, message: "Error" });
  }
});

app.post("/api/createBlog", async (req, res) => {
  try {
    const blogData = new Blog({
      title: req.body.title,
      content: req.body.content,
      imgUrl: req.body.imgUrl,
    });
    const result = await blogData.save();
    return res.json({ success: true, message: "Blog uploaded" });
  } catch (e) {
    return res.json({ success: false, message: "Error" });
  }
});

app.delete("/api/deleteBlog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findByIdAndDelete({ _id: id });
    return res.json({ success: true, message: "Deleted" });
  } catch (e) {
    return res.json({ success: false, message: "Error" });
  }
});

app.patch("/api/updateBlog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const imgUrl = req.body.imgUrl;
    const result = await Blog.findByIdAndUpdate(
      { _id: id },
      { title: title, content: content, imgUrl: imgUrl }
    );
    return res.send({ success: true, message: "Updated" });
  } catch (e) {
    return res.json({ success: false, message: "Error", err: e });
  }
});

app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
