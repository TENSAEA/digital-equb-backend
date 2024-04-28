const express = require("express");
const router = express.Router();
const handleImage = require("../middleware/singleFileHandler.js");

const userController = require("../controllers/userController");

// User registration
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get user profile
router.get("/profile", userController.getUserProfile);

// Update user profile
router.put(
  "/profile/:id",
  handleImage.uploadUserPhoto,
  handleImage.resizeUserPhoto,
  userController.updateUserProfile
);
// Delete user
router.delete("/:id", userController.deleteUser);

// Add forgot password endpoints
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
