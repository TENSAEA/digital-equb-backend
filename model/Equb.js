const mongoose = require("mongoose");

const equbSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    equbFrequency: {
      type: String,
      required: true,
      enum: ["Daily", "Weekly", "Monthly"],
    },
    contributionAmount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Equb = mongoose.model("Equb", equbSchema);

module.exports = Equb;
