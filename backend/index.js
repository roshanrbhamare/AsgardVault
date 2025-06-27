import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbconnection from "./config/dbconfig.js";
import UserModel from './model/User.js';

// Import Controllers
import {
  signupController,
  loginController,
  getPasswords,
  getSinglePassword,
  updatePassword,
  deletePassword,
  savePassword,
  getProfile,
  updateProfile,
  logoutController
} from "./controller/user.js";

// Import Middleware
import checkAuth from "./middleware/checkauth.js";

import cors from 'cors';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin); // Allow any origin
  },
  credentials: true,
}));
// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
dbconnection();

// ✅ Routes
app.post("/signup", signupController);
app.post("/login", loginController);

// 🔐 Protected routes for passwords 
app.get("/passwords", checkAuth, getPasswords);              // Save data
app.post("/password/save",checkAuth, savePassword);          // Get all
app.get("/passwords/:id", checkAuth, getSinglePassword);     // Get one
app.put("/passwords/:id", checkAuth, updatePassword);        // Update
app.delete("/passwords/:id", checkAuth, deletePassword);     // Delete
app.get("/profile", checkAuth, getProfile);                  //get Profile
app.put("/profile", checkAuth, updateProfile);               // Update profile
app.post("/logout", checkAuth, logoutController);            // Logout route

// Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
