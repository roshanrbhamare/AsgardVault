import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";
import PasswordModel from "../model/Password.js";
import bcrypt from "bcrypt";
// Signup Controller
const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1d" } // token expiry
    );

    // Set token in cookie
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Passwords Controller
const getPasswords = async (req, res) => {
  try {
    const userId = req.user; // from checkAuth middleware

    const allData = await PasswordModel.find({ userId }).populate("userId");

    if (!allData || allData.length === 0) {
      return res.status(200).json({ message: "No password saved yet" });
    }

    res.status(200).json({ success: true, data: allData });
  } catch (error) {
    console.error("Get Passwords Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// const allData = await PasswordModel.findAll().populate({id}).exec();
// return res.json({Title: No Pasword saved till tiem});
// return res.json({allData};)

// 🚫 Problems:
// 1] findAll() does not exist in Mongoose.
// ✅ Use .find() to get all documents matching a filter.

// 2] .populate({id}) is invalid syntax.
// ✅ populate() expects a string referring to the field you want to populate, like "userId".

// 3] return res.json({Title: No Pasword saved till tiem});
// ❌ Has:
// A typo in the key (Title)
// Typo in message ("Pasword", "tiem")

// 4] return res.json({allData};)
// ❌ Syntax error — semicolon is misplaced and breaks the function.

// GET /passwords/:id
const getSinglePassword = async (req, res) => {
  try {
    const userId = req.user; // from checkAuth
    const passwordId = req.params.id;

    const entry = await PasswordModel.findById(passwordId).populate("userId");

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Password entry not found" });
    }

    // Make sure the logged-in user is the owner
    if (entry.userId._id.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    console.error("Get Single Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /passwords/:id
const updatePassword = async (req, res) => {
  try {
    const userId = req.user; // from checkAuth
    const passwordId = req.params.id;
    const { url, username, email, password } = req.body;

    // Find the password entry
    const existingEntry = await PasswordModel.findById(passwordId);

    if (!existingEntry) {
      return res
        .status(404)
        .json({ success: false, message: "Password entry not found" });
    }

    // Make sure the logged-in user is the owner
    if (existingEntry.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    // Update fields
    existingEntry.url = url || existingEntry.url;
    existingEntry.username = username || existingEntry.username;
    existingEntry.email = email || existingEntry.email;
    existingEntry.password = password || existingEntry.password;

    await existingEntry.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Password updated successfully",
        data: existingEntry,
      });
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /passwords/:id
const deletePassword = async (req, res) => {
  try {
    const userId = req.user;
    const passwordId = req.params.id;

    const entry = await PasswordModel.findById(passwordId);

    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Password entry not found" });
    }

    if (entry.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    await PasswordModel.findByIdAndDelete(passwordId);

    res
      .status(200)
      .json({ success: true, message: "Password deleted successfully" });
  } catch (error) {
    console.error("Delete Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /passwords
const savePassword = async (req, res) => {
  try {
    const userId = req.user; // from checkAuth middleware
    const { url, username, email, password } = req.body;

    if (!url || !password) {
      return res.status(400).json({ success: false, message: "URL and password are required" });
    }

    const newPassword = new PasswordModel({
      userId,
      url,
      username,
      email,
      password
    });

    await newPassword.save();

    res.status(201).json({
      success: true,
      message: "Password saved successfully",
      data: newPassword
    });
  } catch (error) {
    console.error("Save Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
const getProfile= async (req, res) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const updateProfile=async (req, res) => {
  try {
    const { email } = req.body;
    const updated = await UserModel.findByIdAndUpdate(req.user, { email }, { new: true });
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
}

const logoutController= (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
}

export {
    signupController, loginController, getPasswords, getSinglePassword,updatePassword,deletePassword,savePassword,getProfile,updateProfile,logoutController
}