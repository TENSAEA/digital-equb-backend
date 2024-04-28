const Ticket = require("../model/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndRemove(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
