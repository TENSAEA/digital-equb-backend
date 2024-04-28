const express = require("express");
const router = express.Router();
const contributionController = require("../controllers/contributionController");

// Create a contribution
router.post("/", contributionController.createContribution);

// Get all contributions
router.get("/", contributionController.getAllContributions);

// Get contribution by ID
router.get("/:id", contributionController.getContributionById);

// Update a contribution
router.put("/:id", contributionController.updateContribution);

// Delete a contribution
router.delete("/:id", contributionController.deleteContribution);

module.exports = router;
