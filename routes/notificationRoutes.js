const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Create a Notification
router.post("/", notificationController.createNotification);

// Get all Notifications for a user
router.get("/:userId", notificationController.getUserNotifications);

// Update a Notification
router.put("/:id", notificationController.updateNotification);

// Delete a Notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
