import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register",registerUser);
router.post("/login", loginUser);

// Protected route (returns currently logged-in user)
router.get("/me", protect, async (req, res) => {
  try {
    res.status(200).json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", success: false });
  }
});

export default router;
