const catchAsyncError = require("../middleware/catchAsyncError");
const blog = require("../models/blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const uuid = require("uuid");

const addblog = catchAsyncError(async (req, res, next) => {
  const blogID = uuid.v4();
  const { Title, description, email } = req.body;
  const newBlog = new blog({
    blogID: blogID,
    Title,
    description,
    email,
  });

  const savedBlog = await newBlog.save();

  res.status(201).json({
    success: true,
    message: "Blog added successfully",
    data: savedBlog,
  });
});

const getBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await blog.find();
  res.status(200).json({
    success: true,
    message: "Blogs retrieved successfully",
    data: blogs,
  });
});

const editSingleBlog = catchAsyncError(async (req, res, next) => {
  const blogID = req.params.id;
  console.log(blogID);
  const { Title, description } = req.body;

  // Find the blog by blogID in the database
  const existingBlog = await blog.findOne({ blogID: blogID });

  if (!existingBlog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  // Update the blog fields
  existingBlog.Title = Title;
  existingBlog.description = description;

  // Save the updated blog
  const updatedBlog = await existingBlog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});
const getSingleBlog = catchAsyncError(async (req, res, next) => {
  const blogID = req.params.id;

  // Find the blog by blogID in the database
  const foundBlog = await blog.findOne({ blogID: blogID });

  if (!foundBlog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    data: foundBlog,
  });
});
module.exports = { addblog, getBlogs, editSingleBlog, getSingleBlog };
