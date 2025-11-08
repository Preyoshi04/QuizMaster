import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ---- REGISTER USER ----
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields!",
        success: false,
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists!", success: false });
    }

    const newUser = await User.create({ username, email, password });

    if (newUser) {
      const token = generateToken(newUser._id);
      return res.status(201).json({
        message: "User registered successfully!",
        success: true,
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token,
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

// ---- LOGIN USER ----
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields!",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.status(200).json({
        message: "User logged in successfully!",
        success: true,
        id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials!", success: false });
    }
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

