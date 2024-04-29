const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin-specific routes
router.post("/create-user", adminController.createUser);
router.put("/update-user/:id", adminController.updateUser);
router.delete("/delete-user/:id", adminController.deleteUser);

module.exports = router;
