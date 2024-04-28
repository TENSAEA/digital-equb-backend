const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
  },
  isEmailNotification: {
    type: Boolean,
    required: true,
  },
  isInSystemNotification: {
    type: Boolean,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
