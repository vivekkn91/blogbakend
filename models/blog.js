const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogID: {
    // Use "blogID" as the field name for the ID
    type: String,
    required: [true, "ID is required"],
  },
  Title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
