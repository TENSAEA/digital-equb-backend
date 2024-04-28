const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

// Create a Ticket
router.post("/", ticketController.createTicket);

// Get all Tickets
router.get("/", ticketController.getAllTickets);

// Get Ticket by ID
router.get("/:id", ticketController.getTicketById);

// Update a Ticket
router.put("/:id", ticketController.updateTicket);

// Delete a Ticket
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
