const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
