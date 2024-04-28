const Notification = require("../model/Notification");

exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.params.userId,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndRemove(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
