const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandlers");
require("dotenv").config();
const adduser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    // Save the new user
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: savedUser,
    });
  } catch (error) {
    // Handle validation or save errors
    return res.status(400).json({
      success: false,
      message: "Failed to add user",
      error: error.message,
    });
  }
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Test Case: Missing Email or Password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Your Email or Password!", 400));
  }

  try {
    // Test Case: Valid Login
    const userData = await User.findOne({ email: email }).select("+password");

    if (!userData) {
      // Test Case: Invalid Email or Password
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (passwordMatch) {
      // Test Case: Valid Login
      const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
        // expiresIn: process.env.JWT_EXPIRE,
      });

      // Send a successful response with the user data and token
      res.status(200).json({
        success: true,
        message: "You have been logged in successfully!",
        data: {
          user: userData,
          token: token,
        },
      });
    } else {
      // Test Case: Incorrect Password
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    // Test Case: Handle Server Errors
    console.error(error);
    return next(new ErrorHandler("Something went wrong!", 500));
  }
});

const getUserDetail = catchAsyncError(async (req, res, next) => {
  const userId = req.userData.userId;
  console.log("User ID from token:", userId);

  try {
    const userDetail = await User.findById(userId);

    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: userDetail,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Something went wrong!", 500));
  }
});

module.exports = { adduser, login, getUserDetail };
