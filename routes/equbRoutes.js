const express = require("express");
const router = express.Router();
const equbController = require("../controllers/equbController");

// Define routes here
router.post("/", equbController.createEqub);
router.get("/", equbController.getAllEqubs);
router.get("/:id", equbController.getEqubById);
router.put("/:id", equbController.updateEqub);
router.delete("/:id", equbController.deleteEqub);

module.exports = router;
