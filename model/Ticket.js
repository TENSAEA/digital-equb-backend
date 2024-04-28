const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issueCategory: {
      type: String,
      required: true,
    },
    issueDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    dateOpened: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateClosed: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
