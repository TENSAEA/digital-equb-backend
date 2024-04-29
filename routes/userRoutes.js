const express = require("express");
const router = express.Router();
const handleImage = require("../middleware/singleFileHandler.js");

const userController = require("../controllers/userController");

// User registration
router.post("/register", userController.registerUser);

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

module.exports = router;
