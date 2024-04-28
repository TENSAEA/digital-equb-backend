const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  equb: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equb",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contribution = mongoose.model("Contribution", contributionSchema);

module.exports = Contribution;
